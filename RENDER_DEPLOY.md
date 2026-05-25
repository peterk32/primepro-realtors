# Deploying Mandela-Max Properties to Render (Free Tier)

This project's normal `vite build` targets Cloudflare Workers (used by Lovable).
For Render we use a **parallel** Node build — nothing about the app code changes.

## What was added

- `vite.config.render.ts` — Node SSR build config (no Cloudflare plugin)
- `render.yaml` — Render Blueprint (web service, free plan, Node 20)
- `npm run build:render` — script that uses the Render config
- `npm start` already runs `node .output/server/index.mjs`

## One-time setup

### 1. Push to GitHub
Use Lovable's GitHub integration (top-right → GitHub → Connect) or push manually.

### 2. Create the Render service
1. Go to <https://dashboard.render.com> → **New +** → **Blueprint**
2. Connect your GitHub repo → Render reads `render.yaml` automatically
3. Click **Apply**

### 3. Set environment variables
In the Render dashboard → your service → **Environment**, paste these values
(copy them from your local `.env` file — they're already in the project):

| Variable | Value source |
|---|---|
| `VITE_SUPABASE_URL` | `.env` → `VITE_SUPABASE_URL` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `.env` → `VITE_SUPABASE_PUBLISHABLE_KEY` |
| `VITE_SUPABASE_PROJECT_ID` | `.env` → `VITE_SUPABASE_PROJECT_ID` |
| `SUPABASE_URL` | same URL as above |
| `SUPABASE_PUBLISHABLE_KEY` | same key as the VITE one |
| `SUPABASE_SERVICE_ROLE_KEY` | `.env` → `SUPABASE_SERVICE_ROLE_KEY` |

Then click **Save, rebuild & deploy**.

### 4. Done
Your site goes live at `https://mandela-max-properties.onrender.com`
(or whatever name Render assigns).

## Notes about Render's free tier
- The service **sleeps after 15 min idle**; first request after sleep takes ~30s.
- 750 free instance hours/month.
- Free plan supports custom domains.

## Local test of the Render build
```bash
npm run build:render
npm start
# open http://localhost:3000
```

## Why two configs?
Lovable's Preview/Publish flow needs the Cloudflare worker output. Render needs
Node. Keeping two configs means neither environment breaks the other — and you
keep using "Publish" in Lovable as a one-click backup deploy.
