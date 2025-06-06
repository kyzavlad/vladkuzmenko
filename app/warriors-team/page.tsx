"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Play, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Header } from "@/components/ui/header";

export default function WarriorsTeamPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  useEffect(() => {
    document.title = 'Warriors Team | VladKuzmenko.com';
  }, []);

  return (
    <div className="text-white selection:bg-red-500/30 min-h-screen relative bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="container mx-auto relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[120px] font-black tracking-wider uppercase mb-6">
            THE WARRIORS TEAM
          </h1>
          <p className="max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto text-lg md:text-xl lg:text-2xl text-neutral-300 mb-10 leading-relaxed font-light">
            No Great Leader in History achieved Excellence <em className="font-bold text-white not-italic">alone.</em>
          </p>
          
          {/* Video Placeholder */}
          <div className="mt-16 relative max-w-4xl mx-auto">
            <div className="relative bg-neutral-900 rounded-lg overflow-hidden aspect-video shadow-2xl border border-neutral-800">
              {!isVideoPlaying ? (
                <button 
                  onClick={() => setIsVideoPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center hover:bg-white/5 transition-colors"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-black ml-1" fill="black" />
                  </div>
                </button>
              ) : (
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Brotherhood Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <Image 
                src="https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800" 
                alt="Brotherhood meeting"
                width={800}
                height={500}
                className="rounded-xl shadow-2xl object-cover"
              />
            </div>
            
            <div className="space-y-6 text-lg md:text-xl text-neutral-300 order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-8">
                99.7% of modern leaders will never experience the power
                of true Brotherhood and Strategic Alliance.
              </h2>
              
              <p>
                They will never know what it&apos;s like to have other
                ambitious, driven, intelligent, and capable leaders at their
                side.
              </p>
              
              <p>
                To experience being surrounded by <span className="font-bold text-white">breakthrough stories.</span>
              </p>
              
              <p>
                To be among the <span className="font-bold text-white">most driven</span> and <span className="font-bold text-white">fortunate Leaders in the world.</span>
              </p>
              
              <div className="space-y-4 pt-4">
                <p>
                  Inside <span className="font-bold text-white">The Warriors Team</span> you will access <span className="font-bold text-white">strategies</span> that will
                  ignite your potential and push you to <span className="font-bold text-white">excel beyond limits</span> to
                  keep pace.
                </p>
                
                <p className="font-semibold text-white">
                  There is no other alliance on earth with Leaders of this caliber.
                </p>
              </div>
              
              <div className="pt-8">
                <Button 
                  asChild 
                  size="lg" 
                  className="group relative flex items-center gap-2 px-8 py-3 md:px-10 md:py-4 
                             text-sm md:text-base font-bold uppercase tracking-wider
                             bg-black hover:bg-neutral-800 text-white 
                             border-2 border-black hover:border-neutral-700
                             rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href="https://cal.com/vladkuzmenko.com/call">
                    APPLY FOR THE WARRIORS TEAM
                  </Link>
                </Button>
                
                <p className="text-sm text-neutral-400 italic mt-4">
                  *Personal interview required - I conduct each interview myself to ensure the right fit
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Network Section */}
      <section className="bg-black/20 backdrop-blur-sm py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:mb-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase">
              WHERE IS THE WARRIORS TEAM?
            </h2>
          </div>
          
          <div className="text-center mb-12">
            <p className="text-3xl md:text-4xl font-bold mb-8">Everywhere.</p>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              The globalization of business has made it essential to
              be part of a worldwide strategic network.
            </p>
          </div>
          
          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-16 max-w-6xl mx-auto">
            {[
              "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400",
              "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400",
              "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400",
              "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
              "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=400",
              "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400",
              "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400",
              "https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=400"
            ].map((src, i) => (
              <div key={i} className="relative overflow-hidden group rounded-lg">
                <Image
                  src={src} 
                  alt="Warriors Team global presence"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-b from-neutral-900/20 to-black py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:mb-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase">
              TWO PATHS FORWARD.
            </h2>
          </div>
          
          <div className="mb-16 max-w-2xl mx-auto">
            <Image 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800" 
              alt="Leaders"
              width={800}
              height={400}
              className="w-full rounded-xl shadow-2xl"
            />
          </div>
          
          <div className="max-w-4xl mx-auto space-y-12 text-center">
            <p className="text-xl text-neutral-300">
              We have <span className="font-bold text-white">over 3,500 members globally</span>, with
              <span className="font-bold text-white"> specialists, experts</span>, and <span className="font-bold text-white">professionals in every
              field conceivable.</span>
            </p>
            
            <p className="text-xl text-neutral-300">
              All committed to the <span className="font-bold text-white">pursuit of excellence in all
              aspects of life.</span>
            </p>
            
            <div className="py-12">
              <p className="text-2xl md:text-3xl font-bold text-white mb-12">
                After understanding all of this, <span className="text-brand">you now have
                two possible versions of yourself.</span>
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                <div className="bg-neutral-800/50 p-8 rounded-xl shadow-lg border border-neutral-700">
                  <div className="w-12 h-12 rounded-full border-2 border-blue-500 flex items-center justify-center mb-4 mx-auto">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <p className="text-lg text-neutral-300">
                    One who continues navigating life solo,
                    without a brotherhood, and without the
                    resources to truly create impact in
                    their life and others&apos;.
                  </p>
                </div>
                
                <div className="bg-brand/10 p-8 rounded-xl shadow-lg border border-brand">
                  <div className="w-12 h-12 rounded-full border-2 border-orange-500 flex items-center justify-center mb-4 mx-auto">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <p className="text-lg text-white font-semibold">
                    Or one who recognizes that no
                    exceptional Leader ever achieved greatness without
                    a strategic alliance.
                  </p>
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black text-white mb-12 uppercase tracking-wider">
                WHICH PATH WILL YOU CHOOSE?
              </h3>
              
              <Button 
                asChild 
                size="lg" 
                className="group relative inline-flex items-center gap-3 px-12 py-5 md:px-16 md:py-6 
                           text-lg md:text-xl font-bold uppercase tracking-wider
                           bg-black hover:bg-neutral-800 text-white 
                           border-2 border-black hover:border-neutral-700
                           rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Link href="https://cal.com/vladkuzmenko.com/call">
                  APPLY FOR THE WARRIORS TEAM
                  <Zap className="w-6 h-6 opacity-75 group-hover:opacity-100 group-hover:animate-pulse" />
                </Link>
              </Button>
              
              <p className="text-sm text-neutral-400 mt-6 italic">
                Schedule your personal interview - Every member is vetted by me personally
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
