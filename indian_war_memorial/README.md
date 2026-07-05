# 🇮🇳 Indian War Memorial - Web Application

![Indian War Memorial](https://img.shields.io/badge/Project-Indian_War_Memorial-138808?style=for-the-badge&logo=next.js&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-FF9933?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

Welcome to the **Indian War Memorial** project. This is a free, modern, and deeply respectful web application dedicated to honoring the brave soldiers of the Indian Armed Forces who made the supreme sacrifice for the nation.

This project is built to educate, honor, and inspire future generations. It features a complete historical timeline, an interactive map of India, detailed soldier profiles, and a secure admin dashboard for content management.

---

## 🌟 Table of Contents
1. [Project Vision & Overview](#project-vision--overview)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [Prerequisites](#prerequisites)
5. [Detailed Installation & Setup](#detailed-installation--setup)
6. [Environment Variables Explained](#environment-variables-explained)
7. [Third-Party Service Setup](#third-party-service-setup)
   - [MongoDB Setup](#1-mongodb-atlas)
   - [Cloudinary Setup](#2-cloudinary)
   - [Mailtrap Setup](#3-mailtrap)
8. [Project Structure](#project-structure)
9. [Usage Guide](#usage-guide)
   - [Public Facing Features](#public-facing-features)
   - [Admin Features](#admin-features)
10. [Customizing the Application](#customizing-the-application)
    - [The Soldier Theme](#the-soldier-theme)
    - [The Interactive SVG Map](#the-interactive-svg-map)
11. [Deployment Guide (Vercel)](#deployment-guide-vercel)
12. [API Documentation](#api-documentation)
13. [Troubleshooting](#troubleshooting)
14. [Contributing](#contributing)
15. [Disclaimer & Terms](#disclaimer--terms)

---

## 👁️ Project Vision & Overview

The Indian War Memorial is designed with a "Soldier Theme" — utilizing olive greens, camouflage tones, glassmorphism dark modes, and subtle accents of the Indian Tricolor. The goal is to create a premium, immersive, and emotionally resonant experience.

It serves as a digital monument where users can:
- Explore the history of India's major conflicts.
- Read biographies of Param Vir Chakra awardees and other martyred heroes.
- Visualize where historic battles took place on an interactive, 100% accurate political map of India.

This project is **100% free** and open for all Indians to spread knowledge.

---

## ✨ Key Features

- **Immersive Landing Page**: Hero section with Framer Motion animations, parallax effects, and particle backgrounds paying tribute to warriors.
- **Interactive Map of India**: A custom SVG map representing the accurate political boundaries of India (including POK and Aksai Chin), with animated pulsing dots indicating historic battlegrounds.
- **Historical Timeline**: A beautiful, scroll-animated vertical timeline detailing major wars (1947, 1962, 1965, 1971, Kargil, etc.).
- **Our Heroes Gallery**: Dedicated profiles for soldiers featuring real images, biographies, medals, and quotes.
- **Custom Authentication**: Independent login, registration, and forgot-password flows using NextAuth.js (Credentials Provider) and secure password hashing (Bcrypt).
- **Admin Dashboard**: A role-protected area for administrators to Add, Edit, and Manage Soldier and War details.
- **Free-Tier Friendly**: Architected specifically to be deployed on Vercel and MongoDB Atlas at zero cost.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: MongoDB (via Mongoose)
- **Authentication**: NextAuth.js (Auth.js)
- **Image Storage**: Cloudinary
- **Emails**: Nodemailer & Mailtrap (for development/testing)
- **Password Hashing**: bcryptjs

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- **Node.js** (v18.17.0 or higher)
- **npm** (v9 or higher) or **yarn** or **pnpm**
- **Git**

You will also need accounts for the following free services:
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Database)
- [Cloudinary](https://cloudinary.com/) (Image Hosting)
- [Mailtrap](https://mailtrap.io/) (Email testing)
- [Vercel](https://vercel.com/) (For Deployment)

---

## 🚀 Detailed Installation & Setup

Follow these steps to get the project running on your local machine.

### Step 1: Clone the Repository
Open your terminal and clone the repository:
```bash
git clone https://github.com/your-username/indian-war-memorial.git
cd indian-war-memorial
```

### Step 2: Install Dependencies
Install all required NPM packages:
```bash
npm install
# or
yarn install
```

### Step 3: Setup Environment Variables
Create a `.env.local` file in the root of the project:
```bash
cp .env.example .env.local
```
*(See the [Environment Variables Explained](#environment-variables-explained) section below on how to fill this out).*

### Step 4: Run the Development Server
Start the Next.js development server:
```bash
npm run dev
```

### Step 5: View the Application
Open your browser and navigate to:
```
http://localhost:3000
```
The application should now be running locally!

---

## 🔐 Environment Variables Explained

Your `.env.local` file should look like this:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/indian_war_memorial?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your_super_secret_random_string_min_32_chars
NEXTAUTH_URL=http://localhost:3000

# Cloudinary Configuration (For Image Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

# Mailtrap Configuration (For Forgot Password Emails)
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_password
EMAIL_FROM=noreply@indianwarmemorial.in

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

- **NEXTAUTH_SECRET**: This is used to encrypt the NextAuth.js JWT tokens. You can generate one by running `openssl rand -base64 32` in your terminal.
- **NEXTAUTH_URL**: Must match the base URL of your application. When deploying to production, change this to your actual domain.

---

## 🌐 Third-Party Service Setup

To make the application fully functional, you need to configure three external services.

### 1. MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up/login.
2. Create a new **Free M0 Cluster**.
3. In the Security section, go to **Database Access** and create a new user with read/write privileges. Remember the password.
4. Go to **Network Access** and add IP Address `0.0.0.0/0` to allow access from anywhere (required for Vercel deployment).
5. Go to **Databases**, click **Connect**, choose **Drivers**, and copy the connection string.
6. Replace `<username>` and `<password>` with the credentials you created in step 3. Paste this into `MONGODB_URI` in your `.env.local`.

### 2. Cloudinary
1. Go to [Cloudinary](https://cloudinary.com/) and sign up.
2. Go to your Dashboard.
3. You will immediately see your **Cloud Name**, **API Key**, and **API Secret**.
4. Copy these values into the corresponding `CLOUDINARY_` variables in your `.env.local`.

### 3. Mailtrap
1. Go to [Mailtrap](https://mailtrap.io/) and sign up.
2. Navigate to **Email Testing** -> **Inboxes** -> **My Inbox**.
3. Under the "Show Credentials" section, find the SMTP settings.
4. Copy the Host, Port, Username, and Password into the `MAILTRAP_` variables in your `.env.local`.
*(Note: When moving to production, you can swap Mailtrap for a service like Resend or SendGrid).*

---

## 📁 Project Structure

Here is an overview of the core project structure:

```text
indian_war_memorial/
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router Pages
│   │   ├── (auth)/         # Authentication route group (Login, Register, Forgot Password)
│   │   ├── admin/          # Admin Dashboard layout and pages
│   │   ├── api/            # API Routes (Auth, CRUD operations)
│   │   ├── battles/        # Campaigns & Wars pages
│   │   ├── heroes/         # Soldier profiles pages
│   │   ├── timeline/       # Standalone timeline page
│   │   ├── globals.css     # Global styles & Tailwind theme config
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing Page
│   ├── components/         # Reusable React components
│   │   ├── HeroSection.tsx
│   │   ├── HistoricalTimeline.tsx
│   │   ├── IndiaMap.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── lib/                # Utility functions
│   │   ├── mongodb.ts      # MongoDB connection logic
│   │   └── utils.ts        # Tailwind merge utilities
│   └── models/             # Mongoose Schemas
│       ├── Soldier.ts
│       ├── User.ts
│       └── War.ts
├── .env.example            # Environment variables template
├── tailwind.config.ts      # Tailwind configuration (if applicable)
└── package.json            # Project dependencies
```

---

## 📖 Usage Guide

### Public Facing Features
- **Home Page (`/`)**: Introduces the memorial. Scroll down to see the interactive India map. Click on glowing dots to view battle information. Scroll further to see the animated timeline.
- **Our Heroes (`/heroes`)**: Displays a grid of martyred soldiers. 
- **Battles & Campaigns (`/battles`)**: Detailed cards for major Indian wars.
- **Authentication**: Users can register and login. The forgot password flow sends a secure token to their email via Mailtrap.

### Admin Features
To access the Admin Dashboard, a user must have the `ADMIN` role.

**How to create an Admin User:**
1. Register a new user normally via the `/register` page.
2. Open your MongoDB Atlas dashboard.
3. Browse Collections -> Select the `indian_war_memorial` database -> Select the `users` collection.
4. Find the user document you just created.
5. Edit the document and change the `role` field from `"USER"` to `"ADMIN"`.
6. Save the document.
7. Log out and log back in on the website. You will now see the "Admin" button in the Navbar.

**Admin Capabilities:**
- Access `/admin` to view site statistics.
- (Coming Soon / To Be Implemented): Add new Soldiers (`/admin/soldiers/new`).
- (Coming Soon / To Be Implemented): Add new Wars (`/admin/wars/new`).

---

## 🎨 Customizing the Application

### The Soldier Theme
The color palette is strictly defined in `src/app/globals.css` using Tailwind CSS v4 `@theme` directives.

```css
@theme {
  --color-soldier-bg: #0B1006;
  --color-soldier-surface: #131A0F;
  --color-soldier-olive: #3E512B;
  --color-soldier-primary: #5A753F;
  --color-soldier-accent: #C49F47; /* Gold */
  --color-india-saffron: #FF9933;
  --color-india-white: #FFFFFF;
  --color-india-green: #138808;
}
```
You can modify these hex codes to tweak the overall look of the site.

### The Interactive SVG Map
The `IndiaMap.tsx` component utilizes a hardcoded SVG path that accurately represents the political boundaries of India.
- **To add new battles**: Find the `BATTLE_LOCATIONS` array inside `IndiaMap.tsx` and add new objects with `x`, `y` coordinates, a `label`, and a `color`.
- The pulsing animations are powered by Framer Motion.

---

## 🚀 Deployment Guide (Vercel)

Vercel is the recommended hosting platform for Next.js applications. It is completely free for this use case.

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and log in with GitHub.
3. Click **Add New** -> **Project**.
4. Import your GitHub repository.
5. In the "Configure Project" step, open the **Environment Variables** section.
6. Copy every variable from your `.env.local` file and paste them into Vercel. 
   *(Crucial: Change `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to your Vercel production URL, e.g., `https://indian-war-memorial.vercel.app`)*.
7. Click **Deploy**.

Vercel will automatically build and deploy your site. Any future pushes to the `main` branch will automatically trigger a redeployment.

---

## 🔌 API Documentation

The application exposes the following internal API routes:

- `POST /api/auth/register`
  - Body: `{ name, email, password }`
  - Returns: `201 Created` on success.
- `POST /api/auth/forgot-password`
  - Body: `{ email }`
  - Returns: `200 OK`. Generates a token and sends an email via Mailtrap.
- `GET /api/auth/[...nextauth]`
  - Handles all NextAuth.js session management, logins, and callbacks.

---

## 🛠️ Troubleshooting

**Issue: MongoDB Timeout / Cannot Connect**
- **Fix:** Ensure you have whitelisted IP address `0.0.0.0/0` in MongoDB Atlas Network Access.

**Issue: NextAuth Login Fails in Production**
- **Fix:** Ensure you have set `NEXTAUTH_URL` in your production environment variables to match your exact domain (including `https://`). Ensure `NEXTAUTH_SECRET` is set.

**Issue: Tailwind CSS Classes Not Applying**
- **Fix:** This project uses Tailwind CSS v4. Ensure you are not trying to use deprecated v3 configurations. All theme variables are defined in `globals.css`.

---

## 🤝 Contributing

We welcome contributions to make this memorial more comprehensive.
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AddNewHero`).
3. Commit your changes (`git commit -m 'Add profile for PVC awardee'`).
4. Push to the branch (`git push origin feature/AddNewHero`).
5. Open a Pull Request.

Please ensure your code follows the existing style guidelines and that any historical information added is factually verified.

---

## 📜 Disclaimer & Terms

- **Accuracy**: While every effort is made to ensure historical accuracy, this is a community-driven project.
- **Non-Commercial**: This project is strictly non-commercial. It must not be monetized or used for profit.
- **Copyright**: Images of soldiers and battles belong to their respective copyright holders (Government of India, Indian Armed Forces, etc.) and are used here purely for educational and memorial purposes under Fair Use.

---

**Jai Hind! 🇮🇳 Vande Mataram!**

*Created with respect and gratitude for the Indian Armed Forces.*
