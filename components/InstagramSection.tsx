'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Youtube as YoutubeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type Video = {
  id: string;
  title: string;
  description: string;
  duration: string;
  url: string;
  youtubeId: string;
  tag: string;
};

const videos: Video[] = [
  {
    id: 'ai-systems-agency',
    title: 'Building AI systems for real businesses',
    description:
      'Full breakdown of how we design, build and deploy automation for clients from scratch.',
    duration: '24:18',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // replace with your real URL
    youtubeId: 'dQw4w9WgXcQ', // replace with your real video ID
    tag: 'AI Automation',
  },
  {
    id: 'university-ecosystem',
    title: 'Inside The University & the ecosystem',
    description:
      'How the campuses, Warriors Team and automation work together as one system.',
    duration: '32:07',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    tag: 'Ecosystem',
  },
  {
    id: 'content-machine',
    title: 'Turning long-form content into a 24/7 machine',
    description:
      'Real-time workflow of recording, clipping, editing and distributing content with AI.',
    duration: '19:45',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    tag: 'Content & Systems',
  },
];

export const InstagramSection = () => {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openVideo = (video: Video) => {
    setActiveVideo(video);
    setIsDialogOpen(true);
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setActiveVideo(null); // stops playback by unmounting iframe
    }
  };

  return (
    <section
      id="youtube"
      className="relative py-24 md:py-32 bg-black border-t border-zinc-900"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 mb-5">
            <YoutubeIcon className="w-4 h-4 text-red-500" />
            <span className="text-xs font-semibold tracking-[0.14em] text-zinc-400 uppercase">
              YouTube Channel
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Watch the full process,
            <br />
            <span className="gradient-gold-text">
              not just the highlights
            </span>
          </h2>

          <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto">
            Long-form videos where you can see real builds, client work and
            systems being tested in real time — no cuts, no fake “overnight
            success”, only execution.
          </p>
        </motion.div>

        {/* Video list */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto space-y-6"
        >
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-950 to-zinc-900/80 hover:border-amber-400/40 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden cursor-pointer"
              onClick={() => openVideo(video)}
            >
              <div className="flex flex-col md:flex-row">
                {/* Thumbnail */}
                <div className="relative md:w-[45%] aspect-video md:aspect-auto md:min-h-[180px] overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-black/70 border border-white/20 shadow-lg shadow-black/70 group-hover:bg-white group-hover:scale-105 transition-all duration-200">
                      <Play className="w-6 h-6 text-white group-hover:text-black" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs">
                    <span className="px-2 py-1 rounded-full bg-black/70 border border-zinc-700 text-zinc-200">
                      {video.tag}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-black/70 text-zinc-400">
                      {video.duration}
                    </span>
                  </div>
                </div>

                {/* Text content */}
                <div className="flex-1 p-5 md:p-6 flex flex-col justify-between gap-3">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                      {video.title}
                    </h3>
                    <p className="text-sm md:text-base text-zinc-400">
                      {video.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>New videos every week</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="h-9 px-4 bg-white text-black hover:bg-amber-300 hover:text-black"
                      >
                        Watch on site
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        className="h-9 px-3 border-zinc-700 text-zinc-300 hover:border-amber-400/60 hover:text-amber-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(video.url, '_blank');
                        }}
                      >
                        Open on YouTube
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Video dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="max-w-4xl w-full bg-black border border-zinc-800 p-0 overflow-hidden">
          {activeVideo && (
            <>
              <DialogHeader className="px-6 pt-5 pb-3 border-b border-zinc-800">
                <DialogTitle className="flex items-center gap-2 text-base md:text-lg text-white">
                  <YoutubeIcon className="w-5 h-5 text-red-500" />
                  <span>{activeVideo.title}</span>
                </DialogTitle>
              </DialogHeader>
              <div className="px-4 pb-5 pt-4">
                <div className="aspect-video w-full rounded-xl overflow-hidden border border-zinc-800 bg-black">
                  <iframe
                    key={activeVideo.youtubeId}
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <p className="mt-3 text-xs md:text-sm text-zinc-500">
                  You&apos;re watching this directly on the site. Close the
                  window to stop playback or open the video on YouTube for
                  comments and playlist navigation.
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
