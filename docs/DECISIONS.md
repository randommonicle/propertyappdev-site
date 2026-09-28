# Decisions

Standing choices for bengraham.uk, newest first. Each entry says what was decided, why,
and what would change it.

## 2026-09-28: SEO overhaul (pull request `seo-overhaul`)

### Changes reach the live site through a pull request

Ben reviews a Netlify deploy preview and merges to `main` himself. Agents do not push to
`main` or run production deploys. Chosen by Ben on 2026-09-28.

### Eleventy, with the checks in the build

The site grew from one page to nine. Hand-copying the head, navigation and structured data
into each page would let them drift, so Eleventy builds every page from one layout and one
data file (`src/_data/site.js`). The alternative, one HTML file per page with duplicated
heads, was rejected for that reason. `scripts/check-site.mjs` runs as part of
`npm run build`, so a broken link, a missing canonical or an em dash fails the deploy
instead of reaching the site. The only npm dependency is Eleventy itself.

### Public contact details: email only

The site and the downloadable CV show ben@bengraham.uk only; the phone number is
"available on request". The previous CV PDF and a `.docx` in this repository showed the
mobile number and personal Gmail; both are still in this public repository's git history.
Chosen by Ben on 2026-09-28.

### The CV is downloadable but not indexed

`/cv/*` is sent with `X-Robots-Tag: noindex`. The CV names Ben's employer and specific
buildings, which the site itself does not, and a search result should lead to the site,
not a PDF.

### The employer and clients are not named on the site

Carried over from the previous site: case studies say "a RICS-regulated chartered
surveying firm" and "a small local service business". The structured data has no
`worksFor`. The CV PDF, which is noindexed, names the employer.

### Structured data: Person, ProfilePage, Article

The home page is a ProfilePage whose main entity is Ben (Person, with LinkedIn and GitHub
as `sameAs`). Case studies are Articles with a BreadcrumbList. The earlier
ProfessionalService entity was dropped: the site presents Ben to employers and does not
advertise a service. SoftwareApplication was not used, because Google expects ratings or
offers with it and flags it in Search Console without them.

### Titles lead with the name and the disambiguating terms

"Ben Graham" on its own belongs to the investor Benjamin Graham. Titles and headings pair
the name with property management, AI and Cheltenham, the terms that separate this Ben
Graham from him.

### Figures that change are worded to stay true

Portfolio size, inspection count and the number of skills are written as "more than 500",
"more than 100" and "more than 40" and kept in `src/_data/site.js`. Update them there when
the CV changes.

### No legal basis is stated for the drone work

The previous site said the drone was "sub-250g" and needed no further certification. The
DJI Mini 5 Pro weighs about 252 to 253 g with its standard battery, and the CAA Drone Code
(CAP 2320, March 2026) admits a drone to the A1 subcategory either because it is under
250 g or because it carries a UK0, UK1 or C0 class mark. Until Ben confirms his basis, the
site describes the work and makes no regulatory claim about it.

### Fonts are self-hosted

Inter is served from this site. This removes two third-party connections from every page
load, keeps visitors' IP addresses from being sent to Google, and lets the Content
Security Policy allow fonts and styles from this site only.

### The Netlify subdomain redirects to the domain

`bengrahamportfolio.netlify.app` served a full duplicate of the site. It now returns a
301 to bengraham.uk, so search engines see one site.
