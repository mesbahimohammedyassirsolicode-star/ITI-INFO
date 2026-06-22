# Institut ITI - Static Frontend

This project is now a fully static React + Vite website with no backend/API dependency.

## What changed

- All API/network logic was replaced by local mock/static services.
- Authentication is mock-only and stored in browser localStorage.
- Admin data (formations, inscriptions, stats) is generated and managed client-side.
- Contact and inscription forms run in static mode with fake-success behavior.
- `.env` backend config usage was removed from the frontend.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Static hosting support

- **Netlify**: `public/_redirects` is included for SPA fallback.
- **Vercel**: `vercel.json` includes SPA rewrite to `index.html`.
- **GitHub Pages**: app uses `HashRouter`, so deep links work without server rewrites.

## Demo admin credentials

