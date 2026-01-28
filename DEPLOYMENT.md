# Deployment Guide

This guide covers deploying the portfolio website to Vercel with automatic deployments, custom domain configuration, and environment variable setup.

## Prerequisites

- GitHub account with repository access
- Vercel account (free tier is sufficient)
- Custom domain (optional, for production deployment)
- Resend API key for contact form functionality

## Quick Start

### 1. Initial Vercel Setup

1. **Connect to Vercel**:
   - Visit [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "Add New Project"
   - Import your portfolio repository
   - Vercel will automatically detect Next.js configuration

2. **Configure Build Settings** (auto-detected from `vercel.json`):
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
   - Development Command: `npm run dev`

### 2. Environment Variables Configuration

Configure the following environment variables in Vercel:

#### Required Variables

```bash
# Email Integration (Resend)
RESEND_API_KEY=re_your_api_key_here
PORTFOLIO_OWNER_EMAIL=your-email@example.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

#### Optional Variables

```bash
# Analytics (automatically configured by Vercel)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=auto-configured
```

**To add environment variables in Vercel**:
1. Go to Project Settings → Environment Variables
2. Add each variable with appropriate scope:
   - **Production**: Live site environment
   - **Preview**: Pull request preview deployments
   - **Development**: Local development (use `.env.local` instead)

### 3. Automatic Deployment Setup

Vercel automatically configures:

✅ **Main Branch Deployment**:
- Every push to `main` branch triggers production deployment
- Automatic build and deployment pipeline
- Zero-downtime deployments with instant rollback capability

✅ **Preview Deployments**:
- Every pull request gets a unique preview URL
- Isolated environment for testing changes
- Automatic cleanup when PR is closed

✅ **SSL/TLS Certificates**:
- Automatic HTTPS for all deployments
- Free SSL certificates via Let's Encrypt
- Automatic certificate renewal

### 4. Custom Domain Configuration

#### Adding a Custom Domain

1. **In Vercel Dashboard**:
   - Go to Project Settings → Domains
   - Click "Add Domain"
   - Enter your domain (e.g., `arnavtiwari.com`)

2. **Configure DNS Records**:

   **Option A: Using Vercel Nameservers (Recommended)**:
   ```
   Update nameservers at your domain registrar:
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

   **Option B: Using CNAME Record**:
   ```
   Type: CNAME
   Name: www (or @)
   Value: cname.vercel-dns.com
   ```

   **Option C: Using A Record**:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

3. **Verify Domain**:
   - Vercel will automatically verify DNS configuration
   - SSL certificate is provisioned automatically (takes 1-5 minutes)
   - Domain becomes active once verification completes

4. **Update Environment Variables**:
   ```bash
   NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com
   ```

#### Domain Best Practices

- **Redirect www to apex** (or vice versa): Configure in Vercel domain settings
- **Use HTTPS only**: Enforced automatically by Vercel
- **Update sitemap**: Ensure `NEXT_PUBLIC_SITE_URL` matches your domain

### 5. Deployment Verification

After deployment, verify the following:

#### Performance Checks
```bash
# Run Lighthouse audit
npm run test -- lighthouse-quality-standards.spec.ts

# Check Core Web Vitals
npm run test -- core-web-vitals-performance.spec.ts

# Verify bundle size
npm run build:check
```

#### Functionality Checks
- [ ] Homepage loads correctly
- [ ] All sections render properly
- [ ] Contact form submits successfully
- [ ] Resume download works
- [ ] Navigation functions on mobile and desktop
- [ ] Analytics tracking is active

#### Security Checks
- [ ] HTTPS is enforced
- [ ] Security headers are present
- [ ] No API keys exposed in client code
- [ ] Contact form rate limiting works

### 6. Monitoring and Analytics

#### Vercel Analytics

Automatically enabled for all deployments:
- Real-time visitor analytics
- Core Web Vitals monitoring
- Performance insights
- No configuration required

#### Custom Event Tracking

The portfolio tracks:
- Resume downloads
- Contact form submissions
- Project link clicks
- External link navigation

View analytics in Vercel Dashboard → Analytics tab.

## Advanced Configuration

### Preview Deployment Settings

Configure preview deployment behavior in Vercel:

1. **Automatic Preview Deployments**:
   - Enabled by default for all branches
   - Each PR gets a unique URL: `portfolio-website-git-branch-username.vercel.app`

2. **Preview Environment Variables**:
   - Use separate API keys for preview deployments
   - Test email integration without affecting production

3. **Preview Deployment Protection**:
   - Enable password protection for preview deployments
   - Useful for client reviews before going live

### Deployment Hooks

Vercel provides deployment hooks for automation:

```bash
# Trigger deployment via webhook
curl -X POST https://api.vercel.com/v1/integrations/deploy/[hook-id]
```

Use cases:
- Trigger rebuild when CMS content changes
- Scheduled deployments for content updates
- Integration with CI/CD pipelines

### Environment-Specific Configuration

The `vercel.json` file configures:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "env": {
    "RESEND_API_KEY": "@resend_api_key",
    "FROM_EMAIL": "@from_email",
    "TO_EMAIL": "@to_email"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "origin-when-cross-origin"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=(), interest-cohort=()"
        }
      ]
    }
  ]
}
```

### Rollback Procedures

If a deployment causes issues:

1. **Instant Rollback**:
   - Go to Deployments tab in Vercel
   - Find the last working deployment
   - Click "Promote to Production"

2. **Git Revert**:
   ```bash
   git revert HEAD
   git push origin main
   ```
   - Automatically triggers new deployment with reverted changes

### Performance Optimization

Vercel automatically provides:
- **Edge Network**: Global CDN with 100+ locations
- **Image Optimization**: Automatic WebP conversion and resizing
- **Smart Caching**: Intelligent cache invalidation
- **Compression**: Automatic Brotli/Gzip compression

## Troubleshooting

### Common Issues

#### Build Failures

**Issue**: Build fails with TypeScript errors
```bash
# Solution: Run type check locally
npm run type-check

# Fix errors and push again
```

**Issue**: Build fails with missing dependencies
```bash
# Solution: Ensure package-lock.json is committed
git add package-lock.json
git commit -m "Add package-lock.json"
git push
```

#### Environment Variable Issues

**Issue**: Contact form not working
```bash
# Check environment variables are set correctly
# Verify RESEND_API_KEY starts with 're_'
# Ensure PORTFOLIO_OWNER_EMAIL is valid
```

**Issue**: Analytics not tracking
```bash
# Verify NEXT_PUBLIC_SITE_URL is set
# Check Vercel Analytics is enabled in project settings
```

#### Domain Configuration Issues

**Issue**: Domain not resolving
```bash
# Verify DNS records are correct
# Wait 24-48 hours for DNS propagation
# Use DNS checker: https://dnschecker.org
```

**Issue**: SSL certificate not provisioning
```bash
# Ensure domain is verified in Vercel
# Check DNS records point to Vercel
# Wait 5-10 minutes for certificate generation
```

### Getting Help

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: Available in dashboard for Pro plans
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

## Deployment Checklist

Before deploying to production:

- [ ] All tests pass (`npm run test:all`)
- [ ] Environment variables configured in Vercel
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Contact form tested with real email
- [ ] Resume PDF uploaded and accessible
- [ ] Analytics tracking verified
- [ ] Performance metrics meet targets (Lighthouse ≥ 95)
- [ ] Security headers verified
- [ ] Mobile responsiveness tested
- [ ] Cross-browser compatibility verified

## Maintenance

### Regular Updates

1. **Dependency Updates**:
   ```bash
   npm outdated
   npm update
   npm run test:all
   git commit -am "Update dependencies"
   git push
   ```

2. **Content Updates**:
   - Edit files in `src/data/`
   - Commit and push to trigger deployment
   - Verify changes in preview deployment

3. **Security Updates**:
   - Monitor Dependabot alerts
   - Apply security patches promptly
   - Test thoroughly before deploying

### Monitoring

- **Check Vercel Dashboard** weekly for:
  - Deployment status
  - Performance metrics
  - Error logs
  - Analytics trends

- **Run automated tests** regularly:
  ```bash
  npm run test:all
  ```

## Cost Considerations

### Vercel Free Tier Includes:
- Unlimited deployments
- 100GB bandwidth per month
- Automatic HTTPS
- Preview deployments
- Analytics (basic)
- 100 serverless function executions per day

### Upgrade Considerations:
- **Pro Plan** ($20/month):
  - Increased bandwidth and function executions
  - Advanced analytics
  - Priority support
  - Password protection for deployments

### Resend Free Tier Includes:
- 100 emails per day
- 1 verified domain
- Email API access

## Security Best Practices

1. **Environment Variables**:
   - Never commit `.env.local` to Git
   - Use different API keys for production and preview
   - Rotate API keys periodically

2. **Access Control**:
   - Limit Vercel project access to necessary team members
   - Use GitHub branch protection rules
   - Require PR reviews before merging to main

3. **Monitoring**:
   - Enable Vercel deployment notifications
   - Monitor error logs regularly
   - Set up alerts for failed deployments

## Conclusion

Your portfolio is now deployed with:
- ✅ Automatic deployments from GitHub
- ✅ HTTPS/SSL encryption
- ✅ Global CDN distribution
- ✅ Preview deployments for testing
- ✅ Environment variables configured
- ✅ Custom domain (if configured)
- ✅ Analytics and monitoring

For questions or issues, refer to the troubleshooting section or Vercel documentation.
