# ILLUSORY - Static Marketing Website

## Project Overview
A privacy-focused marketing website for the ILLUSORY secure web proxy and VPN service. Features a dark theme with modern CSS animations and SVG graphics.

## Tech Stack
- **Languages**: HTML5, CSS3, Vanilla JavaScript
- **Build System**: None (pure static site)
- **Package Manager**: None
- **Fonts**: Syne and JetBrains Mono (via Google Fonts CDN)

## Project Structure
```
.
├── index.html           # Main landing page
├── blog.html            # Blog section
├── careers.html         # Careers page
├── contact.html         # Contact page
├── styles.css           # Global styles (~1300 lines)
├── script.js            # Client-side interactivity
├── favicon.svg          # Site icon
├── README.md            # Project documentation
├── privacy-policy.html  # Privacy policy
├── terms-of-service.html
├── cookie-policy.html
└── gdpr.html
```

## Development Server
The site is served using `npx serve` on port 5000.

**Workflow**: "Start application" — runs `npx --yes serve -s . -l 5000`

## Deployment
Configured as a **static** deployment with `publicDir: "."` — no build step required.
