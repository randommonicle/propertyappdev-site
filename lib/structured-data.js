// Builds the JSON-LD graph for a page from site facts and the page's own
// front matter. The home page carries the full Person; other pages point to
// it by @id and repeat only what Google needs on that page.
import site from "../src/_data/site.js";

const abs = (path) => `${site.url}${path}`;
const personId = abs("/#person");
const websiteId = abs("/#website");

const person = () => ({
  "@type": "Person",
  "@id": personId,
  name: site.name,
  alternateName: site.alternateName,
  url: abs("/"),
  image: abs(site.headshot),
  jobTitle: site.jobTitle,
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressRegion: site.region,
    addressCountry: site.country,
  },
  sameAs: [site.linkedin, site.github],
  knowsAbout: [
    "Residential leasehold management",
    "Service charge budgeting",
    "Section 20 consultation",
    "Building safety compliance",
    "Facilities management",
    "AI adoption",
    "Claude API",
    "Property technology",
    "Drone building surveys",
  ],
});

const personRef = () => ({ "@type": "Person", "@id": personId, name: site.name, url: abs("/") });

export function structuredData({ url, title, description, schemaType, updated, image }) {
  const pageUrl = abs(url);
  const graph = [
    { "@type": "WebSite", "@id": websiteId, url: abs("/"), name: site.name, inLanguage: "en-GB", publisher: { "@id": personId } },
  ];

  if (schemaType === "profile") {
    graph.push(
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: "en-GB",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        dateModified: updated,
      },
      person(),
    );
  } else if (schemaType === "article") {
    graph.push(
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: title,
        description,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        inLanguage: "en-GB",
        image: abs(image ?? site.ogImage),
        dateModified: updated,
        author: personRef(),
        publisher: personRef(),
        isPartOf: { "@id": websiteId },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
          { "@type": "ListItem", position: 2, name: title, item: pageUrl },
        ],
      },
    );
  }

  // "<" is escaped so no string in the data can close the <script> element.
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2).replace(/</g, "\\u003c");
}
