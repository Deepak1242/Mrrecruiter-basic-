# MrRecruiter — LinkedIn-like Frontend

Modern, aesthetic React app built with Vite, Tailwind CSS, Recoil, and React Router. Includes:

- Landing page with beautiful gradient background and feature cards.
- Glassmorphic Login and Signup screens.
- Navbar with Home, Jobs, Profile and auth actions.
- Protected routes for Home, Jobs, Profile using a Recoil-based auth state.

## Tech Stack

- React + Vite
- Tailwind CSS + PostCSS + Autoprefixer
- Recoil (auth state with localStorage persistence)
- React Router (routing + protected routes)

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the dev server

   ```bash
   npm run dev
   ```

3. Open the app

   Visit the URL printed in the terminal (usually http://localhost:5173).

## Project Structure

- `src/state/auth.js` — Recoil atom and helpers (`login`, `logout`, `updateUser`).
- `src/components/Navbar.jsx` — App navigation.
- `src/components/ProtectedRoute.jsx` — Redirects to `/login` when unauthenticated.
- `src/pages/` — `Landing`, `Login`, `Signup`, `Home`, `Jobs`, `Profile`.
- `tailwind.config.js` + `postcss.config.js` — Tailwind setup.
- `src/index.css` — Tailwind directives + custom utilities (`.glass-card`, `.gradient-text`).

## Notes

- Auth is mocked for demo purposes. `login()` simply sets a demo token; integrate with your backend when ready.
- Editor may warn about `@tailwind` at-rules in CSS; this is expected and resolves at build time via PostCSS.

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview the build locally
