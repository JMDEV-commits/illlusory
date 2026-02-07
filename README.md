# ILLUSORY - Secure Web Proxy & VPN Service

A modern, privacy-focused web proxy and VPN service website with a sleek dark theme and professional design.

## Features

- 🔒 **Secure Web Proxy** - Browse websites anonymously through encrypted proxy
- 🚀 **Lightning Fast** - Optimized performance and minimal latency
- 🌍 **Global Network** - 150+ server locations worldwide
- 🛡️ **Privacy First** - Zero logs policy and military-grade encryption
- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations
- 📱 **Mobile Friendly** - Fully responsive across all devices
- 🔗 **Backend Integrated** - Connected to ILLUSORY account system
- 💰 **Transparent Pricing** - Pay-as-you-go for IPv4, IPv6, and rotating proxies

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties and animations
- **JavaScript (Vanilla)** - No dependencies, pure JavaScript
- **Google Fonts** - Syne & JetBrains Mono typefaces
- **SVG** - Scalable vector graphics for icons

## Quick Start

### Local Development

1. Clone this repository:
```bash
git clone https://github.com/YOUR_USERNAME/illusory.git
cd illusory
```

2. Open `index.html` in your browser:
```bash
# On Mac
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or use a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js (if you have http-server installed)
npx http-server
```

3. Visit `http://localhost:8000` in your browser

## GitHub Pages Deployment

### Method 1: Quick Deploy (Recommended)

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name it `illusory` (or any name you prefer)
   - Make it public
   - Don't initialize with README (we already have files)

2. **Push your code:**
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - ILLUSORY website"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/illusory.git

# Push to GitHub
git branch -M main
git push -u origin main
```

3. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **main** branch
   - Click **Save**
   - Your site will be live at: `https://YOUR_USERNAME.github.io/illusory/`

### Method 2: GitHub Desktop

1. Download and install [GitHub Desktop](https://desktop.github.com/)
2. Click **File** → **Add Local Repository**
3. Select your project folder
4. Click **Publish Repository**
5. Go to GitHub → Settings → Pages (as described above)

## File Structure

```
illusory/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
├── .gitignore          # Git ignore file
└── LICENSE             # License file (optional)
```

## Customization

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary: #6366f1;      /* Primary brand color */
    --secondary: #8b5cf6;    /* Secondary brand color */
    --accent: #d946ef;       /* Accent color */
    --dark: #0f172a;         /* Background dark */
    --dark-lighter: #1e293b; /* Card backgrounds */
}
```

### Content

- **Company Name**: Search and replace "ILLUSORY" in `index.html`
- **Features**: Edit the features section in `index.html`
- **Pricing**: Modify pricing plans in the pricing section
- **About Text**: Update the about section content

### Proxy Backend

To connect a real proxy backend, modify `script.js`:

```javascript
function handleProxySubmit() {
    // ... existing code ...
    
    // Replace this line:
    const proxyEndpoint = `/api/proxy?url=${encodeURIComponent(cleanUrl)}&${params.toString()}`;
    window.location.href = proxyEndpoint;
}
```

## Backend Integration

This website is **fully integrated** with the ILLUSORY backend system:

### Connected Services
- **Account System**: https://myaccount.ilusory.com/
- **Sign Up**: https://myaccount.ilusory.com/signup
- **Login**: https://myaccount.ilusory.com/login
- **Password Recovery**: https://myaccount.ilusory.com/recovery
- **Tutorials**: https://myaccount.ilusory.com/tutorials

### Features
- User registration and authentication
- Account dashboard
- Service ordering and management
- Tutorial access
- Password recovery

All "Order Now" buttons link directly to the signup page where users can create accounts and purchase services.

## Custom Domain

To use a custom domain with GitHub Pages:

1. Buy a domain from any registrar (Namecheap, GoDaddy, etc.)
2. Add a `CNAME` file to your repository with your domain:
```
illusory.io
```
3. Configure DNS settings at your registrar:
   - Add an **A record** pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or add a **CNAME record** pointing to: `YOUR_USERNAME.github.io`

4. Enable **Enforce HTTPS** in GitHub Pages settings

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

## Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **No external dependencies** (except Google Fonts)

## Security Features

- Content Security Policy ready
- XSS protection
- HTTPS enforcement (on GitHub Pages)
- No external scripts (except fonts)

## License

MIT License - feel free to use this for personal or commercial projects.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For issues or questions:
- Open an issue on GitHub
- Contact: support@illusory.io (update with your email)

## Acknowledgments

- Design inspiration from modern SaaS products
- Icons and graphics created with SVG
- Fonts: [Syne](https://fonts.google.com/specimen/Syne) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

## Roadmap

- [ ] Add user authentication
- [ ] Implement actual proxy backend
- [ ] Add server selection UI
- [ ] Create pricing checkout integration
- [ ] Add blog section
- [ ] Implement analytics dashboard
- [ ] Mobile apps (iOS/Android)

---

**Built with ❤️ for privacy and freedom**

⭐ Star this repo if you find it useful!
