'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Film, Scissors, Download, Sparkles, Play, Settings, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AIPlatformPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('clip');
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Loading animation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const templates = [
    { id: 1, name: 'Viral Hook', preview: '/template-1.jpg' },
    { id: 2, name: 'Story Format', preview: '/template-2.jpg' },
    { id: 3, name: 'Educational', preview: '/template-3.jpg' },
    { id: 4, name: 'Product Demo', preview: '/template-4.jpg' },
    { id: 5, name: 'Testimonial', preview: '/template-5.jpg' },
    { id: 6, name: 'News Style', preview: '/template-6.jpg' },
  ];

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
            <p className="text-lg text-gray-400 mt-2">AI Editing Platform</p>
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedVideo(file);
    }
  };

  const handleProcess = async () => {
    setProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold font-serif italic gold-gradient">
              VladKuzmenko
            </Link>
            <span className="text-gray-400">AI Editing Platform</span>
          </div>
          <nav className="flex items-center gap-6">
            <Button variant="ghost" size="sm">
              <Grid className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === 'clip' ? 'default' : 'outline'}
            onClick={() => setActiveTab('clip')}
            className={activeTab === 'clip' ? 'bg-[#D4AF37] hover:bg-[#B8860B] text-black' : ''}
          >
            <Scissors className="mr-2 h-4 w-4" />
            Smart Clipping
          </Button>
          <Button
            variant={activeTab === 'edit' ? 'default' : 'outline'}
            onClick={() => setActiveTab('edit')}
            className={activeTab === 'edit' ? 'bg-[#D4AF37] hover:bg-[#B8860B] text-black' : ''}
          >
            <Film className="mr-2 h-4 w-4" />
            Template Editing
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'clip' ? (
            <motion.div
              key="clip"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Upload Section */}
              <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
                <h2 className="text-2xl font-bold mb-6">Upload Your Video</h2>
                
                <div className="border-2 border-dashed border-zinc-700 rounded-xl p-12 text-center hover:border-[#D4AF37]/50 transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">
                    Drag and drop your video here, or click to browse
                  </p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload">
                    <Button variant="outline" as="span" className="cursor-pointer">
                      Choose File
                    </Button>
                  </label>
                </div>

                {uploadedVideo && (
                  <div className="mt-6 p-4 bg-zinc-800 rounded-lg">
                    <p className="text-sm text-gray-400">Selected file:</p>
                    <p className="font-semibold">{uploadedVideo.name}</p>
                  </div>
                )}
              </div>

              {/* Settings Section */}
              <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
                <h2 className="text-2xl font-bold mb-6">Clipping Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Clip Duration</label>
                    <select className="w-full p-3 bg-zinc-800 rounded-lg border border-zinc-700">
                      <option>15-30 seconds</option>
                      <option>30-60 seconds</option>
                      <option>60-90 seconds</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Content Type</label>
                    <select className="w-full p-3 bg-zinc-800 rounded-lg border border-zinc-700">
                      <option>Educational</option>
                      <option>Entertainment</option>
                      <option>Promotional</option>
                      <option>Testimonial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Target Platform</label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center gap-2 p-3 bg-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-700">
                        <input type="checkbox" className="rounded" />
                        <span>TikTok</span>
                      </label>
                      <label className="flex items-center gap-2 p-3 bg-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-700">
                        <input type="checkbox" className="rounded" />
                        <span>Instagram</span>
                      </label>
                      <label className="flex items-center gap-2 p-3 bg-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-700">
                        <input type="checkbox" className="rounded" />
                        <span>YouTube</span>
                      </label>
                      <label className="flex items-center gap-2 p-3 bg-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-700">
                        <input type="checkbox" className="rounded" />
                        <span>Twitter</span>
                      </label>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-black"
                    onClick={handleProcess}
                    disabled={!uploadedVideo || processing}
                  >
                    {processing ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Extract Viral Clips
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="edit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6">Choose a Template</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <motion.div
                    key={template.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 cursor-pointer hover:border-[#D4AF37]/50 transition-all"
                  >
                    <div className="aspect-video bg-zinc-800 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="h-12 w-12 text-white/50" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{template.name}</h3>
                      <Button className="w-full mt-3" variant="outline" size="sm">
                        Use Template
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        {!processing && uploadedVideo && activeTab === 'clip' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold mb-6">Extracted Clips</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((clip) => (
                <div key={clip} className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <div className="aspect-video bg-zinc-800 rounded-lg mb-4 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white/50" />
                  </div>
                  <h3 className="font-semibold mb-2">Clip {clip}</h3>
                  <p className="text-sm text-gray-400 mb-4">High viral potential • 28 seconds</p>
                  <Button className="w-full" variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
