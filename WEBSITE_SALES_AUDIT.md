# VladKuzmenko.com — Website Sales & Conversion Audit

**Status:** Audit only. No production code was changed, and nothing was committed or pushed.
**Audit basis (important):** This audit was performed against the **live production source** — repository `github.com/kyzavlad/vladkuzmenko`, branch `main`, commit **`51ce0cc`** ("Strengthen auto dealer pilot and objection handling"), obtained via a fresh read-only clone. That commit is what currently serves `https://vladkuzmenko.com`.
**Audit date:** 2026-07-21.

> **Scope note / assumption to confirm.** The working checkout you may open this file in (`/home/user/vladkuzmenko`, remote `kuzmenkovlad7-del/vladkuzmenko`, at older commit `e816da3`) is a **divergent fork** and does **not** match the live site — e.g. it lacks `app/ua/automation` and the current interactive `AutoDealersPage`. All file paths, line numbers, and findings below reference **production `main` @ `51ce0cc`**. Before implementing, confirm which repository is the source of truth for deploys (see Open Questions §16). Line numbers are accurate as of `51ce0cc` and may drift as the file changes.

---

## 1. Executive Summary

The site is a well-built, premium black-and-gold Next.js 14 App Router personal-business hub with full EN / UA / RU localization and static export. Technically it is in good shape: clean URLs, per-page canonical + hreflang on most routes, site-wide JSON-LD, SSG pre-rendering (so crawlers see the content), a single H1 per page, and alt text on all *rendered* images. Commercially, the copy is unusually **honest** — no invented metrics on any rendered page, and the `/auto-dealers` page in particular is a model of careful prototype-vs-pilot framing.

The problems are about **sales conversion, proof, and consistency**, not aesthetics:

- **The best sales asset is unreachable.** `/auto-dealers` (highest sitemap priority, 0.9) has **no internal inbound link** from any nav, footer, product grid, or even the homepage's own "auto-dealer focus" block. It's only findable via the sitemap or the language switcher.
- **`/automation` is inconsistent across languages and invisible to search.** EN renders a *legacy* page (USD pricing table + Spline robot) while UA/RU render the newer honest portfolio page. And **`/automation` is missing from `sitemap.ts` entirely** (all three locales).
- **Analytics is effectively off.** `track()` events exist but **no GA/GTM is installed**, so nothing is measurable in a dashboard today. Coverage is also auto-dealer-only.
- **Proof is thin and partly contradictory.** Only 3 projects have visual proof (screenshots only), all self-labelled *in development / prototype*. The homepage heading says "Real builds, real **clients**" while every badged item reads *Prototype / In development*. The `/automation` UA/RU page claims Hotel Natsionalny, Dacha TV and TurbotaAI are "real projects" with **no supporting links or screenshots**.
- **A reputational landmine sits in dead code.** `components/TestimonialsSection.tsx` (not rendered, but shipped in the repo) contains **fabricated testimonials with fake headshots** ("$50,000/mo", stock "warriors/team" photos). It should be deleted from the codebase.
- **The flagship capability isn't sold.** The real cold-outreach + Telegram Sales Copilot system is **not represented anywhere** on the site.

**Three highest-priority changes:** (1) delete the fabricated-testimonials dead code and make `/auto-dealers` reachable from the homepage/nav; (2) unify EN `/automation` with the honest UA/RU portfolio page and add `/automation` to the sitemap; (3) install a tag manager and wire the minimal event map so the funnel becomes measurable.

---

## 2. Route & File Map

### 2.1 Routes (production `main` @ `51ce0cc`)

Locale model: **EN = no prefix**, **UA = `/ua`**, **RU = `/ru`**. Locale is chosen by route; first-visit auto-redirect via `components/LangAutoRedirect.tsx` (localStorage `vk_lang` → browser language).

| Route (EN) | UA | RU | Source page file | Renders | Notes |
|---|---|---|---|---|---|
| `/` | `/ua` | `/ru` | `app/page.tsx`, `app/ua/page.tsx`, `app/ru/page.tsx` | `components/home/HomeContent.tsx` | EN also mounts `LangAutoRedirect` |
| `/ai-systems` | `/ua/ai-systems` | `/ru/ai-systems` | `app/ai-systems/page.tsx` (+ua/ru) | `components/pages/AiSystemsPage.tsx` | Product waitlist page |
| `/automation` | `/ua/automation` | `/ru/automation` | `app/automation/page.tsx` (+ua/ru) | **EN:** `HeroSection`+`PricingSection`; **UA/RU:** `components/pages/AutomationPortfolioPage.tsx` | **Locale divergence** |
| `/auto-dealers` | `/ua/auto-dealers` | `/ru/auto-dealers` | `app/auto-dealers/page.tsx` (+ua/ru) | `components/pages/AutoDealersPage.tsx` | **Orphan route (no inbound link)** |
| `/visibilityos` | `/ua/visibilityos` | `/ru/visibilityos` | `app/visibilityos/page.tsx` (+ua/ru) | `components/pages/VisibilityOsPage.tsx` | Product page |
| `/warriors-team` | `/ua/warriors-team` | `/ru/warriors-team` | `app/warriors-team/page.tsx` (+ua/ru) | `components/pages/WarriorsTeamPage.tsx` | Community page |
| `/ai-platform` | — | — | `app/ai-platform/page.tsx` | Client redirect → `/#visibilityos` | Stub; EN-only; `index,follow` |
| `/university` | — | — | `app/university/page.tsx` | Client redirect → `/#products` | Stub; EN-only; `index,follow` |
| `/blog` | — | — | `app/blog/*` (`data.tsx`) | Blog (Unsplash images) | EN-only |

Total routes inspected: **21** (18 localized product/home pages + 2 redirect stubs + blog).

### 2.2 Key shared files

- **i18n dictionary:** `lib/i18n.ts` (1007 lines; `en` L14, `ua: Dict` L346, `ru: Dict` L676; `getDict()` L1007; `Lang`/`langHref`/hreflang map L6–12). Type-enforced parity via `Dict = typeof en` (L344).
- **i18n provider:** `components/i18n-provider.tsx` (sets `<html lang>`, exposes `useI18n()`); `components/LangAutoRedirect.tsx`.
- **Site constants:** `lib/site.ts` — `SITE.calcom`, `SITE.socials`, `SITE.email`, `SITE.webhook`, `submitLead()` (L55–81), `openAssistant()` (L84–93).
- **Metadata helper:** `lib/page-meta.ts` `pageMeta(lang, slug, title, desc)` (canonical + hreflang alternates).
- **Root layout / global head:** `app/layout.tsx` (metadataBase, OG/Twitter defaults, JSON-LD @graph L77–125, favicon/manifest).
- **Navigation:** `components/ui/header.tsx` (locale-aware nav + language switcher + Ask AI + Book a call); `components/FooterSection.tsx`.
- **Lead form:** `components/ui/request-dialog.tsx` (universal dialog → `submitLead`); `components/ui/automation-form-dialog.tsx` (legacy multi-step, EN automation only).
- **Analytics:** `lib/analytics.ts` (`track()` — dataLayer + gtag-if-present + `vk:track` CustomEvent).
- **Integrations:** `components/voiceflow-script.tsx` (loaded via `components/app-shell.tsx`), Cal.com (outbound links), n8n webhook.
- **SEO infra:** `app/sitemap.ts`, `app/robots.txt`, `next.config.js` (`output:'export'`), `image-loader.js`, `netlify.toml`.
- **Homepage sections:** `components/home/{HomeContent,Hero,StudioSection,SelectedWork,AutoDealerFocus,ProductsOverview,ShopDrop,BuildInPublic,AboutSection,ContactSection}.tsx`.

### 2.3 Dead / orphaned code (present in repo, **not rendered on the live site**)

Confirmed zero importers: `AboutMeSection`, `AppsSection`, `AudioSection`, `AutomationTeaserSection`, `BoardSection`, `CampusDashboard`, `EducationPlatformSection`, `EnterpriseAISection`, `GallerySection`, `InstagramSection`, `LiveRevenueCounter`, `MapSection`, `MensCommunitySection`, `MerchPreviewSection`, `PersonalBrandHero`, **`ProjectsSection`** (contains the only Behance link), `SaasLaunchSection`, `SuccessPathVisualizer`, `TechnologySection`, **`TestimonialsSection`** (fabricated testimonials). Also legacy `HeroSection`/`PricingSection` are rendered *only* on EN `/automation`.

---

## 3. Current Page Analysis

### 3.1 Homepage (`/`, `/ua`, `/ru` → `components/home/HomeContent.tsx`)
- **Purpose / visitor:** Broad personal-brand hub positioning Vlad as a builder of "AI Systems · Web Platforms · Content Systems" for businesses and personal brands. Mixed audience (client, product buyer, community applicant, merch buyer).
- **Hero** (`components/home/Hero.tsx`; copy `lib/i18n.ts:46–52`): visible brand is the logo image; real `<h1>` is `sr-only`. Tagline/promise: *"Built for attention, leads, sales and execution."* Pillars: *"AI Systems · Web Platforms · Content Systems."*
- **Primary CTA:** "Book a Call" → `SITE.calcom` (`https://cal.com/vladkuzmenko.com/call`, new tab). **Secondary:** "View Work" → `#selected-work`. **Tertiary:** "Ask AI" → `openAssistant()` (Voiceflow).
- **Sections in order:** Header → Hero (`#top`) → StudioSection "What I build" (`#work`, 6 service cards + free System-audit dialog) → SelectedWork "Real builds, real clients" (`#selected-work`) → AutoDealerFocus "The auto-dealer lead system" (`#focus`) → ProductsOverview "Ways to work together" (`#products`) → ShopDrop merch (`#shop`) → BuildInPublic social (`#content`) → AboutSection (`#about`) → ContactSection (`#contact`) → Footer.
- **Proof shown** (`components/home/SelectedWork.tsx`): Featured w/ status badge — **Tutorivo** ("In development"), **Status Auto** ("Prototype"), **TurbotaAI** ("In active development"); compact (no badge) — **Ikorka AI Voice Assistant** (plays `/voice_assistant.MP3`), **Dating CRM**, **Leather Clinic**. Section desc: *"Honest summaries, no invented numbers."*
- **Links:** Cal.com + socials only. No Behance/demo/portfolio links render.
- **Issues:** (a) Heading "Real builds, real **clients**" contradicts the Prototype/In-development badges — none is a delivered live client. (b) **CTA overload** — 7+ competing actions (Book a Call ×7 sites, System audit, per-case "Request similar", 4 product cards, merch pre-order/drop, 4 social follows, newsletter, contact form) all at similar visual weight; no single dominant next step. (c) AutoDealerFocus block does **not** link to `/auto-dealers`. Positive: auto-dealer focus is correctly framed as "a current focus, not the whole picture" (`lib/i18n.ts:113–116`), so it doesn't narrow the brand.

### 3.2 `/ai-systems` (→ `components/pages/AiSystemsPage.tsx`)
Digital-product **waitlist** page ("AI Systems for Business", badge "Digital product · Early access"). H1 `AiSystemsPage.tsx:88`. Single repeated CTA "Join the waitlist" → `RequestDialog` (intent `ai_systems_product_waitlist`). Sections: Hero → Problem/Outcome + "Who it's for" → 6-module curriculum → "What's inside" → example systems → 3 access tiers (no prices; "no payment is taken now") → 6-item FAQ → Final CTA. **Honest**, single-goal, no metrics. Clean.

### 3.3 `/automation` (EN vs UA/RU — **divergent**)
- **EN** (`app/automation/page.tsx:21–22`): legacy `HeroSection` (Spline robot, H1 "AI automation" + rotating word, "Schedule a free consultation" → hardcoded Cal.com) + `PricingSection` (4 USD tiers $899–$14,599, annual toggle "Save 20%"). Lead path: `AutomationFormDialog` (EN-only, 3-step, asks monthly revenue/spend, intent `system_audit_request`; **does not** call `track()`). No demo, cases, or honesty disclaimers.
- **UA/RU** (`components/pages/AutomationPortfolioPage.tsx`): newer, honest "guided-process" portfolio. Hero *"Не просто чат-бот. Керований процес від звернення до наступної дії"* → `#live-demo` + "Розібрати мій процес" (`RequestDialog`, intents `automation_portfolio_process_request` / `_final_request`). Sections: Hero → interactive demo (4 scenarios) → 6 capability cards → 4 case cards (status `"real"|"prototype"`: **Hotel Natsionalny=real, Dacha TV=real, TurbotaAI=real, auto-dealer=prototype**) → 4-step process + "what this page proves / doesn't prove" callout → final CTA. Demo disclaimer present. **No fabricated metrics.**
- **Issues:** (a) EN users get a stale, mismatched, English-hardcoded pricing page instead of the credible portfolio. (b) The three "real" case claims have **no links/screenshots** anywhere (unproven). (c) Latent bug `AutomationPortfolioPage.tsx:539` `copy.en = copy.ua` — if EN is ever pointed here it will render **Ukrainian**. (d) Outreach/Sales-Copilot capabilities are **not** represented here.

### 3.4 `/auto-dealers` (→ `components/pages/AutoDealersPage.tsx`) — the strongest sales asset
- Clearly explains audience, enquiry types (7 scenario tabs: sales, service, trade-in, sourcing, order/import, delivery, financing), sources, what AI collects, what the manager receives, delivery destination, human handoff, configurability, pilot scope, and the next step. Rigorous honesty: demo labelled "Interactive demonstration" with fictional-data disclaimer (`disclaimer`, rendered ~L1337); "prototype" used explicitly in the "Prototype vs Pilot" section; **Layer 2 integrations explicitly labelled "a possible Pilot integration… not shown in this prototype… connected only after technical approval during a Pilot."** No invented metrics; no fixed price/timeline.
- Analytics: `demo_click`, `scenario_select`, `pilot_cta_click`, `portfolio_click`, plus `form_open`/`form_submit`.
- **Gaps:** (a) **Orphan route** — no inbound internal link (see §4). (b) **Follow-up** is only one line (`layer1Points`), no channel/timing detail — PARTIAL. (c) The portfolio link uses an **`ExternalLink` icon on an internal route** (`/automation`), and for EN it lands on the legacy page. (d) On a genuine network/webhook failure the form shows the generic "fill in required fields" error (misleading) — the only failure path (`request-dialog.tsx`).

### 3.5 `/visibilityos`, `/warriors-team`
Rendered product/community pages with a single H1 each, full EN/UA/RU, Header/Footer, Cal.com CTAs. (Not deep-audited for sales copy in this pass — flagged for a follow-up content review.)

### 3.6 `/ai-platform`, `/university`
Client-side **redirect stubs** (`window.location.replace` → `/#visibilityos` and `/#products`). Code comments state the old "AI Editing Platform" and "University" were "non-functional placeholder[s]." EN-only; still `index,follow` and canonicalized to `/`.

---

## 4. Broken-Link & CTA Audit

No hard 404 / broken internal hrefs were found in rendered components — header/footer anchors all resolve to real section IDs, and all product routes exist. The issues are **routing/consistency/conversion** problems:

| Page | CTA / link | Current destination | Problem | Recommended destination |
|---|---|---|---|---|
| Homepage `#focus` (`home/AutoDealerFocus.tsx`) | "Book a call" + "Request audit" | Cal.com + n8n form | The auto-dealer block never links to `/auto-dealers` — the dedicated sales page | Add primary "See the auto-dealer system" → `{base}/auto-dealers` |
| Site-wide nav/footer | (none) | — | `/auto-dealers` is an **orphan**: not in header, footer, `ProductsOverview`, or homepage; only in sitemap/lang-switcher. Highest sitemap priority yet zero inbound links | Add to header and/or `ProductsOverview`; link from `#focus` |
| EN `/automation` | whole page | `HeroSection`+`PricingSection` | Different, older, English-hardcoded page vs UA/RU `AutomationPortfolioPage` | Point EN at `AutomationPortfolioPage` (after adding real EN copy) |
| `/auto-dealers` pilot section (`AutoDealersPage.tsx:~1573`) | "AI automation portfolio" | internal `/automation` (locale-aware) | Uses an **external-link icon on an internal link**; EN target is the legacy page | Internal-style affordance; ensure EN target is the unified portfolio |
| EN `/automation` (`HeroSection.tsx:56`) | "Schedule a free consultation" | hardcoded `cal.com/...` | Bypasses `SITE.calcom` (config drift risk) | Use `SITE.calcom` |
| Dead code (`components/ProjectsSection.tsx:22`) | "View Full Portfolio on Behance" | Behance gallery `219043635` | Obsolete Behance link; component is orphaned but still shippable | **Delete component** (Behance is supplemental only, must not be a sales destination) |
| Auto-dealer sales flow | (n/a) | — | Requirement check: outreach must land on `/auto-dealers`, not Behance/generic portfolio, and not send multiple portfolio links. **Currently OK** (no Behance in the live flow) — keep it that way | Keep single-destination |

**Language switcher caveat** (`header.tsx`): only slugs in `LOCALIZED_SLUGS` (`""`, `visibilityos`, `ai-systems`, `auto-dealers`, `warriors-team`) are preserved on switch; `automation`, `ai-platform`, `university` **reset to the language root** — switching language on `/ua/automation` drops you to `/` instead of `/automation`. Add `automation` to `LOCALIZED_SLUGS` once EN is unified.

**Handle inconsistency:** Instagram/X = `@vladkuzmenkosxy`, YouTube/Telegram = `@vladkuzmenkoai` (`lib/site.ts`). Verify both handles are current/intended.

---

## 5. Proof & Asset Inventory

**Asset totals (source tree, excluding build output):** 37 `.webp`, 14 `.jpg`, 8 `.png`, 8 `.MP3`, **0 video**, **0 PDF**. Only **1** audio file is used live (`public/voice_assistant.MP3`). No GitHub links, no live demo URLs, no proposals/case-study docs exist in the live code.

| Project | Type | Classification (literal code) | Where | Assets in repo | Result stated | Missing proof |
|---|---|---|---|---|---|---|
| **Tutorivo** | Tutor marketplace (education) | "In development" (`i18n.ts:87`) | `home/SelectedWork.tsx:16–25` (rendered) | 4 screenshots `public/case-studies/tutorivo/{home,catalog,become-tutor,admin}.webp` | none | live URL, client name, result, video |
| **Status Auto** | Auto-dealer lead platform | "Prototype" (`i18n.ts:93`); "interactive prototype… not a claimed completed dealership deployment" | `home/SelectedWork.tsx:27–35` (rendered); conceptually the `/auto-dealers` demo | 3 screenshots `public/case-studies/status-auto/{home,catalog,form}.webp` | none | **Live vercel demo & "View prototype" button exist only in an untracked `.patch`, NOT deployed** |
| **TurbotaAI** | AI assistant product (chat/voice/video) | "In active development" (homepage, `i18n.ts:99`) **but "real" on `/automation` UA/RU** | `home/SelectedWork.tsx:37–45`; `AutomationPortfolioPage` case | 3 screenshots `public/case-studies/turbotaai/{home,video,pricing}.webp` (`video.webp` is a still, not video) | none | live URL, real video/audio, billing proof; **status label inconsistent between pages** |
| **Ikorka AI Voice Assistant** | Voice AI (call answering) | unlabelled; "Listen to a real demo" (`i18n.ts:107`) | `home/SelectedWork.tsx:49` (rendered, compact) | audio `public/voice_assistant.MP3` (live) | none | screenshots, client, transcript, metrics |
| **Dating CRM** | CRM + automation | unlabelled | `home/SelectedWork.tsx:50` (compact) | **none** | none | everything (text blurb only) |
| **Leather Clinic** | Local-business website | unlabelled | `home/SelectedWork.tsx:51` (compact) | **none** | none | everything (text blurb only) |
| **Hotel Natsionalny** | (automation case) | "real" (`AutomationPortfolioPage`, UA/RU only) | `AutomationPortfolioPage.tsx` cases | **none** | qualitative only | screenshots, link, client context |
| **Dacha TV** | (automation case) | "real" (UA/RU only) | `AutomationPortfolioPage.tsx` cases | **none** | qualitative only | screenshots, link, client context |
| **Auto-dealer system** | AI lead-qualification system | "prototype" (honest) | `/auto-dealers` (all locales), `AutomationPortfolioPage` | interactive scripted demo (client-side) | none (deliberately) | a real, connected pilot reference |
| **Outreach + Telegram Sales Copilot** | Outbound lead engine | **not represented at all** | — | none | — | everything — no case, screenshot, transcript, or link anywhere |

**Risk flags:**
- **Fabricated testimonials in dead code:** `components/TestimonialsSection.tsx` — fake names + quantified claims ("$50,000/mo", "$200,000/mo") paired with stock "warriors/team" photos as fake headshots ("Real Results From Warriors"). Orphaned (not rendered) but **still in the repo/history** — delete it.
- **~20 unused assets** (entire `assets/` dir is dead; many `public/` files referenced only by orphaned components — full list in agent notes; safe to prune).
- **Untracked `auto-dealers-worktree-backup.patch`** in the working fork references a live Status Auto vercel demo and a Behance gallery — **not part of the deployed site**; do not cite as live proof.

---

## 6. Case-Study Readiness Matrix

Classes: **A** = ready for a full case study · **B** = usable after adding a few materials · **C** = short portfolio card only · **D** = hide until improved.

| Project | Class | Rationale | Honest proof usable now |
|---|---|---|---|
| **Auto-dealer system (prototype)** | **A** (as a *prototype* story) | Fully built, honest, complete narrative + interactive demo already live | Interactive demo, architecture/logic, pilot scope, escalation rules, configurability — all present |
| **Tutorivo** | **B** | 4 real screenshots; needs status honesty + scope/role-of-AI + (ideally) a demo link | Screenshots, "what was built", implementation status |
| **TurbotaAI** | **B** | 3 screenshots; **must fix contradictory status** (in-dev vs "real"); add scope + real video/audio | Screenshots, feature set, build-in-public status |
| **Status Auto** | **B** | 3 screenshots; decide if the vercel demo becomes live proof or stays prototype-only | Screenshots, prototype framing |
| **Ikorka** | **C** (→ B with materials) | Only a live audio demo; no screenshots/scope | Voice demo (strong, honest artifact) |
| **Hotel Natsionalny** | **D** until materials | Claimed "real" with **zero** supporting assets — accuracy risk | none currently — needs screenshots/scope/permission |
| **Dacha TV** | **D** until materials | Same as above | none currently |
| **Dating CRM** | **D** | Text blurb only, no assets | none |
| **Leather Clinic** | **D** | Text blurb only, no assets | none |
| **Outreach + Sales Copilot** | **D** (highest upside) | Not represented; flagship capability | none on site — needs anonymized screenshots/workflow (see §13) |

**Recommended case-study structure** (evaluate per project; introduce only when materials exist): 1) context, 2) business problem, 3) previous/manual process, 4) desired outcome, 5) proposed system, 6) architecture/workflow, 7) what was actually built, 8) user journey, 9) integrations/tools, 10) screenshots or interactive demo, 11) current status, 12) verified result **or an explicit "result data not yet available"**, 13) relevant CTA.

---

## 7. Recommended Site Architecture

The current structure already separates the concerns reasonably. Proposed target:

- **A. Main credibility site** — `/` (keep broad positioning; tighten CTA hierarchy — §8).
- **B. General automation proof** — `/automation` (unify all three locales on `AutomationPortfolioPage`; add the outreach/Copilot proof once materials exist).
- **C. Niche auto-dealer sales page** — `/auto-dealers` (make reachable; it is the primary outreach destination).
- **D. Individual case studies** — **introduce `/work/[slug]` only when a project has enough verified material** (currently that's the auto-dealer prototype, and Tutorivo/TurbotaAI/Status Auto as B-class). Do **not** scaffold empty case pages. Each page should follow the 13-point structure in §6. Justification: the homepage `SelectedWork` cards currently dead-end into a "Request similar" dialog with no detail page; a `/work/[slug]` route lets an interested visitor go deeper without inflating claims. Worth it once ≥3 projects are B-class or better (they are), so this is **justified but gated on materials**.
- **E. Interactive demos** — keep in-page (auto-dealer + automation portfolio demos are effective as-is).
- **F. Conversion** — Cal.com booking + `RequestDialog` (single n8n destination). Consolidate the legacy `AutomationFormDialog` into `RequestDialog`.

Navigation change: add a discoverable path to `/auto-dealers` and `/automation` (both currently under-linked).

---

## 8. Homepage Recommendations

1. **Fix the "Real clients" vs "Prototype" contradiction** (`lib/i18n.ts:78` + UA/RU). Either relabel the section (e.g. "Selected builds") or split into "Client work" vs "In development / prototypes". *Small; no new material.* Commercial: prevents an easy credibility hit.
2. **Establish one dominant next step.** Keep the broad hub but visually subordinate merch/community/social to the primary "Work with me / Book a call" path. *Medium; no new material.*
3. **Link `/auto-dealers` from `#focus`** with a clear "See the system" CTA. *Small.*
4. **Keep** the honest "no invented numbers" framing and the "current focus, not the whole picture" auto-dealer note — both are assets.

Do not remove existing business directions (products, merch, community, content) without explicit approval — recommend re-ordering/visual hierarchy only.

---

## 9. Automation-Page Recommendations

1. **Unify EN with UA/RU** on `AutomationPortfolioPage`, replacing legacy `HeroSection`+`PricingSection`. Add **real English** copy and fix `copy.en = copy.ua` (`AutomationPortfolioPage.tsx:539`). *Medium; needs EN copy only.*
2. **Add `/automation` to `sitemap.ts`** (all locales) — see §12. *Small.*
3. **Prove or soften the "real" case claims** (Hotel Natsionalny, Dacha TV, TurbotaAI): add screenshots/scope or reclassify honestly. *Small–medium; needs materials.*
4. **Represent the outreach + Sales Copilot system** as an honest case (anonymized) — currently the flagship capability is absent. *Medium; needs materials (§13).*
5. Migrate the EN `AutomationFormDialog` intake into the standard `RequestDialog` (adds `track()` + localization). *Small–medium.*

Ensure the page communicates **business outcomes**, not just tool/chatbot screenshots (the UA/RU version already does this well; EN currently doesn't).

---

## 10. Auto-Dealer-Page Recommendations

The page is strong and honest; keep the prototype/pilot framing. Targeted improvements:
1. **Make it reachable** (nav/products/`#focus`) — biggest single conversion fix. *Small.*
2. **Expand "follow-up"** from one line to a short, concrete description (channel, timing, cadence) — currently PARTIAL. *Small; no material.*
3. **Fix the failure-state message** in `RequestDialog` so a network/webhook error doesn't show "fill in required fields". *Small.*
4. **Fix the portfolio link affordance** (internal link shouldn't use an external-link icon; ensure EN lands on the unified portfolio). *Small.*
5. Confirm the demo is unmistakably a prototype at first glance (it is labelled; consider a small persistent "Interactive prototype" badge on the demo itself). *Small.*

---

## 11. Mobile / Design / Trust Audit

**Method note (limitation):** this pass is primarily **code-level**. A full device-matrix visual regression was not run for every page in this session. (In the prior task the `/auto-dealers` page specifically was verified at 320/390/430/1440 with no horizontal overflow.) A live cross-page visual pass with the available headless Chromium/Playwright is recommended as a fast follow-up.

Findings from code:
- **Header/menu:** locale-aware, mobile menu toggles + Esc-closes + smooth-scrolls when the anchor exists, falls back to home navigation otherwise (`header.tsx`). Sound.
- **Semantic HTML / headings:** single H1 per page (home H1 is `sr-only`, brand shown as logo). Good.
- **Alt text:** present on all images in **rendered** components; `hero-with-mockup.tsx` types `alt` as required. Good. (Orphaned components not counted.)
- **Images:** `images.unoptimized: true` + passthrough `image-loader.js` — no resizing/format negotiation; large `.webp`/`.jpg` served as-is. Minor performance/LCP risk on image-heavy sections. *Medium.*
- **Trust signals present:** honest disclaimers, Privacy/Terms dialogs (footer), consistent contact routes, JSON-LD identity.
- **Trust risks:** (1) **fabricated testimonials + fake headshots in dead code** — delete (§5). (2) Unlabelled compact projects (Dating CRM, Leather Clinic) with no proof read as filler. (3) "Real clients" heading vs prototype badges (§8).
- **Accessibility basics:** keyboard nav on dialogs/menus appears handled (Radix dialog, Esc handlers). A dedicated a11y pass (focus order, contrast on gold-on-black badges) is recommended. *Medium.*

---

## 12. SEO & Analytics Audit

### SEO
- **Static export** (`next.config.js output:'export'`), clean URLs (no `trailingSlash`), SSG **pre-renders** client components into HTML — **crawlers/AI-search see the content** (verified: hero copy + JSON-LD in `out/index.html`).
- **Metadata:** root defaults in `app/layout.tsx`; `pageMeta()` for sub-pages; inline for homes + EN automation. Per-locale titles/descriptions present. **Canonical present on all pages.**
- **hreflang:** present on most routes via `pageMeta` — **MISSING on EN `/automation`** (inline metadata omits `alternates.languages`), and on the redirect stubs.
- **Open Graph:** global defaults + localized `og:locale`; **EN `/automation` omits page-level OG** → `og:title` falls back to the site default.
- **Twitter card:** global (`summary_large_image`, creator `@vladkuzmenkosxy`).
- **Structured data:** site-wide JSON-LD `@graph` only (Person, WebSite `inLanguage:"en"`, ProfessionalService) in `app/layout.tsx`. **Not localized** (English `inLanguage` even on `/ua`,`/ru`); **no page-level Service/Product/FAQ/Breadcrumb** schema.
- **Sitemap** (`app/sitemap.ts`): 5 slugs × 3 locales = 15 URLs (`""`, `visibilityos`, `ai-systems`, `auto-dealers`, `warriors-team`). **`/automation` (all 3 locales) is MISSING** despite being live, indexable content — real gap. No hreflang alternates inside the sitemap (declared per-page instead — valid).
- **Robots:** static `app/robots.txt`, `Allow: /` + sitemap ref. Correct. Redirect stubs are `index,follow` (should be `noindex`).
- **Safety net off:** `next.config.js` sets `typescript.ignoreBuildErrors: true` and `eslint.ignoreDuringBuilds: true` — a future i18n key divergence would ship as `undefined` rather than failing the build.
- **Stray widget:** `components/translate-switcher.tsx` is a second, unrelated Google-Translate mechanism (googtrans cookie, Russian comments) — confirm whether it is mounted; likely dead/conflicting.

### Analytics (conversion tracking)
- **No GA/GTM is installed** — grep for `gtag`/`GTM-`/`G-…`/`googletagmanager` finds only `lib/analytics.ts`. `track()` pushes to `window.dataLayer`, calls `gtag` **only if it already exists** (it never does), and dispatches a `vk:track` DOM event nothing listens to. **Net: no events reach any analytics tool today.**
- **Instrumented events** (only `AutoDealersPage.tsx` + `request-dialog.tsx` import `track`): `form_open`, `form_submit` (on webhook 2xx only), `pilot_cta_click`, `scenario_select`, `demo_click`, `portfolio_click`.
- **Not measurable today** (even after adding a tag manager, these have **no** events): Cal.com booking clicks, outbound/social/WhatsApp/email clicks, language selection, automation-portfolio demo interaction, case-study "views". Attribution (`utm_*`, `sourcePage`, `referrer`, `buttonLabel`, `intent`, `context`) is captured in the **n8n payload** — CRM-side only, not front-end analytics.

**Minimal useful event map (proposed; do not implement in this pass):** `page_view` (auto, per locale), `book_call_click` (Cal.com, all sites), `ask_ai_open`, `demo_open` + `demo_scenario_select` + `demo_complete`, `form_open` + `form_submit` (keep, extend site-wide), `portfolio_click`, `language_change`, `outbound_click` (social/WhatsApp/email), `case_study_view` (when `/work/[slug]` ships). First install GTM (or GA4) so the existing `dataLayer` pushes are actually consumed.

---

## 13. Materials Request (exact)

Search of the repo confirms these are genuinely absent — not just unlinked. Prioritized:

| # | Material | Project/page | Why | Exact format | Launch without it? | Honest fallback |
|---|---|---|---|---|---|---|
| 1 | Anonymized outreach + Sales Copilot workflow screenshots + 3–5 sanitized Telegram Copilot message screenshots | `/automation` (flagship case) | Flagship capability is unrepresented | 4–8 PNG/WebP, lead data redacted | Yes | Describe the workflow in words + architecture diagram, labelled "system in production, examples anonymized" |
| 2 | Confirmation of true status + permission for Hotel Natsionalny & Dacha TV | `/automation` UA/RU cases | Currently claimed "real" with zero proof (accuracy risk) | Written confirmation + 2–4 screenshots each (with permission) | No (reclassify meanwhile) | Downgrade to "prototype/concept" or remove until materials exist |
| 3 | Decision on TurbotaAI status (in-dev vs real) + short screen recording | homepage + `/automation` | Contradictory labels across pages | 1 status decision + 20–40s MP4 | Yes | Keep "in active development", swap `video.webp` still for a real clip |
| 4 | Tutorivo: role-of-AI + exact delivered scope + optional live/demo URL | homepage / future `/work/tutorivo` | Screenshots exist but no scope/result | 1 short paragraph + optional URL | Yes | Screenshots + "in development", no result claim |
| 5 | Status Auto: is the vercel prototype a public demo? | homepage / `/auto-dealers` | Demo URL exists only in an untracked patch | Yes/No + URL if yes | Yes | Keep prototype screenshots only |
| 6 | Ikorka: 1–2 screenshots + one-line scope/consent | homepage compact card | Only audio exists | 1–2 images + text | Yes | Keep audio-only card |
| 7 | Dating CRM & Leather Clinic: screenshots + scope, or decision to hide | homepage compact cards | No assets at all | 2–3 images each + text | Yes | Hide until materials exist |
| 8 | Verified metrics for ANY project (only if truly measured) | all case studies | Zero quantified results exist | Written, sourced numbers | Yes | Explicit "result data not yet available" line |
| 9 | Confirm current social handles (`@vladkuzmenkosxy` vs `@vladkuzmenkoai`) | footer / JSON-LD | Handles are inconsistent | Confirmed list | Yes | Leave as-is pending confirmation |
| 10 | Real English `/automation` copy | EN `/automation` | Needed to unify EN with UA/RU | Copy doc | Yes (UA/RU already fine) | Temporarily serve English strings translated from UA |

Do **not** request generic "more content" — only the specific items above.

---

## 14. Phased Implementation Plan

> All phases are proposals. None are implemented in this pass. "Files likely to change" reference production `main` @ `51ce0cc`. Test commands assume the production repo: `npx tsc --noEmit`, `npx eslint <file>`, `npm run build`, `git diff --check`, plus a visual check with the available headless Chromium.

**Phase 1 — Trust failures & broken discoverability (highest priority)**
- Objective: remove reputational risk; make the key sales page reachable.
- Pages/files: delete `components/TestimonialsSection.tsx` (+ other confirmed-orphaned marketing components, incl. `ProjectsSection.tsx` with the Behance link); `components/home/AutoDealerFocus.tsx` (add `/auto-dealers` link); `components/ui/header.tsx` and/or `components/home/ProductsOverview.tsx` (surface `/auto-dealers`); `lib/i18n.ts` (fix "Real clients" heading).
- Materials: none. Dependencies: none.
- Acceptance: no fabricated testimonials or Behance links anywhere in the tree; `/auto-dealers` reachable in ≤1 click from home in all locales; heading no longer overclaims.
- Risks: deleting orphaned components — verify zero importers first (`grep -r "ComponentName"`). Rollback: git revert.

**Phase 2 — Sales-message clarity (homepage + automation unification)**
- Objective: one dominant next step; EN/UA/RU `/automation` parity.
- Files: `app/automation/page.tsx` (render `AutomationPortfolioPage`), `components/pages/AutomationPortfolioPage.tsx` (fix `copy.en = copy.ua`, add EN copy), `components/ui/header.tsx` (`LOCALIZED_SLUGS` += `automation`), homepage CTA hierarchy in `components/home/*`.
- Materials: real EN automation copy (#10).
- Acceptance: EN `/automation` = UA/RU structure with English text; language switch preserves `/automation`; homepage primary CTA visually dominant.
- Risks: EN copy quality; legacy pricing removal — confirm no live link depends on it. Rollback: git revert.

**Phase 3 — Auto-dealer proof & demo polish**
- Files: `components/pages/AutoDealersPage.tsx` (expand follow-up copy, fix portfolio-link icon/target), `components/ui/request-dialog.tsx` (distinct network-failure message), `lib/i18n.ts`.
- Acceptance: follow-up explained; failure state accurate; internal link affordance correct. Risks: minimal.

**Phase 4 — Portfolio / case-study structure (`/work/[slug]`)**
- Objective: depth for B-class+ projects. Gated on materials (#1–#7).
- Files (new): `app/work/[slug]/page.tsx`, a `lib/case-studies.ts` data file, `app/sitemap.ts` (+slugs), homepage `SelectedWork` cards link to detail pages.
- Acceptance: only projects with verified materials get a page; each follows the 13-point structure; honest status + "result not yet available" where true. Risks: scope creep — start with the auto-dealer prototype + Tutorivo.

**Phase 5 — Translations & SEO**
- Files: `app/sitemap.ts` (add `automation`; consider `noindex` for stubs via metadata), EN `/automation` metadata (add `openGraph` + hreflang), `app/layout.tsx` (localize JSON-LD `inLanguage`; consider page-level Service/FAQ schema), remove/confirm `components/translate-switcher.tsx`.
- Acceptance: `/automation` in sitemap with hreflang + OG; localized structured data; stubs not indexed. Risks: low.

**Phase 6 — Analytics**
- Files: `app/layout.tsx` (install GTM/GA4), extend `track()` usage across CTAs (`header.tsx`, `home/*`, `AutomationPortfolioPage.tsx`), `lib/analytics.ts`.
- Acceptance: minimal event map (§12) firing and visible in the tool; booking/outbound/language events present. Risks: consent/privacy — add a cookie/consent note if required in target markets.

**Phase 7 — Secondary polish**
- Image optimization strategy (revisit `images.unoptimized`), a11y pass (focus/contrast), prune ~20 unused assets, re-enable `typescript`/`eslint` build checks or add a CI type-check to protect i18n parity.

---

## 15. Exact Files Expected to Change Later (by area)

- **Nav/discoverability:** `components/ui/header.tsx`, `components/FooterSection.tsx`, `components/home/AutoDealerFocus.tsx`, `components/home/ProductsOverview.tsx`.
- **Automation unification:** `app/automation/page.tsx`, `components/pages/AutomationPortfolioPage.tsx`.
- **Copy/i18n:** `lib/i18n.ts`.
- **Auto-dealer polish:** `components/pages/AutoDealersPage.tsx`, `components/ui/request-dialog.tsx`.
- **Case studies (new):** `app/work/[slug]/page.tsx`, `lib/case-studies.ts`.
- **SEO:** `app/sitemap.ts`, `app/layout.tsx`, `lib/page-meta.ts`, EN `/automation` metadata, `app/ai-platform/page.tsx` + `app/university/page.tsx` (noindex).
- **Analytics:** `app/layout.tsx`, `lib/analytics.ts`, and CTA components above.
- **Cleanup (delete):** `components/TestimonialsSection.tsx`, `components/ProjectsSection.tsx`, and other confirmed-orphaned components; unused assets in `assets/` and `public/`.

---

## 16. Open Technical Questions

1. **Source-of-truth repo.** Deploys serve `kyzavlad/vladkuzmenko@main` (`51ce0cc`). This working checkout is `kuzmenkovlad7-del/vladkuzmenko@e816da3` (divergent). Which repo do future changes target, and should the fork be reconciled or retired?
2. **Status Auto vercel demo** (`status-auto.vercel.app`) — is it a public, stable demo we can link, or internal-only? It currently exists only in an untracked patch.
3. **Hotel Natsionalny / Dacha TV** — are these delivered client projects (with permission to name) or should they be reclassified?
4. **TurbotaAI status** — "in active development" or "real"? (Labels currently conflict across pages.)
5. **`components/translate-switcher.tsx`** — intentionally mounted anywhere, or dead? It conflicts conceptually with the route-based i18n.
6. **Consent/analytics** — is cookie consent required for the target markets before installing GTM/GA4?
7. **Social handles** — confirm `@vladkuzmenkosxy` vs `@vladkuzmenkoai` for each network.
8. **Image strategy** — is `images.unoptimized: true` a deliberate static-export constraint, or can a build-time optimizer be added?

---

## 17. Final Recommended Priority Order

1. **Delete fabricated-testimonials + Behance dead code** (trust/legal risk). — *small, no materials*
2. **Make `/auto-dealers` reachable** from homepage `#focus` + nav. — *small*
3. **Fix homepage "Real clients" overclaim.** — *small*
4. **Unify EN `/automation`** with the honest UA/RU portfolio + fix `copy.en` fallback. — *medium, needs EN copy*
5. **Add `/automation` to the sitemap** + EN hreflang/OG. — *small*
6. **Install GTM/GA4 + minimal event map** (turn analytics on). — *medium*
7. **Represent the outreach + Sales Copilot system** as an honest case. — *medium, needs materials*
8. **Reclassify or prove** Hotel Natsionalny / Dacha TV / TurbotaAI status. — *small–medium, needs materials*
9. **Auto-dealer polish** (follow-up copy, failure-state message, link affordance). — *small*
10. **Introduce `/work/[slug]`** for B-class+ projects as materials arrive. — *medium*
11. **Secondary polish** (image optimization, a11y, prune assets, restore build type-checks). — *medium*

---

*Prepared as an audit only. No production files were modified; nothing was committed or pushed. All findings verified against production `main` @ `51ce0cc`; assumptions and unverified items are labelled inline.*
