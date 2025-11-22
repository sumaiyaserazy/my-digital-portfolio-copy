# Vercel Deployment Guide

This guide will walk you through deploying your CyberShield portfolio application to Vercel.

## Prerequisites

1. **GitHub Repository**: Your code must be pushed to a GitHub repository
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (free tier available)
3. **Neon Database**: Set up a PostgreSQL database on [Neon](https://neon.tech) (free tier available)
4. **Clerk Account**: Set up authentication at [clerk.com](https://clerk.com) (free tier available)

## Step-by-Step Deployment

### 1. Push Your Code to GitHub

Make sure your code is committed and pushed to your GitHub repository:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Connect Repository to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository (`sumaiyaserazy/my-digital-portfolio-copy`)
4. Vercel will auto-detect Next.js configuration

### 3. Configure Build Settings

Vercel should auto-detect these settings, but verify:
- **Framework Preset**: Next.js
- **Build Command**: `pnpm run build` (or leave default)
- **Output Directory**: `.next` (default)
- **Install Command**: `pnpm install` (or leave default)
- **Node.js Version**: 18.x or higher

### 4. Set Environment Variables

In the Vercel project settings, go to **Settings** → **Environment Variables** and add:

#### Required Environment Variables

```env
# Database Configuration (Neon PostgreSQL)
DATABASE_URL=postgresql://[user]:[password]@[neon-hostname]-pooler.region.aws.neon.tech/[database]?sslmode=require

# Clerk Authentication
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx

# Clerk URLs (Optional - defaults work)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

#### How to Get These Values:

**DATABASE_URL (Neon):**
1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project or select existing
3. Go to **Connection Details**
4. Copy the connection string (use the **Pooler** connection string for better performance)
5. Format: `postgresql://user:password@host-pooler.region.aws.neon.tech/dbname?sslmode=require`

**Clerk Keys:**
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application or select existing
3. Go to **API Keys**
4. Copy:
   - **Secret Key** → `CLERK_SECRET_KEY`
   - **Publishable Key** → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

### 5. Configure Clerk for Production

In your Clerk Dashboard:
1. Go to **Configure** → **Domains**
2. Add your Vercel domain (e.g., `your-app.vercel.app`)
3. Add your custom domain if you have one
4. Update **Allowed Redirect URLs** to include:
   - `https://your-app.vercel.app`
   - `https://your-app.vercel.app/*`

### 6. Deploy

1. Click **"Deploy"** in Vercel
2. Wait for the build to complete (usually 2-5 minutes)
3. Your app will be live at `https://your-app.vercel.app`

### 7. Run Database Migrations

After first deployment, you may need to run database migrations:

**Option A: Using Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link to your project
vercel link

# Run migration (this will use your production DATABASE_URL)
pnpm run db:push
```

**Option B: Using Neon Console**
1. Go to Neon Console → SQL Editor
2. Copy the contents of `drizzle/0000_tough_ikaris.sql`
3. Paste and execute in the SQL Editor

## Post-Deployment Checklist

- [ ] Verify the site loads at your Vercel URL
- [ ] Test authentication (sign up/sign in)
- [ ] Verify database connection (check admin panel if accessible)
- [ ] Test protected routes (`/admin`, `/projects`, `/resources`)
- [ ] Check that environment variables are set correctly
- [ ] Verify Clerk domain configuration
- [ ] Test newsletter subscription (if applicable)

## Troubleshooting

### Build Fails with "pnpm-lock.yaml is not up to date"

**Solution:** Run `pnpm install` locally and commit the updated `pnpm-lock.yaml`:
```bash
pnpm install
git add pnpm-lock.yaml
git commit -m "Update pnpm-lock.yaml"
git push
```

### "Cannot connect to database"

**Check:**
- `DATABASE_URL` is set correctly in Vercel environment variables
- Database is accessible (not paused in Neon)
- Connection string uses `-pooler` suffix for better performance
- SSL mode is set to `require`

### "Clerk authentication not working"

**Check:**
- `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` are set
- Your Vercel domain is added to Clerk's allowed domains
- Redirect URLs are configured in Clerk dashboard

### Build takes too long

**Optimizations:**
- Enable Vercel's build cache
- Remove unused dependencies
- Check for large files in the repository

## Custom Domain (Optional)

1. In Vercel project settings, go to **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update Clerk domain settings to include your custom domain

## Environment Variables for Different Environments

You can set different values for:
- **Production**: Live site
- **Preview**: Pull request previews
- **Development**: Local development

Set these in Vercel Dashboard → Settings → Environment Variables

## Monitoring and Analytics

- **Vercel Analytics**: Already included via `@vercel/analytics` package
- **Build Logs**: Available in Vercel Dashboard → Deployments
- **Function Logs**: Available in Vercel Dashboard → Functions

## Updating Your Deployment

Simply push to your main branch:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Start a new build
3. Deploy when build succeeds
4. Update your live site

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Neon Documentation](https://neon.tech/docs)
- [Clerk Documentation](https://clerk.com/docs)

