# Nauman Sanitary Store — Responsiveness & Routes Guide

This guide outlines the application routing system, component architecture, and responsive layouts. Use it to understand how pages are structured and how to refine their responsiveness across mobile, tablet, and desktop viewports.

---

## 1. Application Routing & Page Functionality

Routing is managed in [App.jsx](file:///s:/nauman_sanitary/src/App.jsx) using React Router DOM. The application is divided into **Public (Marketing)** and **Admin Portal** zones.

### 🌐 Public / Marketing Routes
These routes render the customer-facing storefront and are wrapped inside `PublicLayout` (which includes the floating custom mouse [Cursor](file:///s:/nauman_sanitary/src/components/Cursor.jsx), [Navbar](file:///s:/nauman_sanitary/src/components/Navbar.jsx), [Footer](file:///s:/nauman_sanitary/src/components/Footer.jsx), and [InquiryDrawer](file:///s:/nauman_sanitary/src/components/InquiryDrawer.css)).

| Path | Element / Component | Page Functionality |
| :--- | :--- | :--- |
| `/` | [Home](file:///s:/nauman_sanitary/src/pages/Home.jsx) | Interactive landing page featuring hero overlays, top brands ribbon, top featured category cards, sample products grid, company statistics, brand highlights, and a quote enquiry form. |
| `/category/:slug` | [CategoryPage](file:///s:/nauman_sanitary/src/pages/CategoryPage.jsx) | Displays products under a specific category (e.g. `toilets`, `basins`). Features subcategory filter tabs, brand tabs, item grids with search/inquiry buttons, and numeric page navigation. |
| `/brand/:brandName` | [BrandPage](file:///s:/nauman_sanitary/src/pages/BrandPage.jsx) | Lists all products belonging to a specific brand (e.g., `Porta`, `Master`). Displays brand header descriptions, subcategory filter pills, and product grids. |
| `*` | `NotFound` | Fallback 404 page that redirects users back to the homepage. |

### 🔐 Admin Portal Routes
Protected layouts for store content and database management. Renders inside the [AdminLayout](file:///s:/nauman_sanitary/src/admin/layouts/AdminLayout.jsx) sidebar coordinator.

| Path | Element / Component | Page Functionality |
| :--- | :--- | :--- |
| `/admin/login` | `Login` | Admin authentication page. |
| `/admin` | `Dashboard` | Admin control panel home showing system summary metrics. |
| `/admin/categories` | `ManageCategories` | Core product & category editor. Supports adding, editing, or deleting items and uploading image files to the local upload server. |
| `/admin/ticker` | `ContentManagement` | Manage scrolling ticker ribbon items. |
| `/admin/stats` | `ContentManagement` | Edit stats cards numbers (e.g., 27+ Years of Service, 10k+ Products). |
| `/admin/contact` | `ContentManagement` | Edit contact addresses, phone numbers, and WhatsApp redirect URLs. |
| `/admin/brands` | `ContentManagement` | Add, update, or remove partner brand labels. |
| `/admin/hero` | `ContentManagement` | Choose which categories appear in the featured grid sections. |

---

## 2. Grid & Flex Responsive Layout Structures

The project uses responsive classes inside [`src/index.css`](file:///s:/nauman_sanitary/src/index.css). When you make layout modifications, look for these grid frameworks:

### 🏠 Homepage Components

1. **Header Navigation (`#nav`)**
   * **Desktop (`> 1024px`)**: Flex row with horizontal spacing.
   * **Mobile (`< 1024px`)**: Menu links are hidden. Hamburger menu activates, displaying a vertical sliding drawer overlay (`#mobile-nav`).
2. **Featured Categories Grid (`.cats-grid`)**
   * **Desktop**: 12-column template layout utilizing unique span classes:
     * Card 1: `span 5`, Card 2: `span 7`
     * Card 3: `span 4`, Card 4: `span 3`, Card 5: `span 5`
   * **Laptop (`< 1200px`)**: Shifts to symmetric `grid-template-columns: repeat(3, 1fr)`.
   * **Tablet (`< 1024px`)**: Shifts to `grid-template-columns: repeat(2, 1fr)`.
   * **Mobile (`< 520px`)**: Cards stack vertically into a single column (`repeat(1, 1fr)`).
3. **Featured Products Grid (`.prod-grid`)**
   * **Desktop**: `repeat(4, 1fr)` (4 columns).
   * **Laptop (`< 1200px`)**: `repeat(2, 1fr)` (2 columns).
   * **Tablet/Mobile (`< 1024px`)**: `repeat(1, 1fr)` (stacks vertically).
4. **Brand Showcase Panel (`.brand-panel.on`)**
   * **Desktop**: `grid-template-columns: 1fr 1.4fr` (Left text details, Right products grid).
   * **Laptop (`< 1200px`)**: Stacks text details on top of the products grid (`grid-template-columns: 1fr`).
   * **Products grid inside**: Remains `1fr 1fr` (2 columns) but uses `overflow: hidden` to clip rounded edges seamlessly.
5. **Legacy Section (`#legacy`)**
   * **Desktop**: `grid-template-columns: 1fr 1fr` (Left graphics, Right description).
   * **Laptop (`< 1200px`)**: Monogram graphics stack on top of the text block (`1fr`).
   * **Tablet (`< 1024px`)**: Feature bullet points (`.legacy-feats`) collapse from `2-columns` to `1-column`.
6. **Contact Section (`#contact`)**
   * **Desktop**: `grid-template-columns: 1fr 1fr`.
   * **Laptop (`< 1200px`)**: Address listings stack on top of the Quote card container.

---

## 3. Responsive Styling Guidelines & Best Practices

To continue refining and implementing responsiveness on the website, follow these design practices:

### 📏 Typography Clamping
Instead of hardcoding media queries for text scales, use viewport clamping to ensure text shrinks fluidly on mobile:
```css
font-size: clamp(2rem, 8vw, 4.5rem);
```
*(Prevents text headings from wrapping awkwardly or overflowing card containers).*

### 🏷️ Flexible Elements (Flex Wrap)
For elements that contain lists, tags, or pills (e.g. brand lists, subcategory buttons), always allow wrap behaviors:
```css
.tabs-container {
  display: flex;
  flex-wrap: wrap; /* Wrap elements to next line if screen shrinks */
  gap: 0.6rem;
}
```

### ⚡ Performance & Mobile Optimizations
Mobile devices have lower GPU power. When styling overlays, drawers, and animations, follow these rules:
1. **Avoid Reflow Repaints**:
   * Animate using `transform: translate3d()` and `opacity` instead of changing `top`, `left`, `width`, or `height`. Transforms run on the GPU compositor thread without triggering layout calculations.
2. **Backdrop Blurring**:
   * Limit or remove `backdrop-filter: blur()` properties on mobile screen sizes (`max-width: 520px`) as it causes GPU render lag.
3. **Render Containment**:
   * Keep `contain: layout style` on repeating grid items (like `.cat-card` or `.cat-prod-card`) to isolate painting boundary recalculations.
