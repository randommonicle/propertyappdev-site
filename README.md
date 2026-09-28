# bengraham.uk

Source for [bengraham.uk](https://bengraham.uk), Ben Graham's professional site. It is built
with [Eleventy](https://www.11ty.dev/) and hosted on Netlify (Netlify site name
`bengrahamportfolio`), with Cloudflare in front for DNS and email routing.

## Working on it

Needs Node.js 22 or later.

```bash
npm install
npm start
```

`npm start` serves the site at http://localhost:8080 and rebuilds on save.

```bash
npm run build
```

`npm run build` clears `_site/`, builds the site into it, then runs `scripts/check-site.mjs`.
Netlify runs the same command, so if the check fails locally, the deploy fails too. Run
`npm run check` to re-check an existing build without rebuilding.

Both commands behave the same in PowerShell, cmd.exe and Git Bash.

## Where things live

| Path | What it is |
|------|------------|
| `src/_data/site.js` | Facts used in more than one place: name, email, LinkedIn, GitHub, and the figures that change over time (portfolio size, inspection count). Change them here. |
| `src/index.njk` | The home page. |
| `src/projects/*.md` | One case study per file. The home page cards are built from their front matter. |
| `src/_includes/layouts/` | `base.njk` (every page: head, nav, footer) and `project.njk` (case studies). |
| `lib/structured-data.js` | Builds the JSON-LD (Person, ProfilePage, Article, BreadcrumbList). |
| `src/sitemap.njk` | Generates `sitemap.xml` from the pages. Pages marked `noindex` are left out. |
| `scripts/check-site.mjs` | The post-build check (below). |
| `design/` | Sources for the share image and touch icon. Not published. |
| `docs/DECISIONS.md` | Why the site is built the way it is. |
| `netlify.toml` | Build settings, redirects, security and cache headers. |

## Editing content

- When you change a page's content, set its `updated` front matter to today's date
  (`"YYYY-MM-DD"`, in quotes). It becomes the page's `lastmod` in the sitemap.
- To add a case study, copy one of the files in `src/projects/`, give it a new file name
  (that becomes the URL) and fill in every front matter field: `title` (the browser tab
  and search result, 30 to 65 characters), `description` (70 to 170 characters),
  `heading` (the H1), `cardTitle`, `tag`, `strap`, `summary`, `status`, `order`, `updated`,
  `lead` and `facts`. Set `lightbox: true` if the page has screenshots.
- House style: British English, no em dashes, no placeholder text. The check enforces the
  last two.
- The site does not name Ben's employer or the booking platform's client. The CV PDF does.

## What the build check enforces

`scripts/check-site.mjs` fails the build if any of these break:

- Repository files (README, config, scripts, `.env`) or Word documents appear in the published output.
- The mobile number or personal Gmail address appears in any published text file.
- A page lacks exactly one `<title>` and one `<h1>`, or an indexable page lacks a description,
  a canonical URL matching its address, Open Graph tags, or JSON-LD.
- A title or description is outside the lengths above.
- An internal link, image, `#fragment`, stylesheet `url()` or form action does not resolve.
- An image lacks `alt`, `width` or `height`.
- An em dash, placeholder text or escaped HTML shows up in a page.
- A link opens a new tab without `rel="noopener"`.
- An indexable page is not linked from any other page, or the sitemap disagrees with the
  indexable pages or carries a missing or future `lastmod`.
- The 404 or thanks page is indexable, or the contact form loses its Netlify name, honeypot,
  action or any of its fields.

Each rule was shown to fail on a planted fault before it was relied on.

## Deploying

The Netlify site deploys `main` automatically. Changes go through a pull request: Netlify
builds a deploy preview for each PR, and merging to `main` publishes the site.

`https://bengrahamportfolio.netlify.app/*` redirects to `https://bengraham.uk/`. Deploy
previews use other hostnames and are not affected.

## The contact form

The form uses Netlify Forms and is registered as `contact` with the fields `name`, `email`
and `message`, plus the `bot-field` honeypot. Submissions go to `/thanks/`. Do not rename
the form or its fields: Netlify's notification settings depend on them, and a rename fails
silently. Notification recipients are set in the Netlify dashboard under Forms.

## The public CV

`src/cv/ben-graham-cv.pdf` is the email-only web version of the General CV. It shows
ben@bengraham.uk and "Phone available on request". The source is kept outside this
repository with Ben's other CVs. `/cv/*` is served with `X-Robots-Tag: noindex`, so the
PDF can be downloaded but does not appear in search results.

## Regenerating images

`src/images/og-default.png` (the 1200x630 image shown when a page is shared) and
`src/apple-touch-icon.png` are rendered from the HTML files in `design/` with headless
Chrome. In PowerShell, from the repository root:

```powershell
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$root = (Get-Location).Path -replace '\\','/'
& $chrome --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=5000 --screenshot="src\images\og-default.png" "file:///$root/design/og-image.html"
& $chrome --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --force-device-scale-factor=1 --window-size=180,180 --virtual-time-budget=5000 --screenshot="src\apple-touch-icon.png" "file:///$root/design/touch-icon.html"
```

Images are cached for a year, so give a changed image a new file name rather than
overwriting it, and update the reference.

## Fonts

Inter (variable, latin subset) is served from `/fonts/`. It comes from the
`@fontsource-variable/inter` package and is licensed under the SIL Open Font License
(`src/fonts/LICENSE-Inter.txt`). Font files are cached for a year, so a new version needs a
new file name.
