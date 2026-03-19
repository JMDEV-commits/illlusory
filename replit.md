# ILLUSORY - Secure Web Proxy & VPN Landing Page

## Project Overview
A privacy-focused marketing website for the ILLUSORY secure web proxy and VPN service. Dark theme, modern CSS animations, fully responsive for desktop and mobile.

## Tech Stack
- **Languages**: HTML5, CSS3, Vanilla JavaScript
- **Build System**: None (pure static site, no bundler)
- **Package Manager**: None
- **Fonts**: Syne (700, 800) and JetBrains Mono via Google Fonts CDN
- **Deployment**: Vercel (vercel.json configured) or any static host

## Project Structure
```
.
├── index.html              # Main landing page (all sections)
├── blog.html               # Blog page
├── careers.html            # Careers page
├── contact.html            # Contact page
├── privacy-policy.html     # Privacy Policy (legal)
├── terms-of-service.html   # Terms of Service (legal)
├── cookie-policy.html      # Cookie Policy (legal)
├── gdpr.html               # GDPR page (legal)
├── styles.css              # All styles, fully responsive
├── script.js               # Client-side JS (null-safe for all pages)
├── favicon.svg             # Site icon
├── vercel.json             # Vercel deployment config w/ security headers
└── replit.md               # This file
```

## Page Sections (index.html)
1. **Hero** — Headline, description, CTA buttons, trust indicators, stats bar
2. **How It Works** — 3-step guide (Choose → Connect → Browse)
3. **Web Proxy** — URL input with options, quick-access links
4. **Features** — 8 feature cards (encryption, speed, global network, zero logs, DNS protection, ad blocking, multi-protocol, rotating proxies)
5. **Mid-Page CTA Banner** — Retention CTA between features and pricing
6. **Use Cases** — 4 cards (web scraping, geo-restriction, corporate privacy, ad verification)
7. **Pricing** — Tabbed pricing tables (IPv4, IPv6, Rotating Proxies)
8. **About** — Company info and stat cards
9. **Final CTA** — Closing call-to-action before footer
10. **Footer** — Brand, links (fixed to use relative paths), social icons

## External Links (unchanged as requested)
- Sign In: https://myaccount.ilusory.com/login
- Sign Up: https://myaccount.ilusory.com/signup
- Account: https://myaccount.ilusory.com/
- Tutorials: https://myaccount.ilusory.com/tutorials
- Recovery: https://myaccount.ilusory.com/recovery
- Brand homepage: https://www.ilusory.com/

## Development Server
Served via `npx serve . -l 5000` on port 5000.

**Workflow**: "Start application"

## Deployment (Vercel)
`vercel.json` is configured with:
- Clean URLs enabled
- Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy)
- No trailing slashes

To deploy on Vercel: connect the GitHub repo (`JMDEV-commits/illlusory`) at vercel.com.

## Mobile Responsiveness
- **Tablet (≤968px)**: 2-column features/use-cases, stacked steps, mobile menu, sticky CTA
- **Mobile (≤640px)**: Single column, simplified proxy input, stacked hero CTA, full-width buttons
- **Small (≤400px)**: Extra compact stats grid and footer

## Key Fixes Made
- Fixed broken footer links (e.g., `https://blog.html` → `blog.html`)
- Script.js is now null-safe — works on legal pages without errors
- Mobile menu covers full viewport when open
- Proxy input works properly across all screen sizes
- Sticky mobile CTA bar that hides when the final CTA is in view
