"use client";

import { useEffect } from "react";
import Link from "next/link";

/** Client-side redirect with an accessible fallback link. Used by legacy
 *  placeholder routes that now point at real sections. */
export function RedirectNotice({
  to,
  message,
  label,
}: {
  to: string;
  message: string;
  label: string;
}) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 text-center px-6">
      <p className="text-gray-400">{message}</p>
      <Link href={to} className="text-amber-300 underline">
        {label}
      </Link>
    </main>
  );
}
