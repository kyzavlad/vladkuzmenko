# Vlad Kuzmenko — personal brand & digital systems

Vlad Kuzmenko builds **AI systems, web platforms and content systems** for
businesses and personal brands — built for **attention, leads, sales and
execution**. Premium black/gold personal brand site built with Next.js (App
Router, static export), Tailwind, EN/UA/RU i18n and a black/gold design system.

## Develop

```bash
npm install
npm run dev     # local dev
npm run build   # production build + static export to /out
npx tsc --noEmit
```

## Product hierarchy

1. **Client work — main offer.** Premium execution of digital systems: AI
   automation, AI chat & voice assistants, websites & web platforms, lead
   capture & CRM/follow-up flows, content systems, and SEO/visibility
   infrastructure. Business infrastructure that turns attention into leads and
   sales — not "just websites".
2. **VisibilityOS** — productized AI-powered website **visibility & conversion
   audit** (SEO visibility, AI-search visibility, trust/design, lead
   conversion → a prioritized action plan). Request flow, reviewed personally.
3. **AI Systems for Business** — digital product / course (early access,
   waitlist). Turn manual business work into simple AI-assisted systems: lead
   capture, follow-up, CRM, Telegram/Sheets/n8n automation, AI assistants,
   content workflows and execution checklists. Broad audience: founders, small
   business owners, freelancers, agency owners, operators and creators.
4. **Warriors Team** — a real, selective private circle (business, training,
   discipline, cars, content, standards). By application → call → fit. **No
   public price, no fake numbers, no scarcity.**
5. **Shop — Vlad Kuzmenko Drop** — a premium limited drop (hoodie, oversized
   tee, training shorts, cap, execution planner). Reserve / pre-order flow.

## Routes & i18n

- `/` (EN), `/ua` (UA), `/ru` (RU) — one shared `HomeContent`, language via
  `components/i18n-provider.tsx`, dictionary in `lib/i18n.ts` (typed; all three
  locales share the same shape). hreflang + localized SEO per route.
- **Dedicated product pages**, each localized (EN / `/ua/...` / `/ru/...`):
  `/visibilityos`, `/ai-systems`, `/warriors-team`. The homepage previews them
  via the Products overview cards and links out. Page metadata uses
  `lib/page-meta.ts` (canonical + hreflang + OG locale).

## Conversions

Every **website form** posts a clean JSON payload to the n8n website-lead webhook
via `submitLead()` in `lib/site.ts`. Each submission carries:

```
intent, language, buttonLabel, name, email, phone, company, website, buildType,
message, sourcePage, referrer, submittedAt, source,
utm_source/medium/campaign/term/content  (+ any context, e.g. product or project)
```

**Active intents:** `general_request`, `system_audit_request`,
`visibilityos_audit_request`, `ai_systems_product_waitlist`,
`warriors_team_application`, `shop_preorder`, `case_study_request`,
`newsletter_signup` (`cart_request` is a legacy fallback on the unused cart).

**Cal.com** (`SITE.calcom`) is used only for "Book a call" buttons — never for
website forms. The **Voiceflow** assistant is loaded in
`components/voiceflow-script.tsx` (do not modify — it's configured externally).
The n8n → Telegram / Google Sheets workflow is unchanged.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_LEAD_WEBHOOK_URL` | n8n website-lead webhook URL. Must be `NEXT_PUBLIC_` (used client-side). Has a safe fallback. |

Set it in the host (Vercel: **Project → Settings → Environment Variables**;
Netlify: **Site settings → Environment variables**), then redeploy. No secrets
are stored in the frontend.

## Real media assets still needed

These would replace tasteful placeholders (no fake/stock media is used meanwhile):

- **Hero photo** of Vlad (optional — the gold wordmark leads today).
- **About photo** of Vlad.
- **Warriors Team photos** (real lifestyle/training/cars — not stock).
- **Product visuals** for AI Systems for Business (course/product mockups).
- **Shop photos** for the drop items (currently premium icon tiles).
- Case-study screenshots already in repo (`/public/case-studies/*`) — add more
  as projects are documented.

## Note on research materials

Campus materials / notes shared for research were used **only** for strategic
inspiration (product logic and structure). No lesson content is copied,
reproduced or exposed — all positioning, product structure and copy here is
original to the Vlad Kuzmenko brand.
