# Yash Rendalkar — Portfolio

Personal portfolio built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Features live GitHub/LeetCode stats, resume viewer, certificates, achievements, and a contact form (Resend + Cloudflare Turnstile).

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Resend (contact email)
- Cloudflare Turnstile (spam protection)
- Vercel Analytics

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values. **Never commit real secrets.**

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend API key for contact form email |
| `CONTACT_FROM_EMAIL` | Verified sender address in Resend |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (public) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret (server only) |
| `NEXT_PUBLIC_SITE_URL` | Production URL for canonical links, sitemap, OG |

### Contact Form (Resend)

1. Create an API key at [resend.com](https://resend.com).
2. Verify a domain or use Resend sandbox sender for testing.
3. Set `CONTACT_FROM_EMAIL` (e.g. `"Yash Rendalkar <onboarding@resend.dev>"`).
4. Messages are delivered to the email in `src/data/personal.ts`.

**Not production-ready** until Resend sender is verified for your domain.

### Turnstile

1. Create a widget at [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile).
2. Add hostnames: `localhost` (dev) + your Vercel/custom domain (production).
3. Add both keys to `.env.local`.

Production requires valid Turnstile keys. Development shows a friendly notice if keys are missing.

### Site URL

Set `NEXT_PUBLIC_SITE_URL` to your deployed URL before production, e.g.:

```
NEXT_PUBLIC_SITE_URL=https://your-portfolio.vercel.app
```

Used for canonical URLs, `sitemap.xml`, and Open Graph metadata.

## GitHub & LeetCode Integration

- **GitHub**: Public REST API, server-fetched, ~1 hour cache
- **LeetCode**: Public GraphQL (unofficial), server-fetched, ~1 hour cache
- Graceful fallbacks when APIs are unavailable — no fabricated stats

## Resume

Place PDF at `public/resume/Yash_Rendalkar_Resume.pdf`, or update `filePath` in `src/data/resume.ts` only.

## Deploy to Vercel

1. Push repository to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain
5. Deploy

Build command: `npm run build`  
Output: Next.js default

### Vercel Environment Variables

Add the same variables as `.env.local`. Redeploy after changes.

## Rate Limiting Note

Contact form rate limiting is **in-memory** (5 requests / 15 min / IP per server instance). For stronger protection on serverless, use Upstash Redis or Vercel KV.

## Security Headers

Basic security headers are configured in `next.config.ts`. A strict Content-Security-Policy is not enforced globally to avoid breaking Turnstile, fonts, and analytics — configure domain-specific CSP in Vercel if needed.

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
```

## License

Private portfolio — all rights reserved.
