import type { Metadata } from "next";
import { pageMeta } from "@/lib/page-meta";
import { PORTFOLIO_UI } from "@/lib/portfolio";

// /ai-product-development was merged into the portfolio. `output: "export"` cannot
// emit a server 301, so this route ships a redirect page: the canonical points at
// /work, a client replace() moves the visitor immediately without adding a history
// entry, and the page is marked noindex. netlify.toml declares the real 301.
const TARGET = "/work";

export const metadata: Metadata = {
  ...pageMeta("en", "work", PORTFOLIO_UI.en.metaTitle, PORTFOLIO_UI.en.metaDesc),
  alternates: { canonical: TARGET },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <main style={{ background: "#000", color: "#fff", minHeight: "60vh", padding: "8rem 1.5rem" }}>
      <script dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(TARGET)})` }} />
      <p>
        <a href={TARGET} style={{ color: "#D4AF37" }}>Continue to Selected Work</a>
      </p>
    </main>
  );
}
