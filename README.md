# KasirQ Landing Page

Modern landing page for KasirQ POS application, built with Next.js 15, Tailwind CSS v4, and Prisma.

## Features

### Public Landing Page

- **Hero Section**: Responsive design with animated elements and dashboard preview.
- **Features**: Grid layout highlighting key capabilities.
- **Testimonials**: Dynamic testimonials fetched from the database.
- **Pricing**: Pricing tiers with "Popular" badge and feature lists.
- **FAQ**: Accordion-style frequently asked questions.
- **Contact Form**: Functional contact form that saves submissions to the database.

### Admin Panel (`/admin`)

- **Dashboard**: Overview of total testimonials, pricing plans, FAQs, and messages.
- **Testimonials Management**: Add, edit, delete, and reorder testimonials.
- **Pricing Management**: Manage pricing plans, including features and images.
- **FAQ Management**: CRUD operations for FAQs.
- **Contact Submissions**: View messages sent from the landing page.
- **Authentication**: Secure admin login (Session-based).

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Database**: MySQL
- **ORM**: Prisma
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

1. **Clone the repository**

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup Database**

   - Configure your `.env` file with `DATABASE_URL`.
   - Run migrations:
     ```bash
     npx prisma db push
     ```
   - Seed initial data (optional but recommended):
     ```bash
     npx prisma db seed
     ```

4. **Run Development Server**

   ```bash
   npm run dev
   ```

5. **Access the App**
   - Landing Page: `http://localhost:3000`
   - Admin Panel: `http://localhost:3000/admin`

## Admin Credentials (Development)

- **Login URL**: `/admin/login`
- **Password**: `admin123`

## Deployment

This project is ready for deployment on Vercel. Ensure you configure the environment variables (DATABASE_URL) in your deployment settings.
