"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Header } from "@/components/ui/header";

export default function WarriorsTeamPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  useEffect(() => {
    document.title = 'The War Room | Warriors Team';
    // Force dark theme for this page
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="text-white selection:bg-red-500/30 min-h-screen relative bg-black">
      {/* Force dark theme header */}
      <div className="dark">
        <Header />
      </div>
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20">
        <div className="container mx-auto relative z-10 max-w-6xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider mb-8">
            THE WAR ROOM
          </h1>
          <p className="max-w-3xl mx-auto text-xl md:text-2xl lg:text-3xl text-neutral-300 mb-16 leading-relaxed">
            No Great Man in History became<br />
            Exceptional <em className="font-normal text-white not-italic">alone.</em>
          </p>
          
          {/* Video Player */}
          <div className="mt-12 relative max-w-5xl mx-auto">
            <div className="relative bg-black rounded-2xl overflow-hidden aspect-video shadow-2xl border border-neutral-800">
              {!isVideoPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/warroom-video-thumb.jpg"
                    alt="War Room Video Thumbnail"
                    fill
                    className="object-cover"
                  />
                  <button 
                    onClick={() => setIsVideoPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center hover:bg-black/20 transition-colors z-10"
                  >
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                      <Play className="w-10 h-10 text-black ml-2" fill="black" />
                    </div>
                  </button>
                </div>
              ) : (
                <iframe
                  src="https://www.youtube.com/embed/ZEEfv3zrsXk?autoplay=1"
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
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-center mb-16">
            <Button 
              asChild 
              variant="outline"
              className="px-8 py-4 text-lg font-bold tracking-wider bg-black border-2 border-white text-white hover:bg-white hover:text-black transition-all uppercase"
            >
              <Link href="#join">JOIN THE WAR ROOM</Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <Image 
                src="/warroom-group-photo.jpg" 
                alt="War Room Brotherhood"
                width={800}
                height={600}
                className="rounded-xl shadow-2xl w-full"
              />
            </div>
            
            <div className="space-y-8 text-lg md:text-xl">
              <h2 className="text-3xl md:text-4xl font-black leading-tight">
                99.9% of modern-day men will never experience the power
                of Brotherhood and Community.
              </h2>
              
              <div className="space-y-6 text-neutral-300">
                <p>
                  They will never experience what it&apos;s like to have other
                  ambitious, hard working, diligent, and dutiful men at their
                  side.
                </p>
                
                <p>
                  To experience being surrounded by <span className="font-bold text-white">success stories.</span>
                </p>
                
                <p>
                  To be among the <span className="font-bold text-white">most energetic</span> and <span className="font-bold text-white">lucky Men in the world.</span>
                </p>
                
                <div className="pt-4">
                  <p>
                    Inside <span className="font-bold text-white">The War Room</span> you will access <span className="font-bold text-white">knowledge</span> that will
                    spark your genius and compel you to <span className="font-bold text-white">work your hardest</span> to
                    keep up.
                  </p>
                  
                  <p className="mt-6 font-semibold text-white text-xl">
                    There is no other place on earth with Men of this caliber.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-16">
            <div className="w-12 h-24 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
            </div>
          </div>
          <p className="text-center text-neutral-400 mt-4">Scroll for more</p>
        </div>
      </section>

      {/* Global Network Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="text-[200px] font-black text-neutral-500 leading-none text-center">
            THE WAR ROOM?
          </div>
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8">
              WHERE IS THE WAR ROOM?
            </h2>
            <p className="text-3xl md:text-4xl font-bold mb-4">Everywhere.</p>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              The globalization of the world has made it critical to<br />
              be a part of a world-spanning network.
            </p>
          </div>
          
          {/* Photo Collage */}
          <div className="grid grid-cols-6 gap-1 max-w-6xl mx-auto mb-16">
            <Image src="/warroom-location-1.jpg" alt="Location 1" width={200} height={150} className="col-span-2 h-40 w-full object-cover" />
            <Image src="/warroom-location-2.jpg" alt="Location 2" width={200} height={150} className="h-40 w-full object-cover" />
            <Image src="/warroom-location-3.jpg" alt="Location 3" width={200} height={150} className="h-40 w-full object-cover" />
            <Image src="/warroom-location-4.jpg" alt="Location 4" width={200} height={150} className="col-span-2 h-40 w-full object-cover" />
            <Image src="/warroom-location-5.jpg" alt="Location 5" width={200} height={150} className="h-40 w-full object-cover" />
            <Image src="/warroom-location-6.jpg" alt="Location 6" width={200} height={150} className="col-span-2 h-40 w-full object-cover" />
            <Image src="/warroom-location-7.jpg" alt="Location 7" width={200} height={150} className="h-40 w-full object-cover" />
            <Image src="/warroom-location-8.jpg" alt="Location 8" width={200} height={150} className="col-span-2 h-40 w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Disinformation Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16 space-y-8">
            <p className="text-xl md:text-2xl">
              <span className="font-bold">Disinformation is rampant.</span> The Post-Truth era requires<br />
              trusted eyes on the ground to accurately assess crises and<br />
              opportunities.
            </p>
            
            <p className="text-xl md:text-2xl">
              In an <span className="font-bold">online, world-wide economy</span>, accurate local<br />
              knowledge becomes extremely valuable, whether for<br />
              <span className="font-bold">investment opportunities</span> or simply knowing the best place<br />
              to live for you and your family.
            </p>
            
            <p className="text-xl md:text-2xl">
              <span className="font-bold">The War Room</span> network gives you <span className="font-bold">access to thousands</span> of<br />
              well trained eyes looking out for your interests. A <span className="font-bold">network</span><br />
              with wide-ranging perspectives and capabilities; each<br />
              member aspiring and succeeding at becoming a <span className="font-bold">great<br />
              man.</span>
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mt-20">
            <div className="relative">
              <Image 
                src="/warroom-discussion.jpg" 
                alt="War Room Discussion"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl w-full"
              />
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Landed in Singapore and want to know what to<br />
                  look out for when investing in real estate?
                </h3>
                <p className="text-xl text-neutral-300">
                  Speak to a man who has been in Singapore Real Estate for<br />
                  <span className="font-bold text-white">20 years.</span>
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Want to know how members of your business<br />
                  industry have found applications for AI?
                </h3>
                <p className="text-xl text-neutral-300">
                  Speak to an industry insider who knows the founder.
                </p>
              </div>
              
              <Button 
                asChild 
                variant="outline"
                className="px-8 py-4 text-lg font-bold tracking-wider bg-black border-2 border-white text-white hover:bg-white hover:text-black transition-all uppercase inline-flex"
              >
                <Link href="#join">JOIN THE WAR ROOM</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Members Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="text-[180px] font-black text-neutral-500 leading-none text-center">
            OUR MEMBERS?
          </div>
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8">
              WHO ARE OUR MEMBERS?
            </h2>
            <p className="text-3xl md:text-4xl font-bold mb-4">
              They were just like you -<br />
              looking for something more.
            </p>
            <p className="text-xl text-neutral-300">
              And within <span className="font-bold text-white">the War Room</span>, they found it.
            </p>
          </div>
          
          <div className="relative max-w-6xl mx-auto mb-16">
            <Image 
              src="/warroom-members-lounge.jpg" 
              alt="War Room Members"
              width={1200}
              height={600}
              className="rounded-xl shadow-2xl w-full"
            />
          </div>
          
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl">
              <span className="font-bold">Our ongoing Mission</span> is to ceaselessly empower Men like<br />
              you,
            </p>
            
            <p className="text-xl md:text-2xl">
              To become the very best versions of themselves through<br />
              <span className="font-bold">physical, mental, emotional, spiritual</span>, and <span className="font-bold">financial<br />
              development</span>.
            </p>
            
            <p className="text-xl md:text-2xl italic mt-12">
              We hold that
            </p>
            
            <p className="text-xl md:text-2xl">
              <span className="font-bold">ALL Men should be strong, positive, law-abiding citizens</span><br />
              who are <span className="font-bold">reliable</span> and <span className="font-bold">dependable</span> for their families, friends,<br />
              and communities.
            </p>
            
            <div className="flex justify-center mt-16">
              <Button 
                asChild 
                variant="outline"
                className="px-8 py-4 text-lg font-bold tracking-wider bg-black border-2 border-white text-white hover:bg-white hover:text-black transition-all uppercase"
              >
                <Link href="#join">JOIN THE WAR ROOM</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Not Ready Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="text-[140px] font-black text-neutral-500 leading-none text-center">
            NOT READY???
          </div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-16">
              "I DON'T THINK I AM READY<br />
              FOR THE WAR ROOM."
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8 text-xl">
              <p className="font-semibold">I want you to understand something.</p>
              
              <p>
                <span className="font-bold">NONE</span> of you reading this are ready for the War<br />
                Room.
              </p>
              
              <p>
                <span className="font-bold">NONE</span> of you reading this will truly revolutionize<br />
                what we have inside.
              </p>
              
              <p className="text-2xl font-bold">
                If you had that capability, we'd<br />
                already know who you are..
              </p>
              
              <div className="mt-12">
                <p className="text-2xl font-bold mb-8">You are left with only two options.</p>
                
                <div className="flex items-center gap-8 mb-8">
                  <div className="flex items-center gap-4">
                    <Image src="/icon-hand-up.png" alt="Outside" width={60} height={60} />
                    <p className="text-xl">Try to become worthy <em>outside</em></p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-4">
                    <Image src="/icon-hand-shake.png" alt="Inside" width={60} height={60} />
                    <p className="text-xl">Try to become worthy <em className="font-bold not-italic">inside</em></p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Image 
                src="/warroom-yacht-meeting.jpg" 
                alt="War Room Meeting"
                width={700}
                height={500}
                className="rounded-xl shadow-2xl w-full"
              />
            </div>
          </div>
          
          <div className="space-y-8 text-xl max-w-4xl mx-auto">
            <p className="font-bold">- You make 20k a month and have a business you<br />
            are scaling?</p>
            
            <p className="font-bold">- You make 2k a month and are working a job?</p>
            
            <p>
              Those two levels of money are so similar, so close to each<br />
              other, that it's trivial to say there is ANY difference.
            </p>
            
            <p className="mt-8">
              Money is EASY, TRIVIAL in the true realms of POWER.
            </p>
            
            <p>You think $1 million is impressive??</p>
            
            <p className="font-bold">
              NONE of you are worthy of the War Room<br />
              NONE of you are ready<br />
              No member has ever joined "ready".
            </p>
            
            <div className="flex justify-center mt-16">
              <Button 
                asChild 
                variant="outline"
                className="px-8 py-4 text-lg font-bold tracking-wider bg-black border-2 border-white text-white hover:bg-white hover:text-black transition-all uppercase"
              >
                <Link href="#join">JOIN THE WAR ROOM</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-4 relative min-h-screen flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div className="text-[200px] font-black text-neutral-500 leading-none text-center">
            TWO ROADS AHEAD.
          </div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-center mb-16">
            TWO ROADS AHEAD.
          </h2>
          
          <div className="max-w-4xl mx-auto mb-16">
            <Image 
              src="/warroom-leaders.jpg" 
              alt="War Room Leaders"
              width={800}
              height={400}
              className="w-full rounded-xl shadow-2xl mb-12"
            />
            
            <div className="text-center space-y-6 text-xl">
              <p>
                We have <span className="font-bold">over 3,500 members worldwide</span>, with<br />
                <span className="font-bold">specialists, experts</span>, and <span className="font-bold">professionals in every<br />
                field imaginable.</span>
              </p>
              
              <p>
                All dedicated to the <span className="font-bold">pursuit of excellence in all<br />
                areas of life.</span>
              </p>
              
              <p className="text-2xl md:text-3xl font-bold mt-12 mb-16">
                After learning all of this, you now have<br />
                two possible versions of yourself.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold">1</span>
              </div>
              <p className="text-lg">
                One who continues playing life alone,<br />
                without a tribe, and without the<br />
                means to truly make a difference in<br />
                his life and others'.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border-4 border-orange-500 flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold">2</span>
              </div>
              <p className="text-lg font-bold">
                Or one who understands that no<br />
                great Man ever succeeded without<br />
                a tribe.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-black mb-12 uppercase tracking-wider">
              WHICH VERSION WILL YOU PURSUE?
            </h3>
            
            <Button 
              asChild 
              size="lg"
              className="px-12 py-6 text-xl font-black tracking-wider bg-black border-4 border-white text-white hover:bg-white hover:text-black transition-all uppercase"
            >
              <Link href="#join" id="join">
                JOIN THE WAR ROOM
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
