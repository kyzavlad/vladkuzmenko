// Lightweight, dependency-free analytics dispatch. Safe no-op when no analytics
// layer is loaded. Pushes to window.dataLayer (GTM-style), calls window.gtag if
// present, and emits a DOM CustomEvent ("vk:track") so any listener can pick it up.
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
