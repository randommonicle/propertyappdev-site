import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { structuredData } from "./lib/structured-data.js";

export default function (eleventyConfig) {
  // Static assets are copied as-is. Anything not listed here and not a
  // template stays out of the published site.
  eleventyConfig.addPassthroughCopy({
    "src/css": "css",
    "src/js": "js",
    "src/images": "images",
    "src/fonts": "fonts",
    "src/cv": "cv",
    "src/favicon.svg": "favicon.svg",
    "src/apple-touch-icon.png": "apple-touch-icon.png",
    "src/robots.txt": "robots.txt",
  });

  // "/css/style.css" -> "/css/style.css?v=<content hash>", so browsers fetch
  // the new file straight after a deploy instead of waiting out the cache.
  eleventyConfig.addFilter("hashed", (path) => {
    const hash = createHash("sha256").update(readFileSync(`src${path}`)).digest("hex").slice(0, 10);
    return `${path}?v=${hash}`;
  });

  eleventyConfig.addShortcode("structuredData", (data) => structuredData(data));

  // Case studies, in the order they appear on the home page.
  eleventyConfig.addCollection("projects", (api) =>
    api.getFilteredByGlob("src/projects/*.md").sort((a, b) => a.data.order - b.data.order),
  );

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
