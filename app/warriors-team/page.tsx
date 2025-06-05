// app/warriors-team/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Убедитесь, что путь к кнопке верный
import { ChevronRight, ShieldCheck, Users, Zap, BarChart, Globe, MessageSquareHeart, ThumbsUp } from 'lucide-react'; // Иконки

export const metadata: Metadata = {
  title: 'Warriors Team | VladKuzmenko.com', // Адаптируйте по необходимости
  description: 'Warriors Team is a global network in which exemplars of individualism work to free the modern man from socially induced incarceration.',
};

// Компонент для сеточного фона
const GridBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full bg-background">
        {/* Вертикальные линии */}
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-foreground/5"></div>
        <div className="absolute inset-y-0 left-1/4 w-px -translate-x-1/2 bg-foreground/5"></div>
        <div className="absolute inset-y-0 left-3/4 w-px -translate-x-1/2 bg-foreground/5"></div>
        {/* Горизонтальные линии (можно добавить больше, если нужно) */}
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-foreground/5"></div>
        <div className="absolute inset-x-0 top-1/4 h-px -translate-y-1/2 bg-foreground/5"></div>
        <div className="absolute inset-x-0 top-3/4 h-px -translate-y-1/2 bg-foreground/5"></div>
        {/* Можно использовать более сложный паттерн с Tailwind или SVG, если хотите */}
      </div>
    </div>
  );
};


// Хелпер для секций
const Section: React.FC<{ id?: string; className?: string; children: React.ReactNode; useContainer?: boolean }> = ({ id, className, children, useContainer = true }) => (
  <section id={id} className={`py-16 md:py-24 relative ${className}`}>
    {useContainer ? <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">{children}</div> : <div className="relative z-10">{children}</div>}
  </section>
);

// Хелпер для заголовков секций в стиле "The War Room"
const SectionHeader: React.FC<{ title: string; strokeText?: string; description?: string; align?: 'left' | 'center' | 'right' }> = ({ title, strokeText, description, align = 'center'}) => (
  <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : align === 'left' ? 'text-left' : 'text-right'}`}>
    <div className="relative inline-block">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground relative z-10">
        {title.toUpperCase()}
      </h2>
      {strokeText && (
        <div className="absolute -top-2 -bottom-2 -left-4 -right-4 md:-top-3 md:-bottom-3 md:-left-6 md:-right-6 text-5xl md:text-6xl lg:text-7xl font-bold text-foreground/5 whitespace-nowrap z-0" style={{ WebkitTextStroke: `1px hsla(var(--foreground-rgb), 0.05)` }}>
          {strokeText.toUpperCase()}
        </div>
      )}
    </div>
    {description && (
      <p className={`mt-4 text-lg md:text-xl text-muted-foreground ${align === 'center' ? 'max-w-3xl mx-auto' : 'max-w-3xl'}`}>
        {description}
      </p>
    )}
  </div>
);


export default function WarriorsTeamPage() {
  // Тексты взяты и адаптированы из примера "The War Room.htm"
  // ЗАМЕНИТЕ ИЗОБРАЖЕНИЯ НА СВОИ!

  return (
    <div className="bg-background text-foreground selection:bg-brand/20">
      <GridBackground /> {/* Добавляем фон на всю страницу */}
      
      {/* Hero Section */}
      <Section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center pt-20 md:pt-24">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 animate-appear-zoom [animation-delay:200ms]">
          WARRIORS TEAM
        </h1>
        <p 
          className="max-w-3xl mx-auto text-lg md:text-xl lg:text-2xl text-muted-foreground mb-10 animate-appear [animation-delay:400ms]"
          style={{ textShadow: '0 1px 2px hsla(var(--background-rgb), 0.5)'}} // Для лучшей читаемости на фоне
        >
          No Great Man in History became Exceptional <span className="font-bold text-foreground">alone.</span>
        </p>
        <div className="animate-appear [animation-delay:600ms]">
          <Button asChild size="lg" className="group relative flex items-center gap-2 px-10 py-6 text-lg bg-brand hover:bg-brand/80 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
            <Link href="#join"> {/* Измените на /checkout или другую страницу при необходимости */}
              JOIN <span className="font-bold ml-1">THE WARRIORS TEAM</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        {/* Placeholder for scroll indicator if needed, like in the example */}
        <div className="absolute bottom-10 text-sm text-muted-foreground animate-appear [animation-delay:800ms]">Scroll for more</div>
      </Section>

      {/* Video Section Placeholder (как в примере) */}
      <Section id="introduction-video">
        <SectionHeader title="EXPERIENCE THE WARRIORS TEAM" strokeText="THE TEAM?" />
        <div className="max-w-4xl mx-auto aspect-video bg-neutral-800 rounded-xl shadow-2xl flex items-center justify-center text-muted-foreground">
          {/* Замените это на ваш iframe с видео или компонент видеоплеера */}
          <p>(Placeholder for Introductory Video)</p>
          {/* <iframe src="YOUR_VIDEO_URL" className="w-full h-full rounded-xl" allow="autoplay; encrypted-media" allowFullScreen></iframe> */}
        </div>
      </Section>
      
      {/* Main Intro Text Section */}
      <Section id="manifesto">
          <div className="max-w-3xl mx-auto text-center space-y-6 text-lg md:text-xl leading-relaxed text-muted-foreground">
            <p>
              <span className="font-bold text-foreground">99.9% of modern-day men will never experience the power of Brotherhood and Community.</span>
            </p>
            <p>
              They will never experience what it's like to have other ambitious, hard working, diligent, and dutiful men at their side.
            </p>
            <p>To experience being surrounded by <span className="font-bold text-foreground">success stories,</span></p>
            <p>To be among the <span className="font-bold text-foreground">most energetic</span> and <span className="font-bold text-foreground">purposeful Men in the world.</span></p>
            <p>
              Inside <span className="font-bold text-foreground">Warriors Team</span> you will access <span className="font-bold text-foreground">knowledge</span> that will spark your genius and compel you to <span className="font-bold text-foreground">work your hardest</span> to keep up.
            </p>
            <p>There is no other place on earth with Men of this caliber.</p>
          </div>
      </Section>

      {/* Where is the Warriors Team? Section */}
      <Section id="global-network" className="bg-card">
        <SectionHeader title="WHERE IS THE WARRIORS TEAM?" strokeText="EVERYWHERE" description="The globalization of the world has made it critical to be a part of a world-spanning network." />
        {/* Placeholder for image slider - замените на реальный слайдер или галерею */}
        <div className="text-center text-muted-foreground">
          <Globe size={48} className="mx-auto mb-4 text-brand" />
          <p>(Placeholder for Image Slider Showcasing Global Presence / Member Gatherings)</p>
          <p className="mt-2 text-sm">Our network spans continents, connecting motivated individuals worldwide.</p>
        </div>
      </Section>

      {/* Who are our members? Section */}
      <Section id="members">
        <SectionHeader title="WHO ARE OUR MEMBERS?" strokeText="OUR MEMBERS?" description="They were just like you - looking for something more. And within the Warriors Team, they found it." />
        {/* Placeholder for a representative image */}
        <div className="max-w-4xl mx-auto mb-12">
          <Image 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JvdXAlMjBvZCUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
            alt="Warriors Team Members" 
            width={1000} 
            height={600} 
            className="rounded-xl shadow-2xl object-cover aspect-video" 
          />
        </div>
        <div className="max-w-3xl mx-auto text-center space-y-4 text-lg md:text-xl text-muted-foreground">
          <p><span className="font-bold text-foreground">Our ongoing Mission</span> is to ceaselessly empower Men like you,</p>
          <p>To become the very best versions of themselves through <span className="font-bold text-foreground">physical, mental, emotional, spiritual</span>, and <span className="font-bold text-foreground">financial development</span>.</p>
          <div className="bg-card p-6 rounded-xl shadow-lg border border-border mt-8 inline-block">
            <p className="text-xl font-semibold text-foreground">We hold that</p>
            <p className="mt-2 text-muted-foreground">
              <span className="font-bold text-foreground">ALL Men should be strong, positive, law-abiding citizens</span> who are <span className="font-bold text-foreground">reliable</span> and <span className="font-bold text-foreground">dependable</span> for their families, friends, and communities.
            </p>
          </div>
        </div>
      </Section>
      
      {/* "Not Ready?" Section (как в примере) */}
      <Section id="not-ready" className="bg-card">
        <SectionHeader title="“I DON'T THINK I AM READY FOR THE WARRIORS TEAM.”" strokeText="NOT READY???" />
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-muted-foreground"><span className="font-bold text-foreground">I want you to understand something.</span></p>
            <p className="text-muted-foreground">NONE of you reading this are ready for the Warriors Team.</p>
            <p className="text-muted-foreground">NONE of you reading this will truly revolutionize what we have inside.</p>
            <h3 className="text-2xl font-semibold text-foreground mt-6">If you had that capability, <span className="text-brand">we'd already know who you are.</span></h3>
          </div>
          <div className="text-center">
             {/* Placeholder Image */}
            <Image 
              src="https://images.unsplash.com/photo-1503437313881-503a91226c02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNoYWxsZW5nZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" 
              alt="Challenge Concept" 
              width={500} 
              height={350} 
              className="rounded-xl shadow-xl object-cover aspect-video mx-auto" 
            />
          </div>
        </div>
        <div className="max-w-3xl mx-auto text-center mt-12 md:mt-16 text-lg md:text-xl text-muted-foreground space-y-4">
            <p>Those two levels of money are so similar, so close to each other, that it’s trivial to say there is ANY difference.</p>
            <p>Money is EASY, TRIVIAL in the true realms of POWER.</p>
            <p>NONE of you are worthy of the Warriors Team.<br/>NONE of you are ready.<br/>No member has ever joined “ready”.</p>
            <h3 className="text-2xl font-semibold text-foreground pt-4">You are left with only two options.</h3>
            <p className="text-muted-foreground">Try to become worthy <strong className="text-foreground">outside</strong>, or try to become worthy <strong className="text-brand">inside</strong>.</p>
        </div>
      </Section>

      {/* Two Roads Ahead Section */}
      <Section id="two-roads">
        <SectionHeader title="TWO ROADS AHEAD." strokeText="TWO ROADS" />
         <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
            <div>
                {/* Placeholder Image */}
                <Image 
                    src="https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmV0d29ya3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Network and Connections" 
                    width={1000} 
                    height={600} 
                    className="rounded-xl shadow-2xl object-cover aspect-video" 
                />
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground">
                Over the <span className="font-bold text-foreground">last years</span>, we have acquired connections for any capability, all over the world.
                </p>
                <p className="text-muted-foreground">
                We have <span className="font-bold text-foreground">a growing number of members worldwide</span>, with <span className="font-bold text-foreground">specialists, experts,</span> and <span className="font-bold text-foreground">professionals in every field imaginable.</span>
                </p>
                <p className="text-muted-foreground">
                All dedicated to the <span className="font-bold text-foreground">pursuit of excellence in all areas of life.</span>
                </p>
            </div>
        </div>
        <div className="text-center">
            <p className="text-2xl md:text-3xl font-semibold text-foreground mb-8">
                After learning all of this, <span className="text-brand">you now have two possible versions of yourself.</span>
            </p>
            <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
                    <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-lg text-muted-foreground">
                        One who continues playing life alone, without a tribe, and without the means to truly make a difference in his life and others’.
                    </p>
                </div>
                <div className="bg-brand/5 p-6 rounded-xl shadow-lg border border-brand">
                    <ShieldCheck className="w-10 h-10 text-brand mx-auto mb-3" />
                    <p className="text-lg text-foreground">
                        <span className="font-bold">Or one who understands that no great Man ever succeeded without a tribe.</span>
                    </p>
                </div>
            </div>
             <p className="mt-12 text-3xl md:text-4xl font-bold text-foreground">WHICH VERSION WILL YOU PURSUE?</p>
        </div>
      </Section>

      {/* Testimonials Placeholder Section */}
      <Section id="testimonials-section" className="bg-card">
        <SectionHeader title="WHAT OUR MEMBERS HAVE ACHIEVED." strokeText="ACHIEVED" />
        <div className="text-center text-muted-foreground">
            <ThumbsUp size={48} className="mx-auto mb-4 text-brand" />
            <p>(Placeholder for Testimonials / Member Achievements Gallery)</p>
            <p className="mt-2 text-sm">Real stories from real members who transformed their lives.</p>
        </div>
      </Section>

      {/* Final CTA Section */}
      <Section id="join" className="text-center">
        <Button asChild size="lg" className="group relative flex items-center gap-2 px-12 py-8 text-xl md:text-2xl bg-brand hover:bg-brand/80 text-primary-foreground shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
          <Link href="/contact"> {/* Замените на вашу страницу регистрации или контактов */}
            JOIN <span className="font-bold ml-1">THE WARRIORS TEAM</span>
            <Zap className="w-6 h-6 group-hover:animate-ping" />
          </Link>
        </Button>
      </Section>
    </div>
  );
}
