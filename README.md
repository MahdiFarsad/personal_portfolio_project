# Portfolio Website

A personal portfolio built with **Next.js** (static export) on the frontend and a **PHP + MySQL** backend — showcasing projects in machine learning, deep learning, data science, computer vision, genomics/biomedical ML, and full-stack development.

**Live site:** [mahdifarsad.com](https://mahdifarsad.com)

---

## Features

- **Home / About** — bio, contact links, CV download
- **Projects** — database-driven list and detail pages, filterable by category/status
- **Upcoming Projects** — a look at what's currently in progress
- **Experience** — a visual work-history timeline
- **Education & Research** — academic background and research/academic projects
- **Blog** — database-driven posts with a list and detail view
- **Contact** — a working request/inquiry form with spam protection, stored in a database and emailed on submission
- **Admin Panel** — a password-protected dashboard to add, edit, and delete Projects and Blog posts, and to view/manage Contact form submissions — all without touching code

## Tech Stack

**Frontend**
- [Next.js](https://nextjs.org/) (App Router, static export)
- [Tailwind CSS v4](https://tailwindcss.com/)
- Vanilla `fetch` for client-side data loading (no extra state library needed)

**Backend**
- PHP (plain, no framework) with PDO for database access
- MySQL

**Why this stack:** the site is hosted on a shared/cloud hosting plan that only supports PHP execution (no Node.js or Python runtime available). The frontend is therefore built as a fully static export — plain HTML/CSS/JS — and served alongside a lightweight PHP API that handles dynamic data and form submissions.

## Project Structure

```
portfolio/
├── database/
│   └── schema.sql          # Full MySQL schema
├── backend/
│   ├── includes/           # Shared DB connection, config, auth helpers
│   ├── api/                # PHP endpoints (projects, posts, contact form)
│   └── admin/               # Password-protected content management panel
└── frontend/
    └── src/
        ├── app/             # Next.js pages (App Router)
        ├── data/            # Static content (experience, education)
        └── app/components/  # Shared UI components
```

## Running Locally

**Requirements:** Node.js (LTS), a local PHP + MySQL environment (e.g. [Laragon](https://laragon.org/), XAMPP, or MAMP)

1. Clone the repo:
   ```bash
   git clone https://github.com/MahdiFarsad/portfolio.git
   ```
2. Import `database/schema.sql` into a local MySQL database via phpMyAdmin.
3. Copy `backend/includes/config.example.php` to `backend/includes/config.php` and fill in your local database credentials.
4. Serve the `backend/` folder through your local Apache/PHP environment.
5. Install and run the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
6. Visit `http://localhost:3000`.

## Deployment

The frontend is built as a static export (`npm run build`, `output: 'export'` in `next.config.mjs`) and uploaded alongside the PHP backend to any standard Apache/PHP/MySQL hosting environment — no Node.js or Python runtime required on the server.

## License

Personal project — feel free to browse the code for reference, but please don't republish it as your own portfolio.
