# GitHub Actions Setup Guide

## 🚀 How to Build .exe Files Automatically

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a new repository named `reset-factory`
3. Leave it public or private (your choice)
4. Click "Create repository"

### Step 2: Push Your Code to GitHub

After creating the repository, follow the commands shown on GitHub:

```bash
cd /Users/vishal/Desktop/reset-factory
git remote add origin https://github.com/YOUR-USERNAME/reset-factory.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 3: Create a Release Tag (To Build Files)

Once code is pushed, create a release tag to trigger the build:

```bash
git tag v1.0.0
git push origin v1.0.0
```

### ✅ What Happens Next

1. GitHub detects the tag
2. Automatically builds on Windows → Creates `.exe` files
3. Automatically builds on macOS → Creates `.dmg` files
4. Creates a Release page with all built files

### 📥 Download Your Files

The built files will be available at:
`https://github.com/YOUR-USERNAME/reset-factory/releases`

You'll see:
- ✅ Windows `.exe` installer
- ✅ Windows portable `.exe`
- ✅ macOS `.dmg`
- ✅ macOS `.zip`

### 🔄 Future Builds

Every time you want to build new versions:

```bash
# Make changes to your code
git add .
git commit -m "Your changes"
git push origin main

# Create a new release tag
git tag v1.0.1
git push origin v1.0.1
```

### ⚙️ Files Included

The workflow file (`.github/workflows/build.yml`) handles:
- ✅ Installing dependencies
- ✅ Building Vite app
- ✅ Packaging with electron-builder
- ✅ Creating Windows .exe and macOS .dmg
- ✅ Uploading to GitHub Releases

### 📝 Notes

- First build may take 5-10 minutes
- You need a free GitHub account
- No credit card required
- The workflow runs on GitHub's servers (completely free)
- You can trigger builds manually from GitHub Actions tab

---

**Next Steps:**
1. Create GitHub account (if you don't have one)
2. Create repository
3. Push code
4. Create release tag
5. Download your .exe files from Releases page!
