# NeoHappyLyf — Corporate Website

**Neo HappyLyf Mind Care For U Private Limited**  
Krishnagiri, Tamil Nadu, India · Est. June 2023  
UDYAM-TN-11-0044799

> *"Healing Minds. Building Systems."*

---

## Overview

This is the official corporate website for **NeoHappyLyf** — India's mental wellness and business automation conglomerate. The site showcases four specialised platforms and the company's business automation division.

**Live site:** [neohappylyf.com](https://neohappylyf.com)

### Business Verticals

| Platform | Description | Status |
|---|---|---|
| [IndiaTherapist.com](https://indiatherapist.com) | NRI online therapy platform | Live |
| [IndianLifeCoaches.com](https://indianlifecoaches.com) | Holistic life coaching for NRIs | Live |
| [IndianDivorceCoach.com](https://indiandivorcecoach.com) | Divorce coaching with cultural sensitivity | Live |
| [KrishnanGovindan.com](https://krishnangovindan.com) | Founder personal brand & thought leadership | Launching 2025 |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Icons | Lucide React |
| Fonts | Google Fonts (Playfair Display + DM Sans) |
| Styling | Inline styles + injected `<style>` tag |
| Deployment | GitHub Pages via GitHub Actions |

---

## Project Structure

```
neohappylyf-website/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deploy to GitHub Pages on push to main
├── public/
│   ├── CNAME                   # Custom domain: neohappylyf.com
│   ├── favicon.svg             # Gold "N" favicon
│   └── og-image.jpg            # Open Graph image (add before going live)
├── src/
│   ├── App.jsx                 # Complete single-file React app (~2,400 lines)
│   └── main.jsx                # React DOM entry point
├── index.html                  # HTML shell with full SEO meta tags
├── package.json
├── vite.config.js
└── README.md
```

---

## Running Locally

### Prerequisites
- Node.js 18+ and npm

### Steps

```bash
# Clone the repo
git clone https://github.com/Krishnan-govindan/Neohappylyf-organization.git
cd Neohappylyf-organization

# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deployment — GitHub Pages

Deployment is **fully automated**. Every push to `main` triggers the GitHub Actions workflow which:
1. Installs dependencies (`npm ci`)
2. Builds the project (`npm run build` → `dist/`)
3. Deploys the `dist/` folder to GitHub Pages

### First-Time Setup

1. Go to your GitHub repo → **Settings → Pages**
2. Set **Source** to `GitHub Actions`
3. The CNAME file (`public/CNAME`) automatically sets the custom domain to `neohappylyf.com`

### Custom Domain DNS Setup

Point your domain registrar to GitHub Pages by adding these DNS records:

**A Records** (for apex domain `neohappylyf.com`):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME Record** (for `www` subdomain):
```
www → Krishnan-govindan.github.io
```

Allow 24–48 hours for DNS propagation. GitHub Pages will automatically provision an HTTPS certificate via Let's Encrypt.

---

## Before Going Live — Checklist

- [ ] Add `public/og-image.jpg` (1200×630px) for social sharing previews
- [ ] Add actual founder photo — replace the `KG` placeholder in the Leadership section
- [ ] Update LinkedIn, Twitter, Instagram, YouTube social links in the footer
- [ ] Connect the contact form to a backend (Supabase, Formspree, or EmailJS)
- [ ] Connect the newsletter form to Mailchimp / ConvertKit / Supabase
- [ ] Verify all 4 platform URLs resolve correctly
- [ ] Test all `mailto:` links
- [ ] Run a Google Lighthouse audit (target: Performance 90+, SEO 100, Accessibility 90+)
- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Verify Schema.org markup at [schema.org/validator](https://validator.schema.org)

---

## Content Phases Completed

| Phase | Focus | Status |
|---|---|---|
| 1 | Hero, Navigation, Company Overview | ✅ Complete |
| 2 | Venture Detail Sections, Ecosystem Diagram | ✅ Complete |
| 3 | Automation Lab, Leadership, Trust Signals | ✅ Complete |
| 4 | Contact, SEO Polish, Schema, Performance | ✅ Complete |
| 5 | QA, Responsive Audit, Insights, Newsletter, Deployment | ✅ Complete |

---

## Contact

**Neo HappyLyf Mind Care For U Private Limited**  
Krishnagiri, Tamil Nadu, India

- General: contact@neohappylyf.com  
- Automation: automation@neohappylyf.com  
- Partnerships: partnerships@neohappylyf.com

---

*MSME Registered · Made with purpose in India*
