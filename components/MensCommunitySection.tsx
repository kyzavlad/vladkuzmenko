// app/warriors-team/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Globe } from 'lucide-react'; // Add any other icons you use

export const metadata: Metadata = {
  title: 'Warriors Team | VladKuzmenko.com',
  description: 'Warriors Team is a global network in which exemplars of individualism work to free the modern man from socially induced incarceration.',
  // Add your OpenGraph and Twitter meta tags here
};

// --- SINGLE DEFINITION of VerticalLinesBackground component ---
const VerticalLinesBackground = () => {
  return (
    <div 
      className="fixed inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none"
    >
      <div className="container mx-auto h-full relative">
        <div className="absolute inset-0 grid grid-cols-5 h-full">
          {[...Array(5)].map((_, i) => (
            <div
              key={`vline-${i}`}
              className="h-full w-px bg-white opacity-5" 
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
// --- END OF VerticalLinesBackground DEFINITION ---

const Section: React.FC<{ id?: string; className?: string; children: React.ReactNode; useContainer?: boolean }> = ({ id, className, children, useContainer = true }) => (
  <section id={id} className={`relative ${className}`}>
    {useContainer ? <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">{children}</div> : <div className="relative z-10">{children}</div>}
  </section>
);

export default function WarriorsTeamPage() {
  return (
    <div className="!bg-neutral-950 text-white selection:bg-red-500/30 min-h-screen relative">
      <VerticalLinesBackground /> {/* Using the component */}
      
      {/* Hero Section */}
      <Section 
        id="hero" 
        className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 pb-10 md:pt-24 md:pb-16"
        useContainer={false} 
      >
        {/* ... content of Hero Section ... */}
        <div className="container mx-auto relative z-10">
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black tracking-tight uppercase mb-4"
            style={{ 
              color: '#FFFFFF',
              textShadow: '0px 3px 5px rgba(0,0,0,0.3)'
            }}
          >
            WARRIORS TEAM
          </h1>
          <p 
            className="max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto text-lg md:text-xl lg:text-2xl text-neutral-300 mb-10 leading-relaxed font-light"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}
          >
            No Great Man in History became Exceptional <em className="font-bold text-white not-italic">alone.</em>
          </p>
          <div>
            <Button 
              asChild 
              size="lg" 
              className="group relative flex items-center gap-2 px-8 py-3 md:px-10 md:py-4 
                         text-sm md:text-base font-bold uppercase tracking-wider
                         !bg-black hover:!bg-neutral-800 !text-white 
                         border-2 !border-black hover:!border-neutral-700
                         rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/checkout"> {/* Replace /checkout with your target link */}
                JOIN <strong className="ml-1 font-bold">THE WARRIORS TEAM</strong>
              </Link>
            </Button>
          </div>
          
          <div className="absolute bottom-8 sm:bottom-10 text-center w-full left-0 animate-appear [animation-delay:800ms]">
            <div className="inline-block text-sm text-neutral-400 mb-2">Scroll for more</div>
            <div className="w-5 h-9 border-2 border-neutral-500 rounded-full mx-auto relative">
              <div 
                className="w-1 h-1.5 bg-neutral-400 rounded-full absolute top-2 left-1/2 -translate-x-1/2"
                style={{ animation: `bounceSimple_hero_scroll 1.5s infinite cubic-bezier(0.5, 0, 0.1, 1)` }}
              ></div>
            </div>
          </div>
          <style jsx global>{`
            @keyframes bounceSimple_hero_scroll {
              0%, 20%, 50%, 80%, 100% {
                transform: translate(-50%, 0);
              }
              40% {
                transform: translate(-50%, 8px);
              }
              60% {
                transform: translate(-50%, 4px);
              }
            }
          `}</style>
        </div>
      </Section>

      {/* Other sections */}
      <Section id="next-section-placeholder" className="py-16 md:py-24 min-h-[50vh]">
         <div className="text-center">
            <h2 className="text-4xl font-bold">Next Section (e.g., Video)</h2>
            <p className="text-neutral-300 mt-4">Content for this section.</p>
         </div>
      </Section>
      <Section id="another-section-placeholder" className="py-16 md:py-24 min-h-[50vh] bg-neutral-900"> 
         <div className="text-center">
            <h2 className="text-4xl font-bold">Another Section</h2>
         </div>
      </Section>
    </div>
  );
}
