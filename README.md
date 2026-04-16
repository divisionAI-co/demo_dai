# Customer demo (standalone)

Sibling folder to `dAI-orchestrator`. Use this as a **neutral landing page** during customer calls: fast to run, no backend, easy to customize.

## Run locally

```bash
cd customer-demo
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build for static hosting

```bash
npm run build
npm run preview   # optional local check of production build
```

Output is in `dist/` — deploy to any static host (S3, Netlify, Vercel static, etc.).

## Customize for the meeting

- **Copy & messaging:** Edit `src/App.tsx` (hero, features, demo flow bullets).
- **Branding:** Swap the “D” mark, title “Division AI”, and footer in `App.tsx` and `index.html`.
- **Embed your product:** Replace the “Ready for the next slide” section with an iframe, image, or link to your orchestrator UI.

## What this is not

- No API keys, no connection to production orchestrator.
- Safe to share as a zip or public repo for prospects.
