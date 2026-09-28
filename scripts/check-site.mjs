// Post-build checks on the published output in _site/. `npm run build` runs
// this after Eleventy, so any failure here fails the Netlify deploy (and the
// deploy preview on a pull request) instead of reaching the live site.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, posix } from "node:path";

const SITE_DIR = "_site";
const ORIGIN = "https://bengraham.uk";

const failures = [];
const fail = (file, msg) => failures.push(`${file}: ${msg}`);

function walk(dir, base = "") {
  const out = [];
  for (const name of readdirSync(dir)) {
    const rel = base ? `${base}/${name}` : name;
    if (statSync(join(dir, name)).isDirectory()) out.push(...walk(join(dir, name), rel));
    else out.push(rel);
  }
  return out;
}

const files = walk(SITE_DIR);
const fileSet = new Set(files);
const read = (rel) => readFileSync(join(SITE_DIR, rel), "utf8");

// Attributes of every <tag ...> occurrence, as plain objects.
function tags(html, tagName) {
  const re = new RegExp(`<${tagName}\\b([^>]*)>`, "gi");
  const out = [];
  for (const m of html.matchAll(re)) {
    const attrs = {};
    for (const a of m[1].matchAll(/([\w:-]+)\s*=\s*"([^"]*)"/g)) attrs[a[1].toLowerCase()] = a[2];
    for (const a of m[1].matchAll(/([\w:-]+)\s*=\s*'([^']*)'/g)) attrs[a[1].toLowerCase()] = a[2];
    out.push(attrs);
  }
  return out;
}

const meta = (html, key, value) => tags(html, "meta").find((t) => t[key] === value);

// "index.html" -> "/", "projects/x/index.html" -> "/projects/x/", "404.html" -> "/404.html"
function urlPathFor(rel) {
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel}`;
}

// Map a site-relative URL path to the file Netlify would serve, or null.
function fileForPath(path) {
  const clean = decodeURIComponent(path.replace(/^\//, ""));
  const candidates = clean === "" || clean.endsWith("/")
    ? [`${clean}index.html`]
    : [clean, `${clean}/index.html`, `${clean}.html`];
  return candidates.find((c) => fileSet.has(c)) ?? null;
}

const htmlFiles = files.filter((f) => f.endsWith(".html"));
const pages = new Map(); // rel -> { html, ids, indexable, canonical }
for (const rel of htmlFiles) {
  const html = read(rel);
  const robots = meta(html, "name", "robots");
  pages.set(rel, {
    html,
    ids: new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])),
    indexable: !(robots && /noindex/i.test(robots.content ?? "")),
    canonical: tags(html, "link").find((t) => t.rel === "canonical")?.href,
  });
}

// 1. Repository files must never be published.
const forbidden = [/^README\.md$/i, /^package(-lock)?\.json$/, /^netlify\.toml$/, /^eleventy\.config\.js$/,
  /^\.env/, /^scripts\//, /^node_modules\//, /^src\//, /^docs\//];
for (const rel of files) {
  if (forbidden.some((re) => re.test(rel))) fail(rel, "repository file is in the published output");
}

// 1b. Only an email address is published. Word files carry the application CVs'
// phone number, and text files must not contain it or the personal Gmail.
const privateStrings = ["07712", "445209", "gmail.com"];
for (const rel of files) {
  if (/\.docx?$/i.test(rel)) fail(rel, "Word document in the published output (publish the email-only PDF instead)");
  if (!/\.(html|xml|txt|css|js|json|svg|webmanifest)$/i.test(rel)) continue;
  const text = read(rel);
  for (const s of privateStrings) if (text.includes(s)) fail(rel, `contains private contact detail "${s}"`);
}

// 2. Per-page structure and metadata.
for (const [rel, page] of pages) {
  const { html } = page;
  const titles = [...html.matchAll(/<title>([\s\S]*?)<\/title>/g)];
  if (titles.length !== 1) fail(rel, `expected one <title>, found ${titles.length}`);
  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) fail(rel, `expected one <h1>, found ${h1s.length}`);
  if (!/<html lang="en-GB"/.test(html)) fail(rel, 'missing <html lang="en-GB">');

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { fail(rel, `JSON-LD does not parse: ${e.message}`); }
  }

  if (!page.indexable) continue;
  if (!meta(html, "name", "description")?.content) fail(rel, "missing meta description");
  const expected = ORIGIN + urlPathFor(rel);
  if (page.canonical !== expected) fail(rel, `canonical is ${page.canonical ?? "missing"}, expected ${expected}`);
}

// 3. Every internal link, image and asset reference resolves, including #fragments.
let refCount = 0;
for (const [rel, { html }] of pages) {
  const refs = [];
  for (const t of ["a", "link", "img", "script", "source", "form"]) {
    for (const attrs of tags(html, t)) {
      for (const key of ["href", "src", "action"]) if (attrs[key] !== undefined) refs.push(attrs[key]);
      if (attrs.srcset) refs.push(...attrs.srcset.split(",").map((s) => s.trim().split(/\s+/)[0]));
    }
  }
  for (const ref of refs) {
    if (!ref || /^(https?:|mailto:|tel:|data:)/i.test(ref)) continue;
    refCount++;
    const [pathAndQuery, fragment] = ref.split("#");
    const path = pathAndQuery.split("?")[0];
    let target = rel;
    if (path) {
      const abs = path.startsWith("/") ? path : posix.join(posix.dirname(`/${rel}`), path) + (path.endsWith("/") ? "/" : "");
      target = fileForPath(abs);
      if (!target) { fail(rel, `broken reference: ${ref}`); continue; }
    }
    if (fragment && pages.has(target) && !pages.get(target).ids.has(fragment)) {
      fail(rel, `broken fragment: ${ref} (no id="${fragment}" in ${target})`);
    }
  }
}

// 4. The sitemap lists exactly the indexable pages, by canonical URL.
if (!fileSet.has("sitemap.xml")) {
  fail("sitemap.xml", "missing");
} else {
  const locs = [...read("sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const seen = new Set();
  for (const loc of locs) {
    if (seen.has(loc)) fail("sitemap.xml", `duplicate <loc> ${loc}`);
    seen.add(loc);
    if (!loc.startsWith(`${ORIGIN}/`)) { fail("sitemap.xml", `<loc> outside ${ORIGIN}: ${loc}`); continue; }
    const target = fileForPath(loc.slice(ORIGIN.length));
    if (!target || !pages.has(target)) fail("sitemap.xml", `<loc> has no page: ${loc}`);
    else if (!pages.get(target).indexable) fail("sitemap.xml", `<loc> is a noindex page: ${loc}`);
  }
  for (const [rel, page] of pages) {
    if (page.indexable && page.canonical && !seen.has(page.canonical)) fail(rel, `indexable page missing from sitemap.xml (${page.canonical})`);
  }
}

// 5. robots.txt points crawlers at the sitemap.
if (!fileSet.has("robots.txt") || !read("robots.txt").includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) {
  fail("robots.txt", `missing or lacks "Sitemap: ${ORIGIN}/sitemap.xml"`);
}

if (failures.length) {
  console.error(`check-site: ${failures.length} problem(s) in ${SITE_DIR}/`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`check-site: OK (${pages.size} pages, ${refCount} internal references, ${files.length} files)`);
