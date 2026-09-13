"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type StableProjectImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
};

export function StableProjectImage({
  src,
  alt,
  priority = false,
  sizes,
  className,
}: StableProjectImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(212,175,55,.07),transparent_42%),#050505] transition-opacity duration-300",
          loaded ? "opacity-0" : "opacity-100",
        )}
      />
      <Image
        fill
        src={src}
        alt={alt}
        priority={priority}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-contain object-top opacity-0 transition-[opacity,transform] duration-300",
          loaded && "opacity-100",
          className,
        )}
      />
    </>
  );
}
