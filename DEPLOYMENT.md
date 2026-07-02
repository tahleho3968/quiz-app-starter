# 🚀 Deployment Guide - ACA Quiz App

## 📋 Overview

How the ACA Quiz App is deployed, and how to troubleshoot common issues.

---

## 🌐 Live URL

**Production URL:** https://quiz-app-starter-omega.vercel.app/

---

## 🛠️ Deployment Platform

We use **Vercel**: automatic deploys on push, preview deployments for PRs, CDN, SSL by default, zero-config for Vite projects.

---

## 📦 Deployment Workflow

### Automatic Deployment
Every push to the connected branch on GitHub triggers an automatic build and deploy:

```bash
git add .
git commit -m "feat: New feature"
git push origin master
```

Vercel detects the push, runs `npm run build`, and updates the live URL — usually within 1–2 minutes. Check status on the Vercel Dashboard.

### Manual Deployment
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 🔧 Vercel Project Settings

| Setting | Value |
|---------|-------|
| **Framework** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

No environment variables are currently required by this app.

---

## 🧪 Preview Deployments

Creating a Pull Request on GitHub automatically triggers a Vercel preview deployment with its own URL, and Vercel comments the link directly on the PR — useful for testing changes before merging to `master`.

---

## ⚠️ Known Issue: CI Doesn't Actually Run

`.github/workflows/ci.yml` is configured to trigger only on pushes/PRs to a branch named **`main`**:

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

This repo's working branch is **`master`**, not `main` — so as currently configured, this workflow never fires. Fix by changing both branch references to `master`:

```yaml
on:
  push:
    branches: [master]
  pull_request:
    branches: [master]
```

Worth fixing before submission, since "clean CI" is part of what's being evaluated and right now the CI badge (if you add one) would be misleading.

---

## 🚨 Troubleshooting

### Build fails
```bash
npm run build        # reproduce locally
npx tsc --noEmit      # check TypeScript errors in isolation
npm run lint          # check lint errors
```

### Live site not updating
- Confirm the push actually landed on the branch Vercel is watching
- Check the Vercel Dashboard deployment status
- Hard refresh (Ctrl+Shift+R / Cmd+Shift+R) to rule out browser cache

### 404 on the live site
- Check the Vercel project's configured output directory matches `dist`
- Confirm the build actually produced files in `dist/`

---

## 🔄 Rollback

**Via Vercel Dashboard:** Deployments → find the previous working deployment → "Promote to Production".

**Via Git:**
```bash
git revert HEAD~1
git push origin master
```

---

## 📝 Pre-Deployment Checklist

- [ ] `npm run build` succeeds locally
- [ ] `npm run lint` passes with 0 errors
- [ ] No leftover `console.log` or debug code
- [ ] Manually tested all 6 game modes at least once
- [ ] Mobile responsiveness checked
- [ ] README updated and pushed

## 📝 Post-Deployment Checklist

- [ ] Live URL loads and the app actually works (not just the empty shell)
- [ ] Test each game mode on the live site, not just locally
- [ ] Check the browser console for errors on the live site
- [ ] CI workflow actually runs (see the branch-name fix above)

---

## 📚 Resources

- [Vercel + Vite Guide](https://vercel.com/docs/frameworks/vite)
- [Vercel Git Integration](https://vercel.com/docs/git)

---

**Team Delta - Africa Code Academy Orientation Week 2026**