# GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

## 📦 Files Added

1. **`.github/workflows/deploy.yml`** - GitHub Actions workflow for automatic deployment
2. **`vite.config.js`** - Updated with `base: '/redfire-demo/'` for GitHub Pages routing
3. **`.gitignore`** - Standard Node.js gitignore file

## 🚀 GitHub Settings (One-Time Setup)

Follow these steps in your GitHub repository:

### 1. Enable GitHub Pages
1. Go to your repository: `https://github.com/BT-Pro-Solutions/redfire-demo`
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select:
   - **Source:** `GitHub Actions` (NOT "Deploy from a branch")
5. Click **Save**

That's it! No other settings needed.

## 🎯 Deployment Process

### Automatic Deployment
Every time you push to `main`, the workflow will:
1. Install dependencies
2. Build the project
3. Deploy to GitHub Pages

### Manual Deployment
You can also trigger deployment manually:
1. Go to **Actions** tab in your repository
2. Click **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Select `main` branch
5. Click **Run workflow**

## 🌐 Your Live URL

Once deployed, your site will be available at:

**https://bt-pro-solutions.github.io/redfire-demo/**

## 📝 First Deployment

To deploy for the first time:

```bash
# Stage all files
git add .

# Commit changes
git commit -m "Add GitHub Pages deployment configuration"

# Push to GitHub
git push origin main
```

## ⏱️ Deployment Time

- First deployment: ~2-3 minutes
- Subsequent deployments: ~1-2 minutes

## 🔍 Monitoring Deployments

1. Go to the **Actions** tab in your repository
2. Click on the latest workflow run
3. You'll see:
   - ✅ Build job (compiles your app)
   - ✅ Deploy job (publishes to GitHub Pages)

## 🐛 Troubleshooting

### "404 on page load"
- Make sure **Source** is set to `GitHub Actions` in Pages settings
- Check that `base: '/redfire-demo/'` is in `vite.config.js`

### "Workflow not running"
- Verify the `.github/workflows/deploy.yml` file is in your repository
- Check that you have push access to the `main` branch
- Ensure GitHub Actions are enabled (Settings → Actions → General)

### "Page not updating"
- Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Wait 1-2 minutes for GitHub's CDN to update
- Check the Actions tab to confirm the deployment succeeded

## 📚 Demo Credentials

When sharing the demo, users can login with:
- **Email:** demo@redfire.com
- **Password:** demo123

## 🔄 Updating the Live Site

Just push to main:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

The site will automatically update in 1-2 minutes!






