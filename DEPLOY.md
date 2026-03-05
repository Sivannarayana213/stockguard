# Push to GitHub & Production Testing

## 1. Push to GitHub

```bash
cd c:\Users\nnara\Desktop\nanna\stockguard

git add -A
git status
git commit -m "feat: Google Sign-In, Shopify connect fixes, production config"
git push origin main
```

**Before pushing:** If `application.properties` contains real passwords or API keys, either:
- Remove them and use placeholders, then set real values via env vars locally, or
- Add `api/src/main/resources/application-local.properties` with real values and add it to `.gitignore` (so only `application.properties` with placeholders is committed).

---

## 2. Production-Level Testing

### Option A: Deploy UI only (e.g. Vercel), API stays local

1. Push repo to GitHub.
2. In [Vercel](https://vercel.com): Import your repo, set **Root Directory** to `ui`.
3. **Environment variables** in Vercel:
   - `VITE_API_URL` = your **public** API URL (e.g. ngrok URL like `https://xxxx.ngrok.io` while testing, or your deployed API URL later).
   - `VITE_GOOGLE_CLIENT_ID` = your Google Web client ID.
4. Deploy. Your production UI will call the URL you set in `VITE_API_URL`.

### Option B: Deploy both UI and API

**Backend (API)** – e.g. Render, Railway, Fly.io:

1. Create a **PostgreSQL** database (Render, Railway, or Neon).
2. Create a new **Web Service** and connect your GitHub repo; set **Root** to `api` (or build command `cd api && mvn -q package`, start command `java -jar api/target/ShopSathi-*.jar`).
3. Set **environment variables** (these override `application.properties` when you run with `--spring.profiles.active=prod` or set `SPRING_PROFILES_ACTIVE=prod`):
   - `SPRING_PROFILES_ACTIVE=prod`
   - `SPRING_DATASOURCE_URL=jdbc:postgresql://...`
   - `SPRING_DATASOURCE_USERNAME=...`
   - `SPRING_DATASOURCE_PASSWORD=...`
   - `SHOPIFY_API_KEY=...`
   - `SHOPIFY_API_SECRET=...`
   - `SHOPIFY_REDIRECT_URI=https://your-api-domain.com/api/integrations/shopify/callback`
   - `SHOPIFY_WEBHOOK_URL=https://your-api-domain.com/api/webhooks/shopify/inventory`
   - `GOOGLE_CLIENT_ID=...`
4. In Shopify Partner Dashboard, add your **production** redirect URL and app URL.

**Frontend (UI)** – Vercel:

1. Root Directory: `ui`.
2. Env: `VITE_API_URL=https://your-api-domain.com`, `VITE_GOOGLE_CLIENT_ID=...`.

**CORS:** Backend already allows your Vercel URLs (`stockguard.vercel.app`, `stockguard-rouge.vercel.app`). Add any new production UI URL in `SecurityConfig.java` if you use a different domain.

---

## 3. Quick production-style test (no deploy)

- Run API locally: `cd api && mvn spring-boot:run`.
- Run UI locally: `cd ui && npm run dev`.
- In another terminal, run **ngrok**: `ngrok http 8080`.
- In `ui/.env`: set `VITE_API_URL=https://your-ngrok-url.ngrok.io`.
- Restart the UI and use the app; the UI will call the API via the public ngrok URL (similar to production).
