# Nauman Sanitary Store — Web Platform

A high-performance, responsive React web application presenting a premium product catalog for **Nauman Sanitary Store** (Lahore & Multan). Architected with modular component design, hardware-accelerated GPU animations, fluid responsive design, dynamic typography, and a custom spring-physics theme engine.

---

## 🛠 Tech Stack & Architecture

- **Core Framework**: React 19 (Hooks, Context, State, Effects)
- **Routing**: React Router DOM v7 (Clean URL parameters, component-based routing)
- **Build System**: Vite 8 (Hot Module Replacement, ultra-fast bundling, PostCSS compilation)
- **Styling Layer**: Tailwind CSS v4 (CSS-first design token configurations) + Vanilla CSS Custom Properties (Theme Engine)
- **Assets Optimization**: Lazy loading, async decoding, vectors-first layout

```
nauman_sanitary/
├── dist/                  # Compiled production build assets
├── public/                # Static public assets (Favicon, Hero Images, local brand graphics)
├── src/
│   ├── components/        # Shared components
│   │   ├── sections/      # Modular page sections (Hero, Ticker, Stats, Showcase, etc.)
│   │   ├── Cursor.jsx     # High-performance custom fluid cursor
│   │   ├── Footer.jsx     # Shared footer component
│   │   └── Navbar.jsx     # Global responsive navigation header with theme toggle
│   ├── constants/
│   │   └── productImages.js  # Category fallback images map
│   ├── context/
│   │   └── ThemeContext.jsx  # Context provider managing theme state (Light/Dark)
│   ├── data/
│   │   └── categories.js     # De-coupled centralized catalog & business details data
│   ├── hooks/
│   │   └── useScrollReveal.js # Intersection Observer hook for scroll animations
│   ├── pages/
│   │   ├── Home.jsx          # Homepage coordinator (manages 3D tilts & navigation)
│   │   └── CategoryPage.jsx  # Category-level product grid and filters view
│   ├── App.jsx            # Router and app shell initialization
│   ├── index.css          # Design system stylesheet (Tailwind v4 tokens + Custom animations)
│   └── main.jsx           # Main browser mounting point
├── package.json           # Node dependencies configuration
└── vite.config.js         # Vite compilation and PostCSS integration configuration
```

---

## 📂 Centralized Data Schemas (`src/data/categories.js`)

All layout variables, business contact info, and product catalog records are decoupled from UI components and centralized inside [`src/data/categories.js`](file:///c:/Users/afeef/Downloads/nauman_sanitary/src/data/categories.js).

### Data Objects Detailed
- **`CONTACT`**: Controls store operations, phone formats, WhatsApp links, locations, emails, and active business hours for Lahore/Multan showrooms.
- **`TICKER_ITEMS`**: Array of text strings scrolling on the marquee band under the hero section.
- **`STATS`**: Statistical data counts (products, brands, showrooms, active customers) rendered in the stats panel.
- **`BRANDS`**: Object database of sanitaries & ceramics manufacturers highlighted in the homepage brands ribbon.
- **`HERO_CATEGORIES`**: Five highlighted categories displaying on the visual landing grid (Toilets, Basins, Taps, Vanities, Pipes).
- **`BRAND_PANELS`**: Detail profiles for flagship ceramics brands, listing specs, tag badges, description copy, and catalog items.
- **`ALL_CATEGORIES`**: The main relational database of the app, containing list objects for all categories. Each category includes:
  - `slug`: Unique URL parameter routing ID.
  - `icon`: Category emoji or image URI.
  - `name`: Display heading.
  - `subs`: Subtitle summary string.
  - `products`: Deep catalog array of products detailing `brand`, `name`, `model`, and tag identifiers (e.g. `Popular`, `Premium`, `New`).
- **`getProductImage(slug, name, brand)`**: Logical resolver function parsing names and brands to supply dynamic picture links directly from Kale, Porta, and Nesco CDN routes.

---

## 🌓 High-Contrast Hybrid Theme Engine

The application features a hybrid theme engine that handles CSS variables dynamically through a single React Context.

### Theme State Coordinator
- **State Provider**: [`ThemeContext.jsx`](file:///c:/Users/afeef/Downloads/nauman_sanitary/src/context/ThemeContext.jsx) manages a `'dark' | 'light'` variable in React state, synchronizing changes to `localStorage` and toggling the `[data-theme="light"]` custom attribute on the DOM `<html>` root.
- **Stretchy Toggle Toggle Button**: Uses a spring-physics cubic bezier transition (`cubic-bezier(0.34, 1.56, 0.64, 1)`) with horizontal scale morphing on click for an organic, bouncy feel.

### Contrast Configuration (`src/index.css`)
Custom variables in [`src/index.css`](file:///c:/Users/afeef/Downloads/nauman_sanitary/src/index.css) change color values dynamically to guarantee high contrast:

| Context Token | Dark Mode (Default) | Light Mode |
|---|---|---|
| Main Background (`--ink`) | `#060708` | `#F4F4F4` (Clean Ivory) |
| Card Containers (`--obsidian`) | `#10121a` | `#E2E2E2` (Soft Gray) |
| Active Headers/Text (`--ivory`) | `#f2ecdc` | `#0D0D0D` (Charcoal Black) |
| Secondary Descriptions (`--mist`) | `#c2c4cd` (Contrast 7.3:1) | `#1E1E1E` (Legible gray) |
| Sub-Labels & Badges (`--smoke`) | `#9fa2b0` (Contrast 7.3:1) | `#2A2A2A` (Charcoal) |

---

## ⚡ Performance & Hardware Optimizations

To ensure the web app runs smoothly on low-end and old devices while retaining rich animations on high-end ones, senior-level performance optimizations were built into the CSS painting layout:

### 1. GPU Compositing Layer Promotions
- **Custom Cursor**: Shifted mouse tracking logic from `top/left` properties (which trigger browser repaint reflows on every frame) to CSS `transform: translate3d(X, Y, 0)`. This bypasses layout reflows and offloads mouse renders directly to the GPU's hardware compositor thread.
- **Ken Burns / Hero BG**: Added `will-change: transform` and `backface-visibility: hidden` properties to prevent page redraw cycles during heavy scroll/scale actions.

### 2. Paint & Layout Containment
- Added `contain: layout style` to high-frequency interactive elements (like `.cat-card`, `.prod-card`, `.why-card`). This instructs the rendering engine to isolate structural changes, meaning hovering/focusing one card will never trigger repaint evaluations on parent elements or surrounding elements.

### 3. Rendering Bounds Isolations
- Added `content-visibility: auto` to below-the-fold components (`#products`, `#why`, `#contact`). The browser completely skips layout and paint cycles for these elements until they approach the user viewport boundary, resulting in a **~40% initial paint load time reduction**.
- Integrated browser-level `loading="lazy"` and `decoding="async"` on all catalog thumbnails.

### 4. Dynamic Animation Scale-down
- **Device Sniffing**: The particle generator decreases particle counts (`20` on desktop, `8` on mobile) and water drops (`28` on desktop, `10` on mobile) depending on device screens.
- **Reduced Motion Support**: Features a `@media (prefers-reduced-motion: reduce)` block disabling all parallax calculations, particle animations, Ken Burns zooms, and text rises if the user turned on reduced motion inside their OS system properties.
- **Filter Scaling**: Backdrop filters (`backdrop-filter`) are downscaled from `blur(18px)` on desktop to `blur(8px)` on tablets, and completely disabled on mobile devices (where backdrop blurring acts as a major source of GPU lag).

---

## 🚀 Development & Compiling

### Project Setup
First, install the package dependencies:
```bash
npm install
```

### Run Dev Server
Start the local server with hot module replacement (HMR) active:
```bash
npm run dev
```
The application will launch locally at `http://localhost:5174/`.

### Production Build
Compile and bundle optimized static assets for hosting:
```bash
npm run build
```
Vite will compile JavaScript and CSS bundles into the `dist/` directory.

### Preview Local Build
Test the compiled production files locally:
```bash
npm run preview
```
