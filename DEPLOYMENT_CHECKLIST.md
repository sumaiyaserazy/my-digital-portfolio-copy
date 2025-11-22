# Vercel Deployment Checklist

Use this checklist to ensure a smooth deployment to Vercel.

## Pre-Deployment

- [ ] Code is committed and pushed to GitHub
- [ ] `pnpm-lock.yaml` is up to date (run `pnpm install` if needed)
- [ ] All environment variables are documented
- [ ] No sensitive data is committed to the repository

## Vercel Setup

- [ ] Created Vercel account
- [ ] Connected GitHub repository to Vercel
- [ ] Verified build settings (Framework: Next.js, Build Command: `pnpm run build`)

## Environment Variables in Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

- [ ] `DATABASE_URL` - PostgreSQL connection string from Neon
- [ ] `CLERK_SECRET_KEY` - Secret key from Clerk Dashboard
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Publishable key from Clerk Dashboard
- [ ] `NEXT_PUBLIC_CLERK_SIGN_IN_URL` - (Optional) Default: `/sign-in`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_UP_URL` - (Optional) Default: `/sign-up`
- [ ] `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` - (Optional) Default: `/`
- [ ] `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` - (Optional) Default: `/`

## Database Setup (Neon)

- [ ] Created Neon account and project
- [ ] Copied connection string (use Pooler connection)
- [ ] Connection string format: `postgresql://user:pass@host-pooler.region.aws.neon.tech/db?sslmode=require`
- [ ] Database is not paused

## Clerk Setup

- [ ] Created Clerk account and application
- [ ] Copied API keys (Secret Key and Publishable Key)
- [ ] Added Vercel domain to Clerk allowed domains
- [ ] Configured redirect URLs in Clerk dashboard

## Deployment

- [ ] Clicked "Deploy" in Vercel
- [ ] Build completed successfully
- [ ] Site is accessible at Vercel URL

## Post-Deployment

- [ ] Site loads correctly
- [ ] Database migrations run (check admin panel or run `pnpm run db:push`)
- [ ] Authentication works (test sign up/sign in)
- [ ] Protected routes work (`/admin`, `/projects`, `/resources`)
- [ ] Clerk authentication redirects work correctly
- [ ] Newsletter subscription works (if applicable)

## Troubleshooting

If build fails:
- [ ] Check build logs in Vercel Dashboard
- [ ] Verify `pnpm-lock.yaml` is committed
- [ ] Check environment variables are set correctly

If database connection fails:
- [ ] Verify `DATABASE_URL` is correct
- [ ] Check Neon database is not paused
- [ ] Verify connection string uses `-pooler` suffix

If authentication fails:
- [ ] Verify Clerk keys are correct
- [ ] Check Vercel domain is added to Clerk
- [ ] Verify redirect URLs in Clerk dashboard

## Next Steps

- [ ] Set up custom domain (optional)
- [ ] Configure Vercel Analytics
- [ ] Set up monitoring/alerts
- [ ] Review security settings

---

**Need help?** See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

