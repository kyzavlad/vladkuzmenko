// app/warriors-team/page.tsx
"use client"; // <--- ВАЖНО: Добавлено из-за использования <style jsx global>

import { Metadata } from 'next'; // Metadata можно объявлять, но для динамического обновления title/description в Client Component нужны хуки
import Link from 'next/link';
import { Button } from '@/components/ui/button';
// Убедитесь, что все используемые иконки импортированы, если они понадобятся для ПОЛНОЙ страницы.
// Например, если вы будете добавлять иконки в другие секции:
// import { ChevronRight, Globe, ShieldCheck, Users, Zap, BarChart, MessageSquareHeart, ThumbsUp } from 'lucide-react'; 

// Для КЛИЕНТСКИХ КОМПОНЕНТОВ, экспорт metadata статичен и будет применен во время сборки.
// Если вам нужно ДИНАМИЧЕСКИ менять title/description на этой странице, используйте useEffect:
// import { useEffect } from 'react';
// useEffect(() => {
//   document.title = 'Warriors Team | VladKuzmenko.com';
//   // Вы можете также обновлять мета-теги description здесь, если это необходимо,
//   // хотя это менее эффективно для SEO, чем серверный рендеринг метаданных.
// }, []);

// Статическое определение metadata все еще может быть полезно для начального значения
// или если Next.js сможет его подхватить на этапе сборки для Client Components.
// Однако, если будут проблемы, лучше управлять title через useEffect.
// export const metadata: Metadata = { // Пока оставим закомментированным, чтобы избежать возможных конфликтов со сборкой Client Component
//   title: 'Warriors Team | VladKuzmenko.com',
//   description: 'Warriors Team is a global network in which exemplars of individualism work to free the modern man from socially induced incarceration.',
// };


// Компонент для фона с вертикальными линиями. 
// Так как фон теперь глобальный из globals.css, этот компонент здесь больше не нужен, если только вы не хотите уникальный фон для ЭТОЙ страницы.
// Я его закомментирую, предполагая, что вы используете глобальный фон.
// const VerticalLinesBackground = () => {
//   return (
//     <div 
//       className="fixed inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none"
//     >
//       <div className="container mx-auto h-full relative">
//         <div className="absolute inset-0 grid grid-cols-5 h-full">
//           {[...Array(5)].map((_, i) => (
//             <div
//               key={`vline-${i}`}
//               className="h-full w-px bg-white opacity-5" 
//             ></div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// Хелпер для секций
const Section: React.FC<{ id?: string; className?: string; children: React.ReactNode; useContainer?: boolean }> = ({ id, className, children, useContainer = true }) => (
  <section id={id} className={`relative ${className}`}>
    {useContainer ? <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">{children}</div> : <div className="relative z-10">{children}</div>}
  </section>
);

export default function WarriorsTeamPage() {
  // Если метаданные были закомментированы выше, можно установить заголовок здесь:
  // useEffect(() => {
  //   document.title = 'Warriors Team | VladKuzmenko.com';
  // }, []);

  return (
    // Этот div будет использовать глобальный фон, заданный для <html> в globals.css.
    // Если вы раскомментировали VerticalLinesBackground выше и хотите его использовать,
    // то этому div можно убрать !bg-neutral-950 или сделать его фон прозрачным.
    // Для соответствия "The War Room", который весь темный, класс !bg-neutral-950 принудительно задает темный фон для этой страницы.
    <div className="!bg-neutral-950 text-white selection:bg-red-500/30 min-h-screen relative">
      {/* <VerticalLinesBackground />  Если нужен специфичный фон для этой страницы */}
      
      {/* Hero Section - Стилизация под скриншот "The War Room" */}
      <Section 
        id="hero" 
        className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 pb-10 md:pt-24 md:pb-16"
        useContainer={false} 
      >
        <div className="container mx-auto relative z-10"> {/* Внутренний контейнер для контента Hero */}
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
              <Link href="/checkout"> {/* ЗАМЕНИТЕ ссылку, если нужно */}
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
          {/* Блок <style jsx global> требует, чтобы компонент был клиентским ("use client") */}
          <style jsx global>{`
            @keyframes bounceSimple_hero_scroll {
              0%, 20%, 50%, 80%, 100% { transform: translate(-50%, 0); }
              40% { transform: translate(-50%, 8px); }
              60% { transform: translate(-50%, 4px); }
            }
          `}</style>
        </div>
      </Section>

      {/* ЗАПОЛНИТЕ ОСТАЛЬНЫЕ СЕКЦИИ ПО АНАЛОГИИ С HTML-ФАЙЛОМ "THE WAR ROOM.HTM" */}
      {/* Пример заглушек для других секций */}
      <Section id="about-team" className="py-16 md:py-24">
         <div className="text-center container mx-auto px-4">
            <h2 className="text-4xl font-bold uppercase">About The Warriors Team</h2>
            <p className="text-neutral-300 mt-4 max-w-2xl mx-auto">
              Inspired by the ethos of elite networks, the Warriors Team is a curated global collective... 
              {/* ЗАПОЛНИТЕ ЭТОТ И ДРУГИЕ ТЕКСТЫ В СТИЛЕ "THE WAR ROOM" */}
            </p>
         </div>
      </Section>
      
      <Section id="member-benefits" className="py-16 md:py-24 bg-neutral-900"> {/* Пример другого фона для секции */}
         <div className="text-center container mx-auto px-4">
            <h2 className="text-4xl font-bold uppercase">Member Benefits</h2>
            <p className="text-neutral-300 mt-4">Access to knowledge, network, and opportunities...</p>
         </div>
      </Section>
      {/* ... и так далее, все секции ... */}
    </div>
  );
}
