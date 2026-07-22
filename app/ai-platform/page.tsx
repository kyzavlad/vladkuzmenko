import type { Metadata } from "next";
import { RedirectNotice } from "@/components/redirect-notice";

// The old "AI Editing Platform" demo was a non-functional placeholder.
// The real early-access tool is VisibilityOS. This route only redirects, so it
// is excluded from indexing.
export const metadata: Metadata = {
  title: "Redirecting to VisibilityOS",
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function AiPlatformRedirect() {
  return (
    <RedirectNotice
      to="/#visibilityos"
      message="Taking you to VisibilityOS…"
      label="Continue to VisibilityOS"
    />
  );
}
