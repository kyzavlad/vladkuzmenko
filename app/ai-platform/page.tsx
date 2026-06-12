"use client";

import { useEffect } from "react";
import Link from "next/link";

// The old "AI Editing Platform" demo was a non-functional placeholder.
// The real early-access tool is VisibilityOS.
export default function AiPlatformRedirect() {
  useEffect(() => {
    window.location.replace("/#visibilityos");
  }, []);

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 text-center px-6">
      <p className="text-gray-400">Taking you to VisibilityOS…</p>
      <Link href="/#visibilityos" className="text-amber-300 underline">
        Continue to VisibilityOS
      </Link>
    </main>
  );
}
