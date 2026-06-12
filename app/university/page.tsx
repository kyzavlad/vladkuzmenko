"use client";

import { useEffect } from "react";
import Link from "next/link";

// The old "University" course dashboard was a non-functional placeholder.
// Digital products now live in the Products section.
export default function UniversityRedirect() {
  useEffect(() => {
    window.location.replace("/#products");
  }, []);

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 text-center px-6">
      <p className="text-gray-400">Taking you to products…</p>
      <Link href="/#products" className="text-amber-300 underline">
        Continue to products
      </Link>
    </main>
  );
}
