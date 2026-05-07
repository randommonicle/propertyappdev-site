# propertyappdev.co.uk

Personal portfolio site for Ben Graham. Static HTML/CSS/JS, deployed on Netlify.

## Local development

No build step required. Open `index.html` directly in a browser, or use a local dev server:

```bash
# Using Node.js (npx)
npx serve .

# Using Python
python -m http.server 8080

# Using VS Code
# Install the "Live Server" extension and click "Go Live"
```

## Deployment

The site deploys automatically from the connected Git repository via Netlify.

1. Push to the `main` branch.
2. Netlify builds and publishes from the root directory (configured in `netlify.toml`).
3. HTTPS is handled automatically by Netlify once the domain is connected.

### Manual deploy (drag and drop)

Drag the project folder into the Netlify dashboard at https://app.netlify.com/drop

## Domain setup

To point `propertyappdev.co.uk` to Netlify, add the following DNS records at your domain registrar:

| Type  | Name | Value                    |
|-------|------|--------------------------|
| A     | @    | 75.2.60.5                |
| CNAME | www  | your-site-name.netlify.app |

Replace `your-site-name` with the Netlify subdomain assigned to your site.

Alternatively, use Netlify DNS: delegate your domain to Netlify's nameservers and manage all DNS from the Netlify dashboard.

After adding records, go to **Netlify > Site configuration > Domain management** and add `propertyappdev.co.uk` as a custom domain. Netlify will provision an SSL certificate automatically via Let's Encrypt.

## Contact form

The contact form uses Netlify Forms (zero configuration required). Submissions appear in the Netlify dashboard under **Forms** and are forwarded to the email address configured in **Forms > Form notifications**.

To set up email notifications:
1. Go to Netlify dashboard > your site > Forms.
2. Select the `contact` form.
3. Add an email notification with your email address.

No environment variables are needed for form handling.

## Environment variables

No environment variables are required for the current site. See `.env.example` if adding serverless functions later.

## Things to update before going live

- [ ] Replace LinkedIn URL placeholder in `index.html` (search for `linkedin.com/in/PLACEHOLDER`)
- [ ] Replace GitHub URL placeholder in `index.html` (search for `github.com/PLACEHOLDER`)
- [ ] Remove or update the "LinkedIn and GitHub URLs to be confirmed" note in the contact section
- [ ] Add screenshots for the AI Booking Platform project (place in `/images/` and update `index.html`)
- [ ] Confirm accent colour (default: teal `#00B4B4` — update `--color-accent` in `css/style.css` if changing)
- [ ] Set up Netlify Forms email notification in the dashboard
- [ ] Configure custom domain in Netlify and add DNS records (see above)

## File structure

```
propertyappdev-site/
├── index.html          Main single-page site
├── css/
│   └── style.css       All styles (CSS custom properties, responsive)
├── js/
│   └── main.js         Navigation, scroll reveal, footer year
├── images/             Project screenshots and any other assets
├── netlify.toml        Netlify config: redirects, security headers, cache rules
├── .gitignore
├── .env.example        Environment variable reference (none required currently)
└── README.md
```
