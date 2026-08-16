import type { Metadata } from "next";
import { LegacyRedirect } from "@/components/ui/legacy-redirect";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: "/growth-systems" },
};

export default function Page() {
  return <LegacyRedirect href="/growth-systems" />;
}
