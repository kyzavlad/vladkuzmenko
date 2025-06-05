// app/warriors-team/page.tsx
"use client"; 

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image'; // Для изображений
import { ChevronRight, Users, ShieldCheck, MapPin, Tv, MessageCircle, CheckCircle, ThumbsUp, Zap } from 'lucide-react'; // Примерный набор иконок

// Метаданные лучше определять в файле app/warriors-team/layout.tsx (если он есть)
// или оставить статичными в корневом layout.tsx, если это возможно для вашего случая.
// Экспорт metadata из клиентского компонента страницы может не работать так, как ожидается для SEO.
// import { Metadata } from 'next';
// export const metadata: Metadata = {
//   title: 'Warriors Team | VladKuzmenko.com',
//   description: 'Warriors Team is a global network in which exemplars of individualism work to free the modern man from socially induced incarceration.',
// };

// Хелпер для секций (можно вынести в отдельный файл компонентов)
const Section: React.FC<{ id?: string; className?: string; children: React.ReactNode; useContainer?: boolean, fullWidthBg?: boolean }> = ({ id, className, children, useContainer = true, fullWidthBg = false }) => (
  <section id={id} className={`relative ${fullWidthBg ? '' : 'py-16 md:py-24'} ${className}`}>
    {useContainer ? (
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${fullWidthBg ? 'py-16 md:py-24' : ''}`}>
        {children}
      </div>
    ) : (
      <div className={`relative z-10 ${fullWidthBg ? 'py-16 md:py-24' : ''}`}>
        {children}
      </div>
    )}
  </section>
);

// Хелпер для заголовков секций в стиле "The War Room"
const SectionHeader: React.FC<{ title: string; strokeText?: string; description?: string; align?: 'left' | 'center' | 'right' }> = ({ title, strokeText, description, align = 'center'}) => (
  <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : align === 'left' ? 'text-left' : 'text-right'}`}>
    <div className="relative inline-block py-2"> {/* Добавлен padding для strokeText */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white relative z-10 uppercase">
        {title}
      </h2>
      {strokeText && (
        <div 
            className="absolute -top-3 bottom-0 left-1/2 -translate-x-1/2 
                       text-5xl md:text-7xl lg:text-8xl font-black 
                       text-transparent opacity-10 select-none pointer-events-none z-0 uppercase whitespace-nowrap"
            style={{ WebkitTextStroke: `1px rgba(255,255,255,0.1)` }} // Используем более светлый stroke
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
  // useEffect(() => { // Если нужно динамически менять title на клиентской стороне
  //   document.title = 'Warriors Team | VladKuzmenko.com';
  // }, []);

  return (
    // Для этой страницы используется глобальный фон из globals.css (темный градиент + линии)
    // Класс !bg-neutral-950 text-white можно убрать, если глобальный фон из html работает корректно.
    // Оставим его для гарантии темного фона, если что-то пойдет не так с наследованием от html.
    <div className="!bg-neutral-950 text-white selection:bg-red-500/30 min-h-screen relative">
      
      {/* Hero Section */}
      <Section 
        id="hero" 
        className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 pb-12 md:pt-32 md:pb-20" // Увеличен верхний отступ, уменьшен нижний
        useContainer={false} 
      >
        <div className="container mx-auto relative z-10">
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black tracking-tight uppercase mb-4 animate-appear-zoom [animation-delay:200ms]"
            style={{ color: '#FFFFFF', textShadow: '0px 3px 5px rgba(0,0,0,0.3)' }}
          >
            WARRIORS TEAM
          </h1>
          <p 
            className="max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto text-lg md:text-xl lg:text-2xl text-neutral-300 mb-10 leading-relaxed font-light animate-appear [animation-delay:400ms]"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}
          >
            No Great Man in History became Exceptional <em className="font-bold text-white not-italic">alone.</em>
          </p>
          <div className="animate-appear [animation-delay:600ms]">
            <Button 
              asChild 
              size="lg" 
              className="group relative flex items-center gap-2 px-8 py-3 md:px-10 md:py-4 
                         text-sm md:text-base font-bold uppercase tracking-wider
                         !bg-black hover:!bg-neutral-800 !text-white 
                         border-2 !border-black hover:!border-neutral-700
                         rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/checkout"> {/* ЗАМЕНИТЕ ЭТУ ССЫЛКУ НА АКТУАЛЬНУЮ */}
                JOIN <strong className="ml-1 font-bold">THE WARRIORS TEAM</strong>
              </Link>
            </Button>
          </div>
          
          {/* Индикатор скролла */}
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
              0%, 20%, 50%, 80%, 100% { transform: translate(-50%, 0); }
              40% { transform: translate(-50%, 8px); }
              60% { transform: translate(-50%, 4px); }
            }
          `}</style>
        </div>
      </Section>

      {/* Video Section */}
      <Section id="experience-video" className="bg-neutral-900"> {/* Пример фона для секции */}
        <SectionHeader title="EXPERIENCE THE WARRIORS TEAM" strokeText="THE TEAM" />
        <div className="max-w-4xl mx-auto aspect-video bg-black rounded-xl shadow-2xl flex items-center justify-center text-neutral-500 border border-neutral-700">
          {/* ЗАМЕНИТЕ ЭТО НА ВАШ IFRAME ИЛИ ВИДЕОКОМПОНЕНТ */}
          <Tv size={64} className="opacity-50"/>
          <p className="ml-4 text-lg">Placeholder for Introductory Video</p>
          {/* <iframe src="YOUR_VIDEO_URL_HERE" className="w-full h-full rounded-xl" allow="autoplay; encrypted-media" allowFullScreen title="Warriors Team Experience"></iframe> */}
        </div>
      </Section>
      
      {/* Main Intro Text Section */}
      <Section id="manifesto">
          <div className="max-w-3xl mx-auto text-center space-y-6 text-lg md:text-xl leading-relaxed text-neutral-300">
            <p>
              <span className="font-bold text-white">99.9% of modern-day men will never experience the power of Brotherhood and Community.</span>
            </p>
            <p>
              They will never experience what it's like to have other ambitious, hard working, diligent, and dutiful men at their side.
            </p>
            <p>To experience being surrounded by <span className="font-bold text-white">success stories,</span></p>
            <p>To be among the <span className="font-bold text-white">most energetic</span> and <span className="font-bold text-white">purposeful Men in the world.</span></p>
            <p>
              Inside <span className="font-bold text-white">Warriors Team</span> you will access <span className="font-bold text-white">knowledge</span> that will spark your genius and compel you to <span className="font-bold text-white">work your hardest</span> to keep up.
            </p>
            <p>There is no other place on earth with Men of this caliber.</p>
          </div>
      </Section>

      {/* Where is the Warriors Team? Section */}
      <Section id="global-network" className="bg-neutral-900/50 backdrop-blur-sm">
        <SectionHeader 
          title="WHERE IS THE WARRIORS TEAM?" 
          strokeText="EVERYWHERE" 
          description="The globalization of the world has made it critical to be a part of a world-spanning network." 
        />
        <div className="text-center text-neutral-400">
          <Globe size={64} className="mx-auto mb-6 text-brand" />
          <p className="text-lg mb-2">Our network spans continents, connecting motivated individuals worldwide.</p>
          <p className="text-sm">(Placeholder for Image Slider or Interactive Map Showcasing Global Presence / Member Gatherings)</p>
          {/* Если у вас есть компонент слайдера, используйте его здесь */}
        </div>
      </Section>

      {/* Who are our members? Section */}
      <Section id="members">
        <SectionHeader 
          title="WHO ARE OUR MEMBERS?" 
          strokeText="OUR MEMBERS?" 
          description="They were just like you - looking for something more. And within the Warriors Team, they found it." 
        />
        <div className="max-w-4xl mx-auto mb-12">
          {/* ЗАМЕНИТЕ ИЗОБРАЖЕНИЕ */}
          <Image 
            src="https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1c2luZXNzJTIwbmV0d29ya2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
            alt="Warriors Team Members Group" 
            width={1000} 
            height={600} 
            className="rounded-xl shadow-2xl object-cover aspect-video" 
          />
        </div>
        <div className="max-w-3xl mx-auto text-center space-y-6 text-lg md:text-xl text-neutral-300">
          <p><span className="font-bold text-white">Our ongoing Mission</span> is to ceaselessly empower Men like you,</p>
          <p>To become the very best versions of themselves through <span className="font-bold text-white">physical, mental, emotional, spiritual</span>, and <span className="font-bold text-white">financial development</span>.</p>
          <div className="bg-black/30 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-lg border border-neutral-700 mt-8 inline-block">
            <p className="text-xl md:text-2xl font-semibold text-white italic">"We hold that</p>
            <p className="mt-2 text-neutral-200 leading-relaxed">
              <span className="font-bold text-white">ALL Men should be strong, positive, law-abiding citizens</span> who are <span className="font-bold text-white">reliable</span> and <span className="font-bold text-white">dependable</span> for their families, friends, and communities."
            </p>
          </div>
        </div>
      </Section>
      
      {/* "Not Ready?" Section */}
      <Section id="not-ready" className="bg-neutral-900/70 backdrop-blur-sm">
        <SectionHeader 
          title="“I DON'T THINK I AM READY FOR THE WARRIORS TEAM.”" 
          strokeText="NOT READY???" 
        />
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-neutral-300 text-lg leading-relaxed">
            <p className="text-xl font-semibold text-white">I want you to understand something.</p>
            <p><span className="font-bold text-white">NONE</span> of you reading this are ready for the Warriors Team.</p>
            <p><span className="font-bold text-white">NONE</span> of you reading this will truly revolutionize what we have inside.</p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mt-6">If you had that capability, <span className="text-brand">we'd already know who you are.</span></h3>
          </div>
          <div className="text-center">
            {/* ЗАМЕНИТЕ ИЗОБРАЖЕНИЕ */}
            <Image 
              src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVzaW5lc3NtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" 
              alt="Man contemplating a choice" 
              width={500} 
              height={350} 
              className="rounded-xl shadow-xl object-cover aspect-[4/3] mx-auto" 
            />
          </div>
        </div>
        <div className="max-w-4xl mx-auto text-center mt-12 md:mt-16 text-lg md:text-xl text-neutral-300 space-y-6">
            <p className="text-neutral-400">
              - You make 20k a month and have a business you are scaling?<br/>
              - You make 2k a month and are working a job?
            </p>
            <p>Those two levels of money are so similar, so close to each other, that it’s trivial to say there is ANY difference.</p>
            <p>Money is EASY, TRIVIAL in the true realms of POWER.</p>
            <p className="font-bold text-white">NONE of you are worthy of the Warriors Team.<br/>NONE of you are ready.<br/>No member has ever joined “ready”.</p>
            <h3 className="text-3xl font-bold text-white pt-6">You are left with only two options.</h3>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-6">
                <div className="text-center p-4">
                    {/* Placeholder for a "blue pill" type image/icon */}
                    <div className="w-16 h-16 bg-blue-600/20 border-2 border-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center text-blue-400 text-2xl">1</div>
                    <p>Try to become worthy <strong className="text-white">outside</strong></p>
                </div>
                <div className="text-2xl font-bold text-neutral-500">OR</div>
                <div className="text-center p-4">
                    {/* Placeholder for a "red pill" type image/icon */}
                    <div className="w-16 h-16 bg-red-600/20 border-2 border-red-500 rounded-full mx-auto mb-2 flex items-center justify-center text-red-400 text-2xl">2</div>
                    <p>Try to become worthy <strong className="text-brand">inside</strong></p>
                </div>
            </div>
        </div>
      </Section>

      {/* Two Roads Ahead Section */}
      <Section id="two-roads">
        <SectionHeader title="TWO ROADS AHEAD." strokeText="TWO ROADS" />
         <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mb-12">
            <div>
                {/* ЗАМЕНИТЕ ИЗОБРАЖЕНИЕ */}
                <Image 
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3RyYXRlZ3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Strategic Choice" 
                    width={1000} 
                    height={600} 
                    className="rounded-xl shadow-2xl object-cover aspect-video" 
                />
            </div>
            <div className="space-y-4 text-lg text-neutral-300 leading-relaxed">
                <p>
                Over the <span className="font-bold text-white">last years</span>, we have acquired connections for any capability, all over the world.
                </p>
                <p>
                We have <span className="font-bold text-white">a growing number of members worldwide</span>, with <span className="font-bold text-white">specialists, experts,</span> and <span className="font-bold text-white">professionals in every field imaginable.</span>
                </p>
                <p>
                All dedicated to the <span className="font-bold text-white">pursuit of excellence in all areas of life.</span>
                </p>
            </div>
        </div>
        <div className="text-center">
            <p className="text-2xl md:text-3xl font-semibold text-white mb-10">
                After learning all of this, <span className="text-brand">you now have two possible versions of yourself.</span>
            </p>
            <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-neutral-800/50 p-6 rounded-xl shadow-lg border border-neutral-700 flex flex-col items-center">
                    <div className="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center text-neutral-400 text-2xl font-bold mb-4">1</div>
                    <p className="text-lg text-neutral-300 text-center">
                        One who continues playing life alone, without a tribe, and without the means to truly make a difference in his life and others’.
                    </p>
                </div>
                <div className="bg-brand/10 p-6 rounded-xl shadow-lg border border-brand flex flex-col items-center">
                     <div className="w-16 h-16 bg-brand/30 rounded-full flex items-center justify-center text-brand text-2xl font-bold mb-4">2</div>
                    <p className="text-lg text-white text-center">
                        <span className="font-bold">Or one who understands that no great Man ever succeeded without a tribe.</span>
                    </p>
                </div>
            </div>
             <p className="mt-16 text-3xl md:text-4xl font-black text-white uppercase tracking-wider">WHICH VERSION WILL YOU PURSUE?</p>
        </div>
      </Section>

      {/* Testimonials Placeholder Section */}
      <Section id="testimonials-section" className="bg-neutral-900/50 backdrop-blur-md">
        <SectionHeader title="WHAT OUR MEMBERS HAVE ACHIEVED." strokeText="ACHIEVED" />
        <div className="text-center text-neutral-400">
            <ThumbsUp size={64} className="mx-auto mb-6 text-brand" />
            <p className="text-lg mb-2">(Placeholder for Testimonials / Member Achievements Gallery)</p>
            <p className="text-sm">Real stories from real members who transformed their lives within the Warriors Team.</p>
        </div>
      </Section>

      {/* Final CTA Section */}
      <Section id="join-final-cta" className="text-center !pt-12 !pb-20 md:!pt-16 md:!pb-28"> {/* Уменьшенные отступы для последней CTA */}
        <Button 
            asChild 
            size="lg" 
            className="group relative flex items-center gap-3 px-10 py-5 md:px-16 md:py-8 
                       text-lg md:text-2xl font-bold uppercase tracking-wider
                       !bg-black hover:!bg-neutral-800 !text-white 
                       border-2 !border-black hover:!border-neutral-700
                       rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
            <Link href="/checkout"> {/* ЗАМЕНИТЕ ЭТУ ССЫЛКУ */}
                JOIN <strong className="ml-1 font-extrabold">THE WARRIORS TEAM</strong>
                <Zap className="w-6 h-6 opacity-75 group-hover:opacity-100 group-hover:animate-ping" />
            </Link>
        </Button>
      </Section>
    </div>
  );
}
