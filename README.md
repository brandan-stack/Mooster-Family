# Mooster-Family
Family Budgeting App

## Deploying to Vercel

This project is configured to deploy automatically to Vercel via GitHub Actions on every push to `main`.

### One-time setup

1. **Create a Vercel project** at [vercel.com](https://vercel.com) and import this GitHub repository.
2. **Add the following secrets** to your GitHub repository (**Settings → Secrets and variables → Actions**):
   - `VERCEL_TOKEN` — your Vercel personal access token ([create one here](https://vercel.com/account/tokens))
   - `VERCEL_ORG_ID` — your Vercel team/personal account ID (found in Vercel project settings)
   - `VERCEL_PROJECT_ID` — your Vercel project ID (found in Vercel project settings)
3. Push to `main` — the workflow will build and deploy the app automatically, giving you a live URL.

### Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
