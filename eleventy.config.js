export default function (eleventyConfig) {
  // Static assets are copied as-is. Anything not listed here and not a
  // template stays out of the published site.
  eleventyConfig.addPassthroughCopy({
    "src/css": "css",
    "src/js": "js",
    "src/images": "images",
    "src/cv": "cv",
    "src/favicon.svg": "favicon.svg",
    "src/robots.txt": "robots.txt",
    "src/sitemap.xml": "sitemap.xml",
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk", "html"],
    htmlTemplateEngine: "njk",
  };
}
