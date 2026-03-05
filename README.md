# Ubani Hosting Website

This repository contains the source for the **Ubani Hosting** marketing site. It's a React + Vite single‑page application
styled with TailwindCSS. A Cloudflare Pages Function is used to relay contact form submissions through EmailJS, making
environment variables and service IDs safe for production.

---

## Getting started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run in development mode**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173` (Vite default).

3. **Build for production**
   ```bash
   npm run build
   ```
   The output will be written to `dist/` which Cloudflare Pages will serve.

4. **Preview the production build**
   ```bash
   npm run preview
   ```

## Environment variables

The front‑end no longer needs any secrets; all form handling is done via a serverless function.
Set the following variables in your Cloudflare Pages project (Dashboard > Settings > Environment
Variables & Secrets) or via `wrangler.toml` when deploying from CLI:

- `EMAILJS_PUBLIC_KEY` – public key from EmailJS
- `EMAILJS_SERVICE_ID` – service ID assigned by EmailJS
- `EMAILJS_TEMPLATE_ID` – template ID you configured in EmailJS

A sample `.env.example` file is included for reference. You can also create a local `.env` file
during development; variables prefixed with `VITE_` will be injected into the client, although none
are used at the moment.

## Deploying to Cloudflare Pages

1. Create a new Pages project pointing at this repo (or use the existing one).
2. Set the build command to `npm run build` and the output directory to `dist`.
3. Add the environment variables mentioned above.
4. Click **Deploy**; the site will redeploy automatically on every push to `main`.

You can also deploy from the CLI with Wrangler:

```bash
npm install -g wrangler
wrangler pages deploy dist --project-name=your-project-name
```

## Features added / fixes made

- Resolved contact form emailing issues by using a Cloudflare Pages Function.
- Removed any mention of founders or technical support in the copy (no more "Techsupport").
- Added realistic pricing tables and improved page content to make the site shine.
- Refactored header to use React Router links for a smoother SPA experience.
- Added comprehensive terms of service and about page content.
- Included `vite.config.ts` and base relative path suitable for Cloudflare.

---

Enjoy building and deploying — the framework is lightweight and ready to scale!  

© Ubani Hosting 2024

