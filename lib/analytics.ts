// Lightweight, dependency-free analytics dispatch. Safe no-op when no analytics
// layer is loaded. Pushes to window.dataLayer (GTM-style), calls window.gtag if
// present, and emits a DOM CustomEvent ("vk:track") so any listener can pick it up.
//
// STATUS: no analytics destination is configured in this repository. There is no
// GA4 / GTM container id anywhere in the codebase, and none is invented here. The
// calls below are therefore inert until a real destination is added — see
// "Required to go live".
//
// Event taxonomy used by the site (keep names stable):
//   business_cta            { source }                     — primary business CTA
//   engine_select           { engine, source }             — Traffic/Conversion/Growth chosen
//   ecosystem_jump          { direction }                  — navigator tile -> homepage section
//   ecosystem_open_page     { direction }                  — navigator tile -> dedicated page
//   form_open               { intent, buttonLabel }        — lead dialog opened (RequestDialog)
//   form_submit             { intent, buttonLabel }        — lead dialog submitted successfully
//   portfolio_open          { project, source }            — case opened
//   product_open            { product, source }            — owned product opened
//   warriors_application_open { source }                   — Warriors application started
//   drop_interest_open      { source }                     — Drop research list started
//   social_outbound         { platform }                   — outbound social click
//   calcom_click            { source }                     — Cal.com booking click
//   hero_view_work          {}                             — hero secondary CTA
//
// Required to go live (not done in this PR, deliberately):
//   1. a real GA4 measurement id or GTM container id, injected in app/layout.tsx;
//   2. a decision on consent handling before any third-party tag is added;
//   3. mapping of the event names above to the destination's schema.
export type TrackProps = Record<string, string | number | boolean | undefined>;

export function track(event: string, props: TrackProps = {}): void {
  if (typeof window === "undefined") return;
  const payload = { event, ...props };
  try {
    const w = window as unknown as {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push(payload);
    if (typeof w.gtag === "function") w.gtag("event", event, props);
    window.dispatchEvent(new CustomEvent("vk:track", { detail: payload }));
  } catch {
    /* no-op */
  }
}
