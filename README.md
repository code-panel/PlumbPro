# PlumbPro — Plumbing Services Website

A professional, high-converting, and responsive business website built with modern **HTML5**, **CSS3**, and **Vanilla JavaScript**. Designed specifically for local trade businesses, master plumbers, and plumbing contractors to generate service inquiries via direct phone calls and WhatsApp.

---

## 🚀 Live Demo & Quick Start

The website is currently hosted and running locally:
- **Local URL**: [http://localhost:8080](http://localhost:8080)

To start the local server anytime:
```bash
# Using Python
python -m http.server 8080
```
Then open `http://localhost:8080` in any web browser.

---

## 📁 Project Structure

```
plumber/
│
├── index.html              # Main page markup, semantic sections, SEO & Schema.org JSON-LD
├── style.css               # Complete responsive CSS, color palette, animations & utilities
├── script.js               # Vanilla JS: mobile menu, validation, WhatsApp & email handling
├── README.md               # Customization guide & deployment instructions
│
└── assets/
    └── images/
        ├── hero-plumber.jpg        # High-res hero section photo (friendly master plumber)
        ├── about-craftsmanship.jpg # High-res about photo (expert pipefitting craftsmanship)
        └── service-van.jpg         # High-res mobile workshop van photo
```

---

## 🛠️ How to Customize Business Details

All business details (phone number, WhatsApp number, email, address, and service areas) are centralized in **[script.js](file:///c:/Users/Hamza/Desktop/plumber/script.js)** and **[index.html](file:///c:/Users/Hamza/Desktop/plumber/index.html)**.

### 1. Updating Contact Details in JavaScript (`script.js`)

Open [script.js](file:///c:/Users/Hamza/Desktop/plumber/script.js#L20-L32) and locate the `BUSINESS_CONFIG` object at the top of the file:

```javascript
const BUSINESS_CONFIG = {
  name: "PlumbPro",
  phoneDisplay: "(555) 234-5678",        // Formatted phone number shown to users
  phoneRaw: "+15552345678",             // Full international phone number for tel: links
  whatsappNumber: "15552345678",        // Country code + number (NO '+', spaces, or dashes)
  email: "service@plumbpro.com",        // Business email address for mailto links
  address: "142 Riverbend Drive, Suite 100, Metro City",
  serviceAreas: "Downtown, Northwood, Westside, Eastgate, Riverdale & Metro Suburbs"
};
```

> **Important for WhatsApp:** The WhatsApp URL format requires the country code followed by the phone number without any symbols (`+`, spaces, dashes, or brackets). For example:
> - US/Canada: `15552345678`
> - UK: `447123456789`
> - South Africa: `27821234567`
> - India: `919876543210`

### 2. Updating Contact Numbers & Text in HTML (`index.html`)

Search and replace the placeholder phone number `(555) 234-5678` and raw phone `+15552345678` in [index.html](file:///c:/Users/Hamza/Desktop/plumber/index.html):
- **Top Bar Phone**: `<a href="tel:+15552345678">`
- **Top Bar WhatsApp**: `<a href="https://wa.me/15552345678?text=...">`
- **Header "Call Now" Button**: `<a href="tel:+15552345678">`
- **Hero "Call (555) 234-5678" Button**
- **Emergency Ribbon Button**
- **Footer Contact Details**
- **Mobile Floating Action Bar** at the bottom of the page

### 3. Updating Service Names & Pricing

Service cards are located in the `#services` section of [index.html](file:///c:/Users/Hamza/Desktop/plumber/index.html#L180-L340). Each service card has a starting price pill:

```html
<div class="service-card" data-service="Leak Detection & Pipe Repair">
  <div class="service-card-top">
    <div class="service-icon-box">...</div>
    <div class="service-price-tag">From $89</div> <!-- Change starting price here -->
  </div>
  <h3 class="service-name">Leak Detection & Pipe Repair</h3>
  ...
</div>
```

### 4. Updating Service Areas

Navigate to `#areas` in [index.html](file:///c:/Users/Hamza/Desktop/plumber/index.html#L480-L510) and edit the `.area-badge` list with your target cities and neighborhoods:

```html
<div class="area-badges-list">
  <span class="area-badge">📍 Downtown & Central Metro</span>
  <span class="area-badge">📍 Northwood & Heights</span>
  ...
</div>
```

### 5. Replacing Images

To use your own photos:
1. Place your images in `assets/images/`.
2. Replace or rename them to match:
   - `assets/images/hero-plumber.jpg` (Hero image, recommend 4:3 or 16:9 ratio, min 1000px width)
   - `assets/images/about-craftsmanship.jpg` (About section photo)
   - `assets/images/service-van.jpg` (Mobile truck / equipment photo)

---

## 🎨 Brand Colors & Styling

To change the primary color scheme, edit the CSS variables at the top of [style.css](file:///c:/Users/Hamza/Desktop/plumber/style.css#L10-L45):

```css
:root {
  /* Navy Blue Primary Hues */
  --navy-950: #061528;
  --navy-900: #0a1f3a;
  --navy-850: #0f2b4e;

  /* Teal / Bright Blue Accent Hues */
  --teal-500: #00a896;  /* Main accent color */
  --teal-400: #14b8a6;
  --blue-500: #0ea5e9;

  /* WhatsApp Brand Green */
  --whatsapp-green: #25d366;

  /* Emergency Red */
  --emergency-red: #ef4444;
}
```

---

## 🌐 Deployment Instructions

Since this is a lightweight static website (HTML5, CSS3, Vanilla JS), you can deploy it for free on any static host.

### Option A: GitHub Pages (Recommended, Free)

1. Create a GitHub repository (e.g. `plumbpro-website`).
2. Push your files:
   ```bash
   git init
   git add .
   git commit -m "Initial launch of PlumbPro website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/plumbpro-website.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** > **Pages**
   - Under **Build and deployment** > **Branch**, select `main` branch and `/ (root)` folder.
   - Click **Save**.
4. Your website will be live in 1–2 minutes at `https://<your-username>.github.io/plumbpro-website/`.

### Option B: Netlify (Drag & Drop, Free)

1. Go to [Netlify.com](https://www.netlify.com/) and log in.
2. Go to **Sites** and drag & drop the entire `plumber/` folder into the Netlify drop zone.
3. Your website will be instantly deployed with an HTTPS URL (e.g., `https://plumbpro.netlify.app`).

### Option C: Vercel (Free)

1. Install Vercel CLI: `npm i -g vercel` (or connect your GitHub repository on [Vercel.com](https://vercel.com/)).
2. Run `vercel` in the project directory and follow the prompts.

---

## 📋 Features Checklist (Acceptance Criteria)

- [x] **FR-01 Navigation**: Smooth scrolling links with sticky header offset.
- [x] **FR-02 Mobile Menu**: Responsive animated hamburger drawer with overlay and accessible ARIA attributes.
- [x] **FR-03 Service Cards**: 6 cards with badges, prices, features, and direct "Book This Service" pre-selection button.
- [x] **FR-04 Call Button**: Direct click-to-call phone dialer links (`tel:+15552345678`).
- [x] **FR-05 WhatsApp**: Instant WhatsApp link with prefilled message (`https://wa.me/...`).
- [x] **FR-06 Contact Form**: Client-side field validation for Name, Phone, Service, and Address with inline feedback.
- [x] **FR-07 Form Submission**: Generates preformatted inquiry text with WhatsApp launcher, email draft launcher, and copy button.
- [x] **FR-08 Reviews**: 6 verified homeowner testimonials with star ratings and badge.
- [x] **FR-09 Responsive Layout**: Mobile-first design tested across mobile, tablet, and desktop viewports.
- [x] **FR-10 Back to Top**: Floating button appears after scrolling and smoothly returns to the top.
- [x] **Mobile Action Bar**: Sticky floating "Call Now" + "WhatsApp Us" bar at the bottom for mobile conversions.
- [x] **SEO & Schema.org**: Meta tags, OpenGraph tags, semantic HTML5, and LocalBusiness JSON-LD structured data included.
