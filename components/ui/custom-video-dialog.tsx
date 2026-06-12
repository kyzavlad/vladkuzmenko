"use client";

import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomVideoDialogProps {
  videoSrc: string;
  title?: string;
  className?: string;
}

function getYoutubeId(url: string): string {
  const match = url.match(/(?:\/embed\/|v=)([^?&]+)/);
  return match ? match[1] : '';
}

export function CustomVideoDialog({
  videoSrc,
  title = "YouTube video player",
  className,
}: CustomVideoDialogProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [glowingDots, setGlowingDots] = useState<Array<{ id: number, style: React.CSSProperties }>>([]);

  useEffect(() => {
    const dots = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      style: {
        width: `${Math.random() * 4 + 2}px`,
        height: `${Math.random() * 4 + 2}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 2}s`,
      }
    }));
    setGlowingDots(dots);
  }, []);

  const videoId = getYoutubeId(videoSrc);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative cursor-pointer group overflow-hidden rounded-xl">
        {/* Rainbow border */}
        <div className="absolute -inset-[3px] rounded-xl bg-gradient-to-r from-[#ff1f71] via-[#ff7e1f] via-[#ffde1f] via-[#1fdf38] via-[#1f9aff] to-[#df1fff] opacity-80 animate-rainbow" style={{ '--speed': '4s' } as React.CSSProperties}></div>

        {/* Wrapper */}
        <div className="relative z-10 aspect-video bg-black/90 rounded-xl overflow-hidden border border-white/10">
          {isPlaying ? (
            <iframe
              src={`${videoSrc}${videoSrc.includes("?") ? "&" : "?"}autoplay=1`}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              frameBorder="0"
            />
          ) : (
            <>
              {/* YouTube Thumbnail */}
              <img
                src={thumbnail}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 z-10" onClick={() => setIsPlaying(true)}></div>

              {/* Glowing dots */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                {glowingDots.map((dot) => (
                  <div
                    key={dot.id}
                    className="absolute rounded-full bg-white/20 animate-pulse"
                    style={dot.style}
                  />
                ))}
              </div>

              {/* Play Button */}
              <div className="absolute inset-0 z-30 flex items-center justify-center" onClick={() => setIsPlaying(true)}>
                <div className="relative group-hover:scale-110 transition-transform duration-500">
                  <div className="absolute inset-0 bg-brand/20 rounded-full blur-xl scale-150 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute -inset-4 rounded-full border-2 border-brand/30 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-brand/80 to-brand rounded-full p-5 shadow-lg shadow-brand/20">
                    <Play className="w-10 h-10 text-white fill-white" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 z-30 text-center">
                <p className="text-white font-medium text-lg">{title}</p>
                <p className="text-white/70 text-sm mt-1">Click to play video</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
