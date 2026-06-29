# 🚀 Deployment Guide: Hosting Your Portfolio Online

This guide explains how to host your professional portfolio online for free so you can share it with recruiters, put it on your resume, and link it on LinkedIn.

---

## Option 1: GitHub Pages (Recommended)
Since you already have a GitHub account (`manohargujjuru-dot`), GitHub Pages is the best and most professional way to host your portfolio for free.

### Step 1: Create a GitHub Repository
1. Go to [github.com](https://github.com/) and log in.
2. Click the **New** button to create a new repository.
3. Name your repository `portfolio` (or anything you prefer).
4. Keep it **Public**.
5. Do **NOT** initialize it with a README, `.gitignore`, or license. Click **Create repository**.

### Step 2: Push Your Code to GitHub
Open VS Code terminal or PowerShell inside your `e:\portfoilo` folder and run these commands:
```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Create your first commit
git commit -m "Initial commit: Professional portfolio with ATS resume"

# Rename branch to main
git branch -M main

# Link your local repository to GitHub (Replace 'manohargujjuru-dot' with your actual username if different)
git remote add origin https://github.com/manohargujjuru-dot/portfolio.git

# Push your files to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click on the **Settings** tab.
3. In the left sidebar, scroll down to the **Code and automation** section and click on **Pages**.
4. Under **Build and deployment**, set the Source to **Deploy from a branch**.
5. Under **Branch**, select `main` (or `master`) and `/ (root)` folder.
6. Click **Save**.

Your portfolio will be live at:
👉 **`https://manohargujjuru-dot.github.io/portfolio/`**

---

## Option 2: Netlify (Drag & Drop - Easiest)
If you don't want to use command line commands right now, you can deploy your site in less than 30 seconds using Netlify.

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop your folder `e:\portfoilo` directly into the box on the website.
3. Netlify will instantly upload your files and generate a public link (e.g., `https://random-name.netlify.app`).
4. You can go to **Site configuration** -> **Change site name** to customize your link to something professional, like `manohargujjuru.netlify.app`.

---

## Option 3: Vercel CLI (Super Fast)
If you have Node.js installed, you can deploy with Vercel's fast command line interface:

1. Open PowerShell or Command Prompt inside `e:\portfoilo`.
2. Run the deployment command:
   ```bash
   npx vercel
   ```
3. Log in or create a free Vercel account when prompted.
4. Answer the setup questions (you can accept all default answers by pressing Enter).
5. Vercel will instantly build and give you a live production URL!
