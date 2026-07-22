# Materials Needed — VladKuzmenko.com Sales-Proof Upgrade

These are the exact items that would strengthen the site further. Everything below was checked against the repository: each item is genuinely **absent** (not merely unlinked). Nothing here blocks the branch from shipping — every page already uses an honest fallback and correct status label. No item requires inventing metrics, testimonials or integrations.

Status legend for "Blocks launch?": **No** = the page is live and honest without it; the material only upgrades proof.

| # | Priority | Project / Page | Exact file / information needed | Format / dimensions / duration | Where it appears | Blocks launch? | Honest fallback currently used |
|---|---|---|---|---|---|---|---|
| 1 | **P0** | Analytics (site-wide) | Real **GA4 Measurement ID**, set as env var `NEXT_PUBLIC_GA_ID` at build/host | String `G-XXXXXXXXXX` | Enables all `track()` events in a dashboard (`components/analytics.tsx`) | No | Conditional GA4 is fully implemented; with no ID it renders nothing and the site works normally. Events also dispatch as `vk:track` DOM events. |
| 2 | **P1** | Sales Copilot case study (`/work/sales-copilot`) | Anonymized workflow screenshots + 3–5 **sanitized** Telegram Copilot message screenshots (lead data redacted) | 4–8 PNG/WebP, ≥1200px wide, faces/names/phones/emails blurred | Adds a "Screens" gallery to the case study (data model already supports `shots`) | No | Accessible **architecture diagram** (12-node flow) + full written workflow + honest "internal live pilot" result statement |
| 3 | **P1** | `/automation` + future `/work/hotel-natsionalny`, `/work/dacha-tv` | Written confirmation of true status + permission to name; 2–4 screenshots each | Confirmation note + PNG/WebP ≥1200px | Real-client proof cards / detail pages | No | Hotel Natsionalny shown as a "Real project" card with the honest line "Real client work. A detailed public case study is in preparation." Dacha TV omitted until materials exist. |
| 4 | P2 | TurbotaAI (`/work/turbotaai`) | Decision on exact status wording + a short screen recording of the chat/voice/video experience | 20–40s MP4/WebM, ≤10 MB | Case study; replaces the still `video.webp` | No | Labelled "In active development" consistently; 3 real screenshots shown |
| 5 | P2 | Tutorivo (`/work/tutorivo`) | Role-of-AI + exact delivered scope; optional public/demo URL | 1 short paragraph + optional URL | Case study body | No | 4 real screenshots + honest "in development" copy |
| 6 | P2 | Status Auto (`/work/status-auto`) | Is the Vercel prototype a public demo we can link? | Yes/No + URL if yes | Case study CTA / link | No | Prototype framing; points to the live `/auto-dealers` interactive demo as the runnable version |
| 7 | P3 | Ikorka (homepage compact card) | 1–2 screenshots + one line of scope + consent to show | 1–2 images ≥1000px + text | Could graduate Ikorka to a `/work/ikorka` case | No | Live voice demo (`/voice_assistant.MP3`) kept as the honest proof artifact |
| 8 | P3 | Dating CRM & Leather Clinic (homepage compact cards) | Screenshots + scope, or a decision to hide | 2–3 images each + text | Homepage cards / possible case pages | No | Kept as short text-only cards; not published as case studies (insufficient proof) |
| 9 | P3 | All case studies | Verified, sourced performance metrics — **only if genuinely measured** | Written numbers + source | "Result" section of each case study | No | Each "Result" states the honest status and, where no metric exists, that "metrics are still being collected" |
| 10 | P4 | Footer / JSON-LD identity | Confirm current social handles (`@vladkuzmenkosxy` vs `@vladkuzmenkoai`) | Confirmed handle list | Footer + `app/layout.tsx` `sameAs` | No | Existing handles left unchanged pending confirmation |

## Notes
- **Do not** supply invented numbers for item 9. If a metric can't be verified, the current "result data not yet available" phrasing stays.
- Item 1 (GA4 ID) is the only thing preventing conversion measurement from being visible in a dashboard today; the integration itself is complete and safe (no private lead data is ever sent to analytics).
- Screenshots for items 2, 3, 7 must have any personal data (names, phone numbers, emails, message content) removed before use.
