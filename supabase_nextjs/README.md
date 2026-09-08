# ⚡ SNEAKERS — Authentic Sneakerhead Vault & E-Commerce

<div align="center">

![SNEAKERS Banner](https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80)

### *The Ultimate Destination for 100% Authentic Kicks, Grail Releases & Performance Footwear*

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth_&_DB-3ecf8e?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-orange?style=for-the-badge)](LICENSE)

</div>

---

## 📖 Table of Contents

- [About The Project](#-about-the-project)
- [Why Supabase?](#-why-supabase)
- [Key Features & User Journey](#-key-features--user-journey)
- [Page Overview](#-page-overview)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Database Schema (PostgreSQL)](#-database-schema-postgresql)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Supabase Setup](#supabase-setup)
- [Testing & Demo Mode](#-testing--demo-mode)
- [Available Promo Codes](#-available-promo-codes)
- [Folder Structure](#-folder-structure)

---

## 👟 About The Project

**SNEAKERS** is a full-featured, high-conversion sneaker e-commerce platform designed for sneakerheads, collectors, and athletes. From retro Air Jordans and limited Nike Dunks to high-performance Adidas Ultraboosts and New Balance classics, the website provides a luxury boutique shopping experience with zero tolerance for counterfeit shoes.

### Core Value Propositions:
- **100% Physical Authenticity Guarantee**: Every sneaker is verified under UV lighting, RFID tagged, and inspected by specialists before shipping.
- **Dynamic Drops & Restocks**: Real-time drop countdowns, hot releases, and instant drop radar notifications.
- **Seamless Checkout & Payment**: Interactive card payment simulation, instant UPI, and Cash on Delivery options.
- **Complete Order Tracking**: 4-stage tracking timeline (Placed &rarr; Authenticated &rarr; Shipped &rarr; Delivered).

---

## 🛡️ Why Supabase?

We chose **Supabase** as the backend-as-a-service (BaaS) and database solution for **SNEAKERS** because it provides an enterprise-grade, open-source stack built on top of **PostgreSQL**:

```
+-------------------------------------------------------------+
|                       SNEAKERS App                          |
|             (Next.js App Router + Tailwind v4)              |
+-------------------------------------------------------------+
                             |
              @supabase/ssr (Cookie Sessions)
                             |
+-------------------------------------------------------------+
|                          SUPABASE                           |
|  +-------------------------------------------------------+  |
|  | 🔐 GoTrue Auth (Email/Pass, Sessions, Password Reset) |  |
|  +-------------------------------------------------------+  |
|  | 🗄️ PostgreSQL Database (Relational integrity)         |  |
|  +-------------------------------------------------------+  |
|  | 🛡️ Row Level Security (RLS) policies per user UID    |  |
|  +-------------------------------------------------------+  |
|  | ⚡ PostgreSQL Triggers (Auto create user profiles)    |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
```

### 1. Robust Authentication (`GoTrue`)
- **Email & Password Authentication**: Native password hashing, rate limiting, and email verification.
- **Forgot & Reset Password Flows**: Automated token generation and secure redirect callback handling (`/auth/callback` & `/auth/update-password`).
- **SSR Cookie Sessions with `@supabase/ssr`**: Synchronizes session cookies between the client browser, Next.js Middleware, and Server Components, preventing layout flickers and unauthorized page access.

### 2. Relational PostgreSQL Power
- E-commerce applications require strong relational data integrity:
  - Users have Profiles
  - Users have Orders
  - Orders contain multiple Order Items referencing Products
  - Users receive Notifications
- Supabase delivers full PostgreSQL capabilities with JSONB support for flexible metadata (such as delivery addresses and colorway palettes).

### 3. Row-Level Security (RLS)
- Ensures customer data privacy at the database engine level.
- Even if a malicious client attempts to fetch another user's orders or profile, PostgreSQL rejects the query because `auth.uid() = user_id`.

### 4. Automated Database Triggers
- When a new customer registers via `supabase.auth.signUp()`, a PostgreSQL trigger (`handle_new_user`) automatically creates a matching entry in the `public.profiles` table with their name and email.

### 5. Graceful Fallback / Zero-Config Demo Mode
- The application is engineered with an intelligent fallback system: if Supabase credentials are not yet configured in `.env.local`, the site smoothly defaults to **Local Demo Mode**. You can browse, test cart functionality, checkout, and use 1-click test credentials without any configuration blocker!

---

## 🌟 Key Features & User Journey

### 1. Discovery & Browsing
- **Hero Drop Spotlight**: Features the flagship sneaker with real-time ratings, pricing, and 1-click preview.
- **Brand Quick Navigation**: Filter directly by Jordan, Nike, Adidas, New Balance, or Puma.
- **Live Search Modal**: Type any model or keyword (e.g., "Panda", "Samba", "Travis Scott") or tap trending tags.

### 2. Catalog & Custom Filtering (`/shoes`)
- **Multi-Filter Engine**:
  - **Brand**: Nike, Jordan, Adidas, New Balance, Puma
  - **Category**: Basketball, Running, Lifestyle, Skateboarding
  - **Gender**: Men, Women, Unisex
  - **Sizes**: Full US range (7 to 13)
  - **Price Range Slider**: $50 to $450 dynamic range
- **Sort By**: Featured, New Releases, Price (Low-to-High / High-to-Low), and Customer Rating.
- **Active Filter Badges**: Remove individual filter chips with 1 click.

### 3. Detailed Sneaker Inspection (`/shoes/[id]`)
- **Multi-Angle Gallery**: High-resolution sneaker photographs with thumbnail preview switcher.
- **US / EU Size Guide Modal**: Complete conversion chart (US Men, US Women, UK, EU, CM).
- **Colorway Selector**: Visual swatch chips with live selection.
- **Technical Specs**: Cushioning tech, upper materials, outsole tread, and style code (SKU).
- **Customer Reviews**: Star ratings, verified collector tags, and genuine buyer feedback.
- **Action Buttons**: "Add to Bag" and "Instant Checkout".

### 4. Smart Shopping Cart (`/cart`)
- **Item Quantity Stepper**: Adjust quantities with real-time subtotal re-calculation.
- **Free Shipping Progress Tracker**: Visual progress bar indicating how much more is needed to reach the $150 free shipping threshold.
- **Coupon Code Engine**: Instant percentage discount verification (`SNEAKER15` for 15% off).

### 5. Seamless Checkout & Payment (`/checkout`)
- **Shipping Address Form**: Full customer and delivery details.
- **Interactive Payment Options**:
  - **Credit/Debit Card**: Features a realistic animated sneaker card with real-time card number and cardholder formatting.
  - **UPI / QR Code**: Instant UPI ID input for GPay, PhonePe, and Paytm.
  - **PayPal**: Buyer-protected checkout.
  - **Cash on Delivery (COD)**: Payment upon physical inspection.
- **Celebratory Confetti**: Interactive `canvas-confetti` fireworks upon order completion.
- **Order Confirmation**: Displays assigned Order ID (e.g. `#SNK-829104`), tracking number, and delivery date.

### 6. Notifications Hub (`/notifications`)
- **Categorized Feed**: Filter notifications by All, Orders (📦), Hot Drops (🔥), Promos (🏷️), and System (⚙️).
- **Unread Badges**: Red unread pill on navigation bell icon and popover menu.
- **Quick Actions**: "Mark all as read" and individual dismiss.

### 7. User Profile & Order Tracking (`/profile`)
- **VIP Collector Overview**: Avatar, name, email, and member since date.
- **Live 4-Step Order Tracking**:
  - Step 1: `Order Placed`
  - Step 2: `Authenticated`
  - Step 3: `Shipped`
  - Step 4: `Delivered`
- **Supabase Status Indicator**: Clear badge showing whether live Supabase PostgreSQL is connected or running in local demo mode.

---

## 🗺️ Page Overview

| Route | Page | Key Functionality |
|:---|:---|:---|
| `/` | **Home Page** | Hero drop, brand spotlight, trending kicks, trust guarantees, drop newsletter |
| `/shoes` | **Shoe Catalog** | Multi-faceted sidebar filter, sorting, search keyword matching, shoe cards |
| `/shoes/[id]` | **Product Detail** | Gallery thumbnails, size guide modal, colorway selector, reviews, instant buy |
| `/cart` | **Shopping Bag** | Quantity modifier, free shipping progress bar, promo code engine, price breakdown |
| `/checkout` | **Checkout & Payment**| Address collection, animated card UI, UPI/COD, confetti celebration, order summary |
| `/notifications`| **Notifications Hub** | Tabbed notifications, unread counts, mark all read, direct order/drop links |
| `/profile` | **Account & Orders** | Collector profile, 4-step order timeline, shipping addresses, sign out |
| `/login` | **Sign In** | Email/password login, show/hide password, **1-click test demo login** |
| `/register` | **Registration** | Account creation, real-time password strength meter, terms checkbox |
| `/reset-password`| **Forgot Password** | Sends password recovery email via Supabase |
| `/auth/update-password` | **Update Password** | Handles recovery link tokens to change password |
| `/auth/callback`| **Auth Callback** | Route handler exchanging Supabase PKCE auth codes |

---

## 🏗️ Architecture & Tech Stack

```mermaid
flowchart TD
    User([User Browser]) -->|HTTP / React| NextApp[Next.js 16 App Router]
    
    subgraph Frontend [Client & UI Layer]
        NextApp --> Providers[Global Providers: Auth, Cart, Notifications, Toast]
        Providers --> Nav[Navbar with Search, Cart & Notifs]
        Providers --> View[Active Page View]
        View --> UIComp[ShoeCard, ProductFilter, AnimatedCard, SizeGuide]
    end

    subgraph StateManagement [Client State & Persistence]
        Providers --> CartCtx[CartContext + LocalStorage]
        Providers --> NotifCtx[NotificationContext + LocalStorage]
        Providers --> AuthCtx[AuthContext + Demo Fallback]
    end

    subgraph Backend [Supabase Backend]
        AuthCtx -->|@supabase/ssr| SupaAuth[Supabase Auth / GoTrue]
        AuthCtx -->|SQL Queries| SupaDB[(PostgreSQL Database)]
        SupaDB --> RLS[Row Level Security]
        SupaAuth --> Trigger[handle_new_user Trigger]
        Trigger --> SupaDB
    end
```

### Technologies Used:
- **Framework**: [Next.js 16 (Turbopack)](https://nextjs.org/)
- **UI & Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend & Auth**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`, `@supabase/ssr`)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Animations & Effects**: `canvas-confetti`, custom CSS radial glow effects

---

## 🗄️ Database Schema (PostgreSQL)

The complete SQL migration script is located in [`supabase/schema.sql`](supabase/schema.sql).

```sql
-- 1. Profiles Table (linked to Supabase Auth)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  address JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Products Table (Sneakers Catalog)
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  gender TEXT NOT NULL DEFAULT 'unisex',
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  images TEXT[] NOT NULL DEFAULT '{}',
  description TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  colors JSONB DEFAULT '[]'::jsonb,
  sizes NUMERIC[] DEFAULT '{}',
  in_stock BOOLEAN DEFAULT true,
  rating NUMERIC(2, 1) DEFAULT 4.8,
  review_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Orders Table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'processing',
  shipping_address JSONB NOT NULL,
  payment_method TEXT NOT NULL,
  subtotal NUMERIC(10, 2) NOT NULL,
  discount NUMERIC(10, 2) DEFAULT 0,
  total NUMERIC(10, 2) NOT NULL,
  tracking_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Order Items Table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  product_name TEXT NOT NULL,
  size NUMERIC NOT NULL,
  color TEXT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  price NUMERIC(10, 2) NOT NULL
);

-- 5. Notifications Table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'system',
  read BOOLEAN DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+ installed
- `pnpm` (recommended), `npm`, or `yarn`

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd supabase_nextjs
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

---

### Environment Variables

When you are ready to link your live Supabase project, create a `.env.local` file in the root directory:

```env
# Get these from Supabase Dashboard -> Project Settings -> API
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

*(A template is provided in [`.env.example`](.env.example))*

---

### Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in the left sidebar.
3. Copy the contents of [`supabase/schema.sql`](supabase/schema.sql) and paste them into the query editor.
4. Click **Run**. This will create:
   - All required tables (`profiles`, `products`, `orders`, `order_items`, `notifications`).
   - Secure Row-Level Security (RLS) policies.
   - The trigger function that automatically initializes a profile whenever a user registers.

---

## 🧪 Testing & Demo Mode

You don't need a Supabase account to test the entire application right away:

- **1-Click Demo Login**: On the `/login` page, click the **"Log In as Demo Collector"** button. This will automatically authenticate you as `Alex Rivera` with pre-filled addresses and order history.
- **Add to Bag**: Select any shoe on `/shoes`, choose your size and colorway, and click "Add to Bag".
- **Simulate Payment**: Go to `/checkout`, choose Credit Card, UPI, or Cash on Delivery, and click "Authorize & Pay". You will receive celebratory confetti and an assigned Order ID.
- **Track Status**: Visit `/profile` to observe the 4-step progress timeline for your order.

---

## 🏷️ Available Promo Codes

Test the checkout discount engine on the `/cart` page with these codes:

| Code | Discount | Description |
|:---|:---|:---|
| `SNEAKER15` | **15% OFF** | 15% discount on your entire order |
| `KICKS10` | **10% OFF** | 10% discount on your entire order |
| `FREESHIP` | **Free Shipping** | Unlocks free express courier shipping |

---

## 📁 Folder Structure

```
supabase_nextjs/
├── public/                     # Static public assets
├── supabase/
│   └── schema.sql              # Supabase PostgreSQL schema & RLS rules
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── auth/
│   │   │   ├── callback/       # Supabase OAuth/token exchange handler
│   │   │   └── update-password # Set new password page
│   │   ├── cart/               # Shopping bag & promo engine page
│   │   ├── checkout/           # Multi-method payment & confirmation page
│   │   ├── login/              # Sign in with 1-click demo login
│   │   ├── notifications/      # Filterable notification feed page
│   │   ├── profile/            # User account & 4-step order tracking
│   │   ├── register/           # Registration with password strength meter
│   │   ├── reset-password/     # Forgot password request page
│   │   ├── shoes/
│   │   │   ├── page.tsx        # Catalog with multi-filter sidebar
│   │   │   └── [id]/page.tsx   # Product detail & size guide modal
│   │   ├── globals.css         # Tailwind CSS v4 styling & dark accents
│   │   ├── layout.tsx          # Root layout with context providers
│   │   └── page.tsx            # Home page with hero showcase
│   ├── components/
│   │   └── ui/
│   │       ├── Footer.tsx      # E-commerce footer & trust badges
│   │       ├── Navbar.tsx      # Sticky navigation, search, cart & notifs
│   │       ├── ProductFilter.tsx # Sidebar filters (brand, size, price)
│   │       ├── ShoeCard.tsx    # Sneaker card with hover zoom & quick add
│   │       └── Toast.tsx       # Toast notification alert provider
│   ├── context/
│   │   ├── AuthContext.tsx     # Supabase auth state + demo fallback
│   │   ├── CartContext.tsx     # Shopping cart state & coupon engine
│   │   └── NotificationContext.tsx # Notifications & unread badge counters
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts       # Browser Supabase client (@supabase/ssr)
│   │   │   ├── middleware.ts   # Session refresh helper
│   │   │   └── server.ts       # Server Supabase client (Next.js cookies)
│   │   ├── mock-data.ts        # 12+ iconic shoes, reviews, notifications
│   │   └── utils.ts            # Formatting (currency, date, cn)
│   ├── middleware.ts           # Next.js middleware for session update
│   └── types/
│       └── index.ts            # TypeScript interfaces
├── .env.example                # Example environment variables
├── next.config.ts              # Next.js config (Unsplash image domain)
├── package.json
└── README.md
```

---

<div align="center">
Built with ❤️ for sneaker enthusiasts. Powered by Next.js & Supabase.
</div>
