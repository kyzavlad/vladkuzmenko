"use client"; 

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Play, Scroll, Globe, Users, Target, Zap, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Header } from "@/components/ui/header";

// Хелпер для секций
const Section = ({ id, className = "", children, useContainer = true, sectionClassName = "" }) => (
  <section id={id} className={`relative ${sectionClassName} ${useContainer ? 'py-16 md:py-24' : ''} ${className}`}>
    {useContainer ? (
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10`}>
        {children}
      </div>
    ) : (
      <div className={`relative z-10`}>
        {children}
      </div>
    )}
  </section>
);

// Хелпер для заголовков секций
const SectionHeader = ({ title, strokeText, description, align = 'center'}) => (
  <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : align === 'left' ? 'text-left' : 'text-right'}`}>
    <div className="relative inline-block py-2">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white relative z-10 uppercase">
        {title}
      </h2>
      {strokeText && (
        <div 
            className="absolute -top-3 bottom-0 left-1/2 -translate-x-1/2 text-5xl md:text-7xl lg:text-8xl font-black text-transparent opacity-10 select-none pointer-events-none z-0 uppercase whitespace-nowrap"
            style={{ WebkitTextStroke: `1px rgba(255,255,255,0.1)` }}
        >
          {strokeText}
        </div>
      )}
    </div>
    {description && (
      <p className={`mt-4 text-lg md:text-xl text-neutral-300 ${align === 'center' ? 'max-w-3xl mx-auto' : 'max-w-3xl'}`}>
        {description}
      </p>
    )}
  </div>
);

export default function WarriorsTeamPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  useEffect(() => {
    document.title = 'Warriors Team | VladKuzmenko.com';
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="text-white selection:bg-red-500/30 min-h-screen relative">
      <Header />
      
      {/* Hero Section */}
      <Section 
        id="hero" 
        className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 pb-12 md:pt-32 md:pb-20"
        useContainer={false} 
      >
        <div className="container mx-auto relative z-10">
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[120px] font-black tracking-wider uppercase mb-6 animate-appear-zoom"
            style={{ color: '#FFFFFF', textShadow: '0px 4px 8px rgba(0,0,0,0.4)', animationDelay: '200ms' }}
          >
            THE WARRIORS TEAM
          </h1>
          <p 
            className="max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto text-lg md:text-xl lg:text-2xl text-neutral-300 mb-10 leading-relaxed font-light animate-appear"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)', animationDelay: '400ms' }}
          >
            No Great Leader in History achieved Excellence <em className="font-bold text-white not-italic">alone.</em>
          </p>
          
          {/* Video Placeholder */}
          <div className="mt-16 relative max-w-4xl mx-auto animate-appear" style={{ animationDelay: '600ms' }}>
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
                ></iframe>
              )}
            </div>
          </div>
          
          {/* Scroll indicator */}
          <button
            onClick={scrollToNext}
            className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 animate-appear"
            style={{ animationDelay: '800ms' }}
          >
            <div className="text-sm text-neutral-400 mb-2">Scroll for more</div>
            <div className="w-5 h-9 border-2 border-neutral-500 rounded-full mx-auto relative">
              <div 
                className="w-1 h-1.5 bg-neutral-400 rounded-full absolute top-2 left-1/2 -translate-x-1/2 animate-bounce"
              ></div>
            </div>
          </button>
        </div>
      </Section>

      {/* Brotherhood Section */}
      <Section id="brotherhood" className="py-16 md:py-24">
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
              They will never know what it's like to have other
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
      </Section>

      {/* Global Network Section */}
      <Section id="global-network" sectionClassName="bg-black/20 backdrop-blur-sm py-16 md:py-24">
        <SectionHeader 
          title="WHERE IS THE WARRIORS TEAM?" 
          strokeText="EVERYWHERE" 
        />
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          ))}
        </div>
      </Section>

      {/* Information Network Section */}
      <Section id="information-network" className="py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-lg md:text-xl text-neutral-300">
            <p>
              <span className="font-bold text-white">Misinformation is everywhere.</span> The modern era demands
              trusted insights from the field to accurately evaluate risks and
              opportunities.
            </p>
            
            <p>
              In an <span className="font-bold text-white">interconnected, global marketplace</span>, accurate insider
              intelligence becomes invaluable, whether for
              <span className="font-bold text-white"> strategic opportunities</span> or simply identifying the optimal location
              for you and your enterprise.
            </p>
            
            <p>
              <span className="font-bold text-white">The Warriors Team</span> network provides you <span className="font-bold text-white">access to thousands</span> of
              highly skilled professionals monitoring your interests. A <span className="font-bold text-white">network</span>
              with diverse expertise and capabilities; each
              member driven and succeeding at becoming an <span className="font-bold text-white">exceptional
              leader.</span>
            </p>
          </div>
          
          <div className="space-y-8 bg-neutral-900/50 backdrop-blur-sm p-8 rounded-xl border border-neutral-800">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                Expanding into Singapore and need insider knowledge on market dynamics?
              </h3>
              <p className="text-neutral-400">
                Connect with a member who has navigated Singapore's business landscape for
                <span className="font-bold text-white"> two decades.</span>
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                Want to discover how leaders in your sector are leveraging AI?
              </h3>
              <p className="text-neutral-400">
                Speak with an industry pioneer who has direct experience with the innovators.
              </p>
            </div>
            
            <Button 
              asChild 
              size="lg" 
              className="w-full md:w-auto group relative flex items-center gap-2 px-8 py-3 
                         text-sm md:text-base font-bold uppercase tracking-wider
                         bg-black hover:bg-neutral-800 text-white 
                         border-2 border-black hover:border-neutral-700
                         rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="https://cal.com/vladkuzmenko.com/call">
                SCHEDULE YOUR INTERVIEW
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Members Section */}
      <Section id="members" sectionClassName="bg-black/20 backdrop-blur-sm py-16 md:py-24">
        <SectionHeader 
          title="WHO ARE OUR MEMBERS?" 
          strokeText="OUR MEMBERS" 
        />
        
        <div className="text-center mb-12">
          <p className="text-2xl md:text-3xl font-bold mb-4">
            They were just like you –<br />
            seeking something greater.
          </p>
          
          <p className="text-xl text-neutral-300">
            And within <span className="font-bold text-white">the Warriors Team</span>, they discovered it.
          </p>
        </div>
        
        <div className="relative mb-16 max-w-5xl mx-auto">
          <Image 
            src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=1200" 
            alt="Warriors Team gathering"
            width={1200}
            height={600}
            className="w-full rounded-xl shadow-2xl"
          />
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <p className="text-xl text-neutral-300">
            <span className="font-bold text-white">Our relentless Mission</span> is to continuously empower Leaders like
            you,
          </p>
          
          <p className="text-xl text-neutral-300">
            To achieve the absolute best versions of themselves through
            <span className="font-bold text-white"> physical, mental, emotional, spiritual</span>, and <span className="font-bold text-white">financial
            growth</span>.
          </p>
          
          <div className="bg-black/40 backdrop-blur-md p-8 rounded-xl shadow-lg border border-neutral-700 mt-12 inline-block">
            <p className="text-2xl font-bold italic mb-4 text-white">We believe that</p>
            
            <p className="text-lg md:text-xl text-neutral-200">
              <span className="font-bold text-white">ALL Leaders should be strong, principled, ethical professionals</span><br />
              who are <span className="font-bold text-white">reliable</span> and <span className="font-bold text-white">trustworthy</span> for their teams, partners,<br />
              and communities.
            </p>
          </div>
          
          <div className="pt-8">
            <Button 
              asChild 
              size="lg" 
              className="group relative flex items-center gap-2 px-8 py-4 
                         text-base md:text-lg font-bold uppercase tracking-wider
                         bg-black hover:bg-neutral-800 text-white 
                         border-2 border-black hover:border-neutral-700
                         rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="https://cal.com/vladkuzmenko.com/call">
                APPLY FOR THE WARRIORS TEAM
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Not Ready Section */}
      <Section id="not-ready" className="py-16 md:py-24">
        <SectionHeader 
          title=""I DON'T THINK I'M READY FOR THE WARRIORS TEAM."" 
          strokeText="NOT READY???" 
        />
        
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <div className="space-y-6 text-lg text-neutral-300">
            <p className="text-2xl font-bold text-white">
              I need you to understand something.
            </p>
            
            <p className="text-xl">
              <span className="font-bold text-white">NONE</span> of you reading this are ready for the Warriors
              Team.
            </p>
            
            <p className="text-xl">
              <span className="font-bold text-white">NONE</span> of you reading this will truly transform
              what we have inside.
            </p>
            
            <p className="text-2xl font-bold text-white mt-8">
              If you had that capability, <span className="text-brand">we'd
              already know who you are..</span>
            </p>
            
            <div className="py-12">
              <p className="text-2xl font-bold mb-8 text-white">
                You are left with only two choices.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="text-neutral-500">Try to become exceptional</span>
                  <span className="text-xl italic font-bold text-white">outside</span>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path d="M20,50 L40,30 L60,50 L80,30" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  
                  <div className="text-center px-8">
                    <span className="text-xl">Try to become exceptional</span>
                    <span className="text-xl italic font-bold text-brand"> inside</span>
                  </div>
                  
                  <div className="w-20 h-20 relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path d="M20,30 L40,50 L60,30 L80,50" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <Image 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600" 
              alt="Success meeting"
              width={600}
              height={400}
              className="w-full rounded-xl shadow-2xl"
            />
            
            <div className="space-y-4 text-neutral-400">
              <p className="text-lg">
                <span className="font-bold text-white">– You make 20k monthly with a growing business?</span>
              </p>
              
              <p className="text-lg">
                <span className="font-bold text-white">– You make 2k monthly working for someone else?</span>
              </p>
              
              <p className="text-lg">
                Those two income levels are so similar, so close to each
                other, that it's meaningless to say there is ANY distinction.
              </p>
              
              <p className="text-lg">
                Money is SIMPLE, TRIVIAL in the true spheres of INFLUENCE.
              </p>
              
              <p className="text-lg">
                You think $1 million is remarkable??
              </p>
              
              <p className="text-lg font-bold text-white">
                NONE of you are ready for the Warriors Team<br />
                NONE of you are prepared<br />
                No member has ever joined "prepared".
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Final CTA Section */}
      <Section id="two-roads" sectionClassName="bg-gradient-to-b from-neutral-900/20 to-black py-16 md:py-24">
        <SectionHeader 
          title="TWO PATHS FORWARD." 
          strokeText="TWO PATHS" 
        />
        
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
                  their life and others'.
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
      </Section>
    </div>
  );
}
