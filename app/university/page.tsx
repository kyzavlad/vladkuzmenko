'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Video, Users, MessageSquare, Trophy, Lock, ChevronRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// University Platform Page
export default function UniversityPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCampus, setSelectedCampus] = useState('ai');
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Loading animation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const campuses = {
    ai: {
      title: 'AI & Automation Mastery',
      lessons: [
        { id: 1, title: 'Introduction to AI Systems', duration: '45 min', completed: true },
        { id: 2, title: 'Prompt Engineering Basics', duration: '60 min', completed: true },
        { id: 3, title: 'Building Your First Automation', duration: '90 min', completed: false },
        { id: 4, title: 'API Integration Mastery', duration: '75 min', completed: false },
        { id: 5, title: 'Scaling AI Solutions', duration: '120 min', locked: true },
      ]
    },
    content: {
      title: 'Content Creation Empire',
      lessons: [
        { id: 1, title: 'Content Strategy Foundation', duration: '45 min', completed: false },
        { id: 2, title: 'Viral Video Formula', duration: '60 min', completed: false },
        { id: 3, title: 'Storytelling Mastery', duration: '90 min', completed: false },
        { id: 4, title: 'Platform Optimization', duration: '75 min', completed: false },
        { id: 5, title: 'Monetization Strategies', duration: '120 min', locked: true },
      ]
    },
    sales: {
      title: 'Sales Psychology',
      lessons: [
        { id: 1, title: 'Psychology of Persuasion', duration: '45 min', completed: false },
        { id: 2, title: 'Objection Handling', duration: '60 min', completed: false },
        { id: 3, title: 'High-Ticket Closing', duration: '90 min', completed: false },
        { id: 4, title: 'Building Trust', duration: '75 min', completed: false },
        { id: 5, title: 'Advanced Techniques', duration: '120 min', locked: true },
      ]
    }
  };

  if (isLoading) {
    return (
      <div className="loading-animation">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="loading-logo mb-8">
            <span className="text-4xl font-bold font-serif italic gold-gradient">
              VladKuzmenko
            </span>
            <p className="text-lg text-gray-400 mt-2">University</p>
          </div>
          <div className="sound-wave">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="sound-bar"></div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link href="/" className="text-xl font-bold font-serif italic gold-gradient">
              VladKuzmenko
            </Link>
            <span className="text-gray-400">University</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <Users className="h-4 w-4" />
              Community
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <Trophy className="h-4 w-4" />
              Leaderboard
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <MessageSquare className="h-4 w-4" />
              Support
            </button>
          </nav>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="w-80 bg-zinc-950 border-r border-zinc-800 h-[calc(100vh-73px)] overflow-y-auto fixed md:sticky top-[73px] z-40"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Campuses</h2>
                <div className="space-y-2">
                  {Object.entries(campuses).map(([key, campus]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCampus(key)}
                      className={`w-full text-left p-4 rounded-lg transition-all ${
                        selectedCampus === key
                          ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#B8860B]/10 border border-[#D4AF37]/50'
                          : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-800'
                      }`}
                    >
                      <h3 className="font-semibold mb-1">{campus.title}</h3>
                      <p className="text-sm text-gray-400">
                        {campus.lessons.filter(l => l.completed).length}/{campus.lessons.length} completed
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={`flex-1 ${sidebarOpen ? 'md:ml-0' : ''}`}>
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={selectedCampus}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-4xl font-bold mb-8">{campuses[selectedCampus as keyof typeof campuses].title}</h1>
              
              {/* Lessons List */}
              <div className="space-y-4">
                {campuses[selectedCampus as keyof typeof campuses].lessons.map((lesson) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: lesson.id * 0.1 }}
                    className={`p-6 rounded-xl border ${
                      lesson.locked
                        ? 'bg-zinc-900/50 border-zinc-800 opacity-50'
                        : 'bg-zinc-900 border-zinc-800 hover:border-[#D4AF37]/30 cursor-pointer'
                    } transition-all`}
                    onClick={() => !lesson.locked && setSelectedLesson(lesson.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          lesson.completed
                            ? 'bg-green-500/20 text-green-500'
                            : lesson.locked
                            ? 'bg-zinc-800 text-zinc-600'
                            : 'bg-[#D4AF37]/20 text-[#D4AF37]'
                        }`}>
                          {lesson.completed ? (
                            '✓'
                          ) : lesson.locked ? (
                            <Lock className="h-5 w-5" />
                          ) : (
                            <Video className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{lesson.title}</h3>
                          <p className="text-gray-400">{lesson.duration}</p>
                        </div>
                      </div>
                      {!lesson.locked && (
                        <ChevronRight className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Community Section */}
              <div className="mt-12 p-8 bg-gradient-to-r from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800">
                <h2 className="text-2xl font-bold mb-4">Campus Community</h2>
                <p className="text-gray-400 mb-6">
                  Connect with 2,847 students in this campus
                </p>
                <Button className="bg-[#D4AF37] hover:bg-[#B8860B] text-black">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Join Discussion
                </Button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
