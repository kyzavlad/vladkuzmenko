// app/warriors-team/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Globe } from 'lucide-react'; // Добавьте другие иконки, если они используются в ПОЛНОМ коде страницы

export const metadata: Metadata = {
  title: 'Warriors Team | VladKuzmenko.com',
  description: 'Warriors Team is a global network in which exemplars of individualism work to free the modern man from socially induced incarceration.',
  // ЗАМЕНИТЕ НА ВАШИ РЕАЛЬНЫЕ OpenGraph и Twitter мета-теги, если нужно
  openGraph: { 
    title: 'Warriors Team',
    description: 'Warriors Team is a global network...',
    images: [{ url: 'https://your-domain.com/images/warriors-team-og-image.png' }] 
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Warriors Team',
    description: 'Warriors Team is a global network...',
    images: ['https://your-domain.com/images/warriors-team-twitter-image.png']
  },
};

// --- ЕДИНСТВЕННОЕ ОПРЕДЕЛЕНИЕ VerticalLinesBackground ---
const VerticalLinesBackground = () => {
  return (
    <div 
      className="fixed inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none"
      // Этот компонент теперь не задает сплошной фон, только линии.
      // Основной цвет фона страницы будет задаваться на корневом div страницы или в globals.css на html/body.
    >
      {/* Вариант с линиями, распределенными по ширине контейнера */}
      <div className="container mx-auto h-full relative"> {/* Линии будут в пределах контейнера */}
        <div className="absolute inset-0 grid grid-cols-5 h-full"> {/* 5 колонок = 4 внутренние + 2 по краям если учитывать границы */}
          {[...Array(5)].map((_, i) => ( // Создаем 5 линий
            <div
              key={`vline-container-${i}`}
              // Каждая линия будет справа от соответствующей колонки грида.
              // Чтобы получить 5 видимых равноотстоящих линий, включая края,
              // лучше использовать flex justify-around как было в одном из предыдущих вариантов,
              // или CSS градиенты на родительском элементе.
              // Этот вариант создаст линии на границах колонок.
              // Для эффекта Webflow, где линии - это сами элементы grid:
              className="h-full w-px bg-white opacity-[0.04]" // Очень тонкие и прозрачные белые линии
            ></div>
          ))}
        </div>
      </div>
      {/* Альтернативный вариант: линии на всю ширину экрана, а не только в контейнере */}
      {/* <div className="absolute inset-0 flex justify-around opacity-50 pointer-events-none">
          {[...Array(5)].map((_, i) => (
              <div key={`vline-fullwidth-${i}`} className="h-full w-px bg-white/5"></div> // bg-white/5 = opacity-5
          ))}
      </div> */}
    </div>
  );
};
// --- КОНЕЦ ОПРЕДЕЛЕНИЯ VerticalLinesBackground ---


// Хелпер для секций
const Section: React.FC<{ id?: string; className?: string; children: React.ReactNode; useContainer?: boolean }> = ({ id, className, children, useContainer = true }) => (
  <section id={id} className={`relative ${className}`}> {/* Убраны общие py-16 md:py-24, чтобы задавать их индивидуально */}
    {useContainer ? <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">{children}</div> : <div className="relative z-10">{children}</div>}
  </section>
);

export default function WarriorsTeamPage() {
  return (
    // Основной фон страницы (темный) и цвет текста (светлый)
    // !bg-neutral-950 и !text-white с !important для переопределения возможных стилей темы
    <div className="!bg-neutral-950 !text-white selection:bg-red-500/30 min-h-screen relative">
      <VerticalLinesBackground /> {/* Используем компонент фона */}
      
      {/* Hero Section - Стилизация под скриншот "The War Room" */}
      <Section 
        id="hero" 
        className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 pb-10 md:pt-24 md:pb-16"
        useContainer={false} // Hero секция будет на всю ширину, внутренний контейнер ниже
      >
        <div className="container mx-auto relative z-10"> {/* Контейнер для центрирования контента Hero */}
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black tracking-tight uppercase mb-4"
            style={{ 
              color: '#FFFFFF', // Чистый белый
              textShadow: '0px 3px 5px rgba(0,0,0,0.3)' // Тень для объема
            }}
          >
            WARRIORS TEAM
          </h1>
          <p 
            className="max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto text-lg md:text-xl lg:text-2xl text-neutral-300 mb-10 leading-relaxed font-light" // Светлый текст для подзаголовка, font-light для тонкости
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
                         !bg-black hover:!bg-neutral-800 !text-white  /* Черная кнопка с белым текстом */
                         border-2 !border-black hover:!border-neutral-700 /* Черная рамка */
                         rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/checkout"> {/* ЗАМЕНИТЕ '/checkout' на вашу реальную ссылку для присоединения */}
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
          {/* CSS для анимации индикатора скролла */}
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

      {/* --- Остальные секции вашей страницы "Warriors Team" --- */}
      {/* Пример заглушек для других секций, которые вы будете добавлять */}
      <Section id="about-team" className="py-16 md:py-24">
         <div className="text-center">
            <h2 className="text-4xl font-bold">About The Warriors Team</h2>
            <p className="text-neutral-300 mt-4 max-w-2xl mx-auto">
              Inspired by the ethos of elite networks, the Warriors Team is a curated global collective... 
              {/* ЗАПОЛНИТЕ ЭТОТ И ДРУГИЕ ТЕКСТЫ В СТИЛЕ "THE WAR ROOM" */}
            </p>
         </div>
      </Section>

      <Section id="member-benefits" className="py-16 md:py-24 bg-neutral-900"> {/* Пример другого фона для секции */}
         <div className="text-center">
            <h2 className="text-4xl font-bold">Member Benefits</h2>
            <p className="text-neutral-300 mt-4">Access to knowledge, network, and opportunities...</p>
         </div>
      </Section>
      {/* ... и так далее, все секции со страницы "The War Room.htm", адаптированные под "Warriors Team" ... */}
    </div>
  );
}
