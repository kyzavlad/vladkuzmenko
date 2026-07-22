import type { Metadata } from "next";
import { RedirectNotice } from "@/components/redirect-notice";

// The old "University" course dashboard was a non-functional placeholder.
// Digital products now live in the Products section. This route only redirects,
// so it is excluded from indexing.
export const metadata: Metadata = {
  title: "Redirecting to products",
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function UniversityRedirect() {
  return (
    <RedirectNotice
      to="/#products"
      message="Taking you to products…"
      label="Continue to products"
    />
  );
}
