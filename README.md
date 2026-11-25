# LUXE UI

Frontend web application for **LUXE**, a luxury minimalist fashion e-commerce platform and retail operations suite. Built with Next.js App Router and TypeScript, it brings together the customer-facing online storefront and the internal **LUXE Control Atelier** management dashboard in a single application.

---

## Overview & Key Features

### Customer Storefront
- **Editorial Homepage (`/`)**: Hero showcase, category highlights, featured collections, editorial story, promotional banners, trust features, customer testimonials, and social feed.
- **Catalog & Discovery (`/collections`, `/products/[slug]`)**: Curated product browsing, search modal, and detailed product views.
- **Shopping Experience (`/wishlist`, `/checkout`)**: Slide-out shopping cart drawer, wishlist management, and checkout flow.
- **Information & Accounts (`/about`, `/login`, `/register`)**: Brand story page and customer sign-in/registration views.

### Operations & Management Dashboard (`/dashboard`)
- **Overview & Finance (`/dashboard`, `/dashboard/financial`)**: Key metrics, summary cards, charts, and financial reporting.
- **Order & Customer Management (`/dashboard/orders`, `/dashboard/customers`)**: Order processing, walk-in orders, customer profiles, and top spender insights.
- **Inventory & Supply Chain (`/dashboard/stock`, `/dashboard/stock/imports`, `/dashboard/stock/transfers`, `/dashboard/suppliers`)**: Stock levels, stock import records, inter-facility transfers, and supplier management.
- **Store & Team Operations (`/dashboard/facilities`, `/dashboard/coupons`, `/dashboard/staff`, `/dashboard/shifts`)**: Store/warehouse facilities, promotional coupons, staff directory, and shift scheduling.
- **Catalog Forms (`/dashboard/api-forms`)**: Interactive forms for managing categories, brands, products, and facilities.

### Personalization & Developer Experience
- **Theme Support**: Light and dark mode with persistent preference.
- **Bilingual Support**: English (`en`) and Khmer (`km`) translations.
- **Typed State & Forms**: Centralized Redux Toolkit / RTK Query store paired with React Hook Form and Zod validation.

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router) & [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State & Data Fetching**: [Redux Toolkit](https://redux-toolkit.js.org/) & RTK Query
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linting**: ESLint 9 (`eslint-config-next`)

---

## Project Structure

```text
luxe-ui/
├── app/                            # Next.js App Router pages & layouts
│   ├── about/                      # Brand about page
│   ├── checkout/                   # Checkout page
│   ├── collections/                # Product collections catalog
│   ├── dashboard/                  # Admin & operations dashboard (/dashboard)
│   │   ├── api-forms/              # Interactive API entity forms
│   │   ├── coupons/                # Coupons management
│   │   ├── customers/              # Customer management
│   │   ├── facilities/             # Facilities management
│   │   ├── financial/              # Financial overview
│   │   ├── orders/                 # Orders management
│   │   ├── shifts/                 # Shift scheduling
│   │   ├── staff/                  # Staff directory & management
│   │   ├── stock/                  # Inventory, stock imports & transfers
│   │   ├── suppliers/              # Supplier management
│   │   ├── layout.tsx              # Dashboard shell & context layout
│   │   └── page.tsx                # Dashboard overview page
│   ├── login/                      # Customer sign-in page
│   ├── products/[slug]/            # Dynamic product detail page
│   ├── register/                   # Customer registration page
│   ├── wishlist/                   # Saved wishlist page
│   ├── globals.css                 # Global styles & Tailwind v4 configuration
│   ├── layout.tsx                  # Root layout (theme, language, navbar, footer)
│   └── page.tsx                    # Storefront homepage
│
├── components/                     # Modular React UI components
│   ├── auth/                       # Authentication views
│   ├── cart/                       # Slide-out cart drawer
│   ├── dashboard/                  # Dashboard shell, charts, modals & module views
│   │   ├── coupons/
│   │   ├── customers/
│   │   ├── facilities/
│   │   ├── financial/
│   │   ├── orders/
│   │   ├── overview/
│   │   ├── shifts/
│   │   ├── staff/
│   │   ├── stock/
│   │   ├── stock-imports/
│   │   ├── stock-transfers/
│   │   └── suppliers/
│   ├── footer/                     # Site footer
│   ├── forms/                      # Zod-validated forms (Brand, Category, Facility, Product)
│   ├── homepage/                   # Storefront landing sections & product cards
│   ├── navbar/                     # Navigation bar, announcement bar, mobile menu & search modal
│   ├── products/                   # Product detail view
│   ├── providers/                  # Client-side provider composition
│   └── ui/                         # Reusable UI primitives (button, card, dialog, table, tabs, etc.)
│
├── context/                        # React Context providers
│   ├── DashboardContext.tsx        # Shared dashboard state
│   ├── LanguageContext.tsx         # English / Khmer localization state
│   └── ThemeContext.tsx            # Light / dark mode state
│
├── data/                           # Static datasets, translations & sample data
├── lib/                            # Shared utility functions
├── public/                         # Static public assets
├── store/                          # Redux store setup & RTK Query API slices
│   ├── services/                   # API services (base, brand, category, facility, product, supplier)
│   ├── StoreProvider.tsx           # Redux Provider wrapper
│   ├── hooks.ts                    # Typed Redux hooks
│   └── index.ts                    # Store factory & exports
│
├── types/                          # TypeScript interfaces & DTO types
├── next.config.ts                  # Next.js configuration
├── postcss.config.mjs              # PostCSS configuration
├── eslint.config.mjs               # ESLint configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Project dependencies & scripts
```

---

## Getting Started

### Prerequisites
- **Node.js** (v20 or higher recommended)
- **npm**

### Installation & Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the storefront, or visit [http://localhost:3000/dashboard](http://localhost:3000/dashboard) for the management dashboard.

### Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the application for production |
| `npm run start` | Runs the compiled production server |
| `npm run lint` | Runs ESLint across the codebase |
