# BlueDot website

Marketing site for BlueDot: Consulting (Think), Agency (Create) and Media (Amplify), under one roof.

Static site built with [Astro](https://astro.build). No UI framework and no CSS framework. About 10 KB of JavaScript in total, with self-hosted fonts.

## Getting started

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs static files to dist/
npm run preview   # serves dist/ locally
```

Deploy `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, S3…).

## Configuration

Copy `.env.example` to `.env`, or set these variables in your hosting dashboard:

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Production domain. Used for canonical URLs, Open Graph tags, `robots.txt` and the sitemap. |
| `PUBLIC_FORM_ENDPOINT` | URL that accepts the contact form as a JSON `POST` (Formspree, Basin, a serverless function…). |
| `PUBLIC_CONTACT_EMAIL` | Optional. Shown next to the form, in the footer, and in the form's error message. |

The form sends:

```json
{ "name": "", "company": "", "email": "", "phone": "", "interest": ["media"], "message": "", "page": "/contact/" }
```

Without an endpoint, submissions are simulated in `npm run dev`. In a production build they fail with a visible message instead, so no lead is ever silently lost.

## Where things live

```
src/
  config/site.ts        name, tagline, email, social links, nav
  data/divisions.ts     all division copy: summaries, services (problem / what we do / what you get), SEO
  data/home.ts          home page situations, process steps, principles, FAQ
  styles/global.css     design tokens (colour, type scale, spacing, motion) and shared components
  components/           sections and UI; visuals/ holds the explanatory graphics
  scripts/              canvas scenes, scroll reveals, header/menu, contact form
  pages/                /, /consulting/, /agency/, /media/, /contact/, 404, robots.txt
public/og/              social share images (1200×630), one per page
```

Most copy changes only need `src/data/*.ts`.

## Design system in brief

- **The dot is the brand device.** It's the logo, the punctuation in headlines, and the centre of every visual.
- **Division colours:** Think `#ff7a59`, Create `#3fd6e6`, Amplify `#ffc247`, on a deep-space background `#05070d` with the BlueDot blue `#3b7bff`. Each page sets `--accent` to its division's colour.
- **Type:** Host Grotesk for headlines and text, Geist Mono for labels and figures.
- **Imagery is drawn in code:** canvas scenes in the heroes, SVG/HTML diagrams in the sections. There are no stock photos, so nothing misrepresents the business.
- **Motion** respects `prefers-reduced-motion`, and all content stays visible without JavaScript.

## Before launch: content gaps

These couldn't be completed from the material provided and need BlueDot's input:

1. **Domain:** set `SITE_URL`.
2. **Form endpoint:** set `PUBLIC_FORM_ENDPOINT` and send a test enquiry.
3. **Contact email and social profiles:** `PUBLIC_CONTACT_EMAIL`, and `social` in `src/config/site.ts`.
4. **Consulting page copy:** no Consulting page was supplied. Its copy is based on the home page (Consulting summary, expertise list, "your marketing problem might not be a marketing problem"). Please review.
5. **Partly hidden source lines**, reconstructed and marked `[reconstructed]` in `src/data/divisions.ts`:
   - Consulting summary: "…from *marketing strategy* to fractional CMO leadership"
   - Agency, Experiences: "Virtual and physical brand touchpoints"
   - Media, Strategy & planning: "Where, when and how much to invest"
   - Media, Measurement: "Connecting metrics to real business outcomes"
6. **Privacy policy:** the form collects personal data. Add a policy page and link it from the form's privacy line, and confirm that line's wording.
7. **Proof:** no case studies, client names, testimonials or team information were provided, so the site doesn't invent any. When real material exists, the strongest place for it is a "Selected work" section after "How we work" on the home page.
8. **Response time:** the form promises a reply but no timeframe. Add one (e.g. "within one business day") only if BlueDot can keep it.
9. **Analytics and cookie consent**, if required in your markets.
10. **Currency:** the illustrative Media dashboard uses `$1.20`, as the existing site did. Change it if BlueDot works in another currency.

## Optional imagery later

If BlueDot adds photography, use it where it builds trust rather than as decoration:

- team portraits
- real project work
- workshops

Use dark, cool colour grading to match the palette, 3:2 or 16:10 crops, and load through `astro:assets` for AVIF/WebP.

If copy changes, regenerate the share images in `public/og/` to match.
