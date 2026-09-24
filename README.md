# BlueDot website

Marketing site for BlueDot: Consulting (Think), Agency (Create) and Media (Amplify), under one roof.

The site is bilingual: French at the root (`bluedot-mktg.com/`), English under `/en/`. A FR | EN switch in the header (and in the mobile menu) opens the same page in the other language.

Built with [Astro](https://astro.build) for Vercel. Every page is static; the only server code is the contact form relay (`src/pages/api/contact.ts`), which runs as a Vercel function. No UI framework and no CSS framework. About 10 KB of JavaScript in total, with self-hosted fonts.

## Getting started

```bash
npm install
npm run dev       # http://localhost:4321 (pages and the contact form relay)
npm run build     # outputs the Vercel build to .vercel/output/
```

Deploy by importing the GitHub repository into Vercel. It detects Astro; no build settings need changing. `astro preview` isn't supported with the Vercel adapter, so test locally with `npm run dev`.

## Configuration

Copy `.env.example` to `.env`, or set these variables in your hosting dashboard:

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Optional. Production domain, `https://bluedot-mktg.com` by default. Used for canonical URLs, hreflang, Open Graph tags, `robots.txt` and the sitemap. |
| `FORM_WEBHOOK_URL` | The Make webhook that receives contact enquiries. Server-only: see below. |
| `PUBLIC_CONTACT_EMAIL` | Optional. Replaces the default public email, `info@bluedot-mktg.com` (set in `src/config/site.ts`). Shown next to the form, in the footer, in the form's error message and in structured data. |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional. Only needed if Search Console is verified with the "HTML tag" method instead of Google Tag Manager. Paste only the `content` value of the tag. |

`PUBLIC_` variables are baked into the JavaScript at build time and are visible to anyone. Never put an API key or webhook URL in one. After changing a variable in Vercel, redeploy.

### How the contact form is delivered

The form posts to the site's own `/api/contact/` route, never to Make directly. That route:

- checks the fields with the same rules as the form (`src/lib/contact.ts`) and caps their length;
- silently drops submissions that fill the hidden honeypot field;
- allows 5 enquiries per visitor every 15 minutes (best effort, counted per server instance);
- forwards the enquiry to `FORM_WEBHOOK_URL`, which is read on the server at request time and never appears in the site's HTML or JavaScript.

Make receives:

```json
{ "name": "", "company": "", "city": "", "email": "", "phone": "", "interest": ["media"], "message": "", "page": "/contact/", "lang": "fr", "submittedAt": "2026-09-24T13:00:00.000Z" }
```

Without `FORM_WEBHOOK_URL`, `npm run dev` logs enquiries in the terminal instead of sending them. In production, the form shows an error with the contact email instead, so no lead is ever silently lost.

### Contact form → email with Make

1. In Make, create a scenario that starts with **Webhooks → Custom webhook**, then copy its URL (`https://hook.<region>.make.com/…`) into `FORM_WEBHOOK_URL`: in `.env` locally, and in Vercel under **Settings → Environment Variables** (mark it **Sensitive**, for Production and Preview).
2. Click **Redetermine data structure** on the webhook, then send one test enquiry from the site so Make learns the fields.
3. Add **Resend → Send an email**. Its API key is stored in Make, never in the site, and it doesn't expire. A Gmail connection, by contrast, has to be re-authorized with Google from time to time. Set **Reply-To** to the webhook's `email` field so replying in your inbox reaches the lead. `interest` is a list, so use `join(interest; ", ")` in the email body. Until a BlueDot domain is verified in Resend, send from `onboarding@resend.dev`. Resend then only delivers to the address the Resend account was created with.
4. Turn the scenario **on**. While it's off, Make holds incoming enquiries in a queue and sends no email.

If you add a **Webhook response** module in Make, keep a 2xx status. Anything else makes the site report the send as failed.

## Where things live

```
src/
  config/site.ts           name, tagline, email, address, social links
  i18n/index.ts            languages and the French/English URL of every page
  i18n/ui.ts               shared interface text (menu, footer, labels, form) in both languages
  data/divisions.ts        division copy in FR and EN: summaries, services, keyword headings, SEO
  data/home.ts             home page situations, process steps, principles, FAQ (FR and EN)
  data/extra-services.ts   website design and events pages (FR and EN)
  views/                   one template per page, shared by the French and English URLs
  pages/                   French URLs; pages/en/ holds the English ones
  pages/api/contact.ts     contact form relay to the Make webhook (the only server code)
  lib/contact.ts           email and phone checks shared by the form and the relay
  styles/global.css        design tokens (colour, type scale, spacing, motion) and shared components
  components/              sections and UI; visuals/ holds the explanatory graphics
  scripts/                 canvas scenes, scroll reveals, header/menu, contact form
public/og/                 social share images (1200×630), one per division
```

Most copy changes only need `src/data/*.ts`. Page-specific lines (positioning, points of view, closing calls to action) sit at the top of each file in `src/views/`, with French and English side by side. When you edit one language, edit the other.

| Page | French | English |
| --- | --- | --- |
| Home | `/` | `/en/` |
| Consulting | `/consulting/` | `/en/consulting/` |
| Agency | `/agency/` | `/en/agency/` |
| Media | `/media/` | `/en/media/` |
| Website design | `/creation-site-web/` | `/en/website-design/` |
| Events | `/evenementiel/` | `/en/events/` |
| Contact | `/contact/` | `/en/contact/` |

To add a page, add its pair of URLs to `routes` in `src/i18n/index.ts`. The language switch, hreflang tags and sitemap read from there.

## SEO

Keyword choices come from Google Keyword Planner data for Morocco (Sep 2025 – Aug 2026). People in Morocco search for these services mostly in French, which is why French is the default language.

| Page | Main search target | Monthly searches (Morocco) |
| --- | --- | --- |
| Home | agence de communication Casablanca · agence marketing digital Casablanca | 720 · 390 |
| Consulting | stratégie marketing · stratégie marketing digital | 880 · 210 |
| Agency | identité visuelle | 140 |
| Media | agence de publicité · TikTok Ads Maroc · agence Google Ads Maroc | 260 · 170 · 110 |
| Website design | création site web Maroc · agence web Casablanca | 1,000 · 880 |
| Events | agence événementielle Casablanca | 110 |

What's in place:

- Each page's `<h1>` names the service and the city, in the small line above the headline. The large brand lines ("Think. Create. Amplify.", "Ici, on réfléchit.") look exactly as before.
- A title and meta description per page and language.
- `hreflang` links (`fr-MA`, `en`, and `x-default` pointing to French) in every page head and in the sitemap. `<html lang>` and `og:locale` are set per language.
- Structured data: BlueDot as a `ProfessionalService` with its Casablanca address, Morocco as the area served, and the LinkedIn page; a `Service` and breadcrumb for each service page; `FAQPage` on pages with questions.

After launch:

1. **Google Search Console:** the Google Tag Manager container (`GTM-PP47N3SF`, set as `gtmId` in `src/config/site.ts`) is on every page of production builds. Local development doesn't load it. In Search Console, add a **URL prefix** property for `https://bluedot-mktg.com/` (a "Domain" property can only be verified through DNS), choose **Google Tag Manager** as the verification method, then submit `https://bluedot-mktg.com/sitemap-index.xml`. The Google account you use must have **Publish** permission on the Tag Manager container, and the site must already be live on the domain.
2. **One address:** in the hosting settings, permanently redirect (301) `www.bluedot-mktg.com` and `http://` to `https://bluedot-mktg.com`.
3. **Google Business Profile:** create one for the Casablanca office, using the same name and address as the site, and link it to the site. Searches like "agence de communication Casablanca" show map listings above the regular results, so this matters as much as the site itself.
4. **Phone number:** none is published yet. Adding one to the site and to the Business Profile helps local ranking and lets people call directly.

## Design system in brief

- **The dot is the brand device.** It's the logo, the punctuation in headlines, and the centre of every visual.
- **Colours:** the brand kit's orange (Think, Amplify) and blue (Create) on near-black. Each page sets `--accent` to its division's colour. Primary buttons use `#0670d8`, one step deeper than the brand blue, so white button text meets contrast requirements.
- **Type:** Space Grotesk only, self-hosted (no Google Fonts request). Labels and numbers use the same face in sentence case.
- **Restraint:** flat surfaces, hairline dividers, small corner radii. No glows, blurred glass, gradient cards or decorative background blobs. Keep it that way when adding sections.
- **Images:** the planet hero photos live in `src/assets/brand/` and are served through `astro:assets` as resized WebP (640/960/1376px) with high fetch priority. The logo is resized WebP at 1x/2x/3x. Add new photos to `src/assets/`, not `public/`, so they get optimised.
- **Motion** respects `prefers-reduced-motion`, and all content stays visible without JavaScript.

## Before launch: content gaps

These couldn't be completed from the material provided and need BlueDot's input:

1. **Form webhook:** set `FORM_WEBHOOK_URL` in Vercel, redeploy, and send a test enquiry from the live site.
2. **Instagram:** add an Instagram URL to `social` in `src/config/site.ts` if BlueDot has one. The office address, `info@bluedot-mktg.com` and the LinkedIn page are already set there.
3. **Consulting page copy:** no Consulting page was supplied. Its copy is based on the home page (Consulting summary, expertise list, "your marketing problem might not be a marketing problem"). Please review.
4. **Partly hidden source lines**, reconstructed and marked `[reconstructed]` in `src/data/divisions.ts`:
   - Consulting summary: "…from *marketing strategy* to fractional CMO leadership"
   - Agency, Experiences: "Virtual and physical brand touchpoints"
   - Media, Strategy & planning: "Where, when and how much to invest"
   - Media, Measurement: "Connecting metrics to real business outcomes"
5. **Privacy policy:** the form collects personal data. Add a policy page and link it from the form's privacy line, and confirm that line's wording.
6. **Proof:** no case studies, client names, testimonials or team information were provided, so the site doesn't invent any. When real material exists, the strongest place for it is a "Selected work" section after "How we work" on the home page.
7. **Response time:** the form promises a reply but no timeframe. Add one (e.g. "within one business day") only if BlueDot can keep it.
8. **Analytics and cookie consent:** Google Tag Manager is installed, but it only loads the tags published in the container. If analytics or ad tags are added there, check whether visitors must consent first (Moroccan law 09-08, and GDPR for visitors from the EU). If so, add a consent banner and set up Consent Mode in Tag Manager.
9. **French copy:** the French text is a translation of the English site. Have a native speaker at BlueDot read it through, especially the service descriptions.
10. **New pages:** the website design and events pages expand the Agency's "Digital" and "Experiences" services. Confirm that the formats they list (for example "conventions, seminars and client events" or "campaign microsites") match what BlueDot actually offers.
11. **Media channels:** the Media page and FAQ now name Meta, TikTok, LinkedIn and Google Ads. Confirm these are the platforms BlueDot buys on.
12. **Service area:** the location FAQs say BlueDot works with businesses "in Casablanca and across Morocco". Confirm this, or narrow it.
13. **Share images:** the images in `public/og/` carry English text, and the French pages and the two new pages reuse them. French versions would look better when links are shared in French.

## Optional imagery later

If BlueDot adds photography, use it where it builds trust rather than as decoration:

- team portraits
- real project work
- workshops

Use dark, cool colour grading to match the palette, 3:2 or 16:10 crops, and load through `astro:assets` for AVIF/WebP.

If copy changes, regenerate the share images in `public/og/` to match.
