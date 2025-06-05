// Компонент для фона с вертикальными линиями, как в примере "The War Room"
const VerticalLinesBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none">
      <div className="container mx-auto h-full">
        <div className="grid grid-cols-5 h-full">
          {/* Создаем 5 вертикальных линий. 
              Линии будут расположены МЕЖДУ колонками, если использовать border,
              или как сами колонки, если стилизовать div.
              Webflow пример использует 5 div'ов как линии внутри grid-контейнера.
              Мы можем сделать аналогично или использовать borders.
              Давайте сделаем 4 разделительные линии для 5 колонок.
          */}
          {/* Этот подход не даст линии по краям контейнера, а только между колонками.
             Чтобы было точно как в Webflow (5 равноотстоящих линий, включая края или около того),
             проще использовать абсолютное позиционирование или псевдоэлементы.

             Более простой и гибкий способ, который создаст 5 равномерно распределенных вертикальных полос:
          */}
          <div className="absolute inset-y-0 left-0 w-full h-full flex justify-around">
            {[...Array(5)].map((_, i) => (
              <div
                key={`vline-${i}`}
                className="h-full w-px bg-white/10" // Используем bg-white с низкой прозрачностью для темного фона
                                                    // или bg-black/10 для светлого фона
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
// app/warriors-team/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
// Убедитесь, что иконки импортированы, если они нужны в других секциях
// import { ChevronRight } from 'lucide-react'; 

export const metadata: Metadata = {
  title: 'Warriors Team | VladKuzmenko.com',
  description: 'Warriors Team is a global network in which exemplars of individualism work to free the modern man from socially induced incarceration.',
  openGraph: { /* ...ваши og теги... */ },
  twitter: { /* ...ваши twitter теги... */ },
};

// Компонент для фона с вертикальными линиями
const VerticalLinesBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none">
      {/* Этот контейнер нужен, чтобы линии были в пределах основной ширины контента, как в Webflow */}
      <div className="container mx-auto h-full relative">
        <div className="absolute inset-0 grid grid-cols-5 h-full">
          {/* 5 вертикальных линий */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`vline-${i}`}
              // Линия будет справа от каждой из первых 4х колонок, пятая линия на правой границе контейнера.
              // Чтобы было 5 видимых линий, включая края, можно сделать так:
              className={`h-full w-px bg-white/5 ${ 
                i < 4 ? 'border-r border-white/5' : '' // для линий между колонками
              } ${i === 0 ? 'ml-px' : ''} ${i === 4 ? 'mr-px' : ''} `}
              // Простой вариант: 5 линий, распределенных по ширине
              // Этот вариант ниже создаст 5 линий, включая первую слева и последнюю справа (примерно)
              // Если мы хотим точное повторение 5 div'ов, которые являются линиями, то:
              // className="h-full w-px bg-white/5"
              // А сам grid будет justify-items-stretch или justify-items-around
            ></div>
          ))}
        </div>
      </div>
       {/* Более простой способ сделать 5 равноотстоящих линий на всю ширину экрана, не ограничиваясь контейнером: */}
       {/* <div className="absolute inset-0 flex justify-around opacity-50">
            {[...Array(5)].map((_, i) => (
                <div key={`vline-alt-${i}`} className="h-full w-px bg-white/20"></div>
            ))}
        </div> */}
    </div>
  );
};


// Хелпер для секций (оставляем)
const Section: React.FC<{ id?: string; className?: string; children: React.ReactNode; useContainer?: boolean }> = ({ id, className, children, useContainer = true }) => (
  <section id={id} className={`py-16 md:py-24 relative ${className}`}>
    {useContainer ? <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">{children}</div> : <div className="relative z-10">{children}</div>}
  </section>
);


export default function WarriorsTeamPage() {
  return (
    // ОСНОВНОЙ ФОН ЗАДАЕТСЯ ЗДЕСЬ. GridBackground будет рисовать линии поверх него.
    <div className="bg-neutral-950 text-white selection:bg-red-500/30 min-h-screen relative"> {/* Добавлен relative для z-index контекста */}
      <VerticalLinesBackground /> {/* Фон с линиями */}
      
      {/* Hero Section - Стилизуем максимально похоже на скриншот */}
      <Section 
        id="hero" 
        className="min-h-screen flex flex-col justify-center items-center text-center pt-20 md:pt-24 !pb-10 md:!pb-16"
        useContainer={true}
      >
        <h1 
          // Шрифты: в примере Lato Black или очень жирный Plus Jakarta Sans.
          // Используем font-extrabold или font-black. Убедитесь, что нужный шрифт/вес подключен.
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black tracking-tight uppercase mb-4" // Размер как в примере, очень жирный
          style={{ 
            color: '#FFFFFF',
            textShadow: '0px 3px 5px rgba(0,0,0,0.3)' // Легкая тень для объема
          }}
        >
          WARRIORS TEAM
        </h1>
        <p 
          // Шрифт в примере Lato Regular/Light. Размер около 20-24px.
          className="max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto text-lg md:text-xl lg:text-2xl text-neutral-300 mb-10 leading-relaxed font-light" // font-light для более тонкого начертания
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}
        >
          No Great Man in History became Exceptional <em className="font-bold text-white not-italic">alone.</em>
        </p>
        <div>
          {/* Кнопка из примера: черная, белый текст, заглавные буквы, немного скругления */}
          <Button 
            asChild 
            size="lg" // Tailwind size 'lg' дает h-11 (44px), в примере кнопка ~50-60px высотой
            className="group relative flex items-center gap-2 px-8 py-3 md:px-10 md:py-4 
                       text-sm md:text-base font-bold uppercase tracking-wider
                       bg-black hover:bg-neutral-800 text-white 
                       border-2 border-black hover:border-neutral-700
                       rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/checkout"> {/* Замените /checkout */}
              JOIN <strong className="ml-1 font-bold">THE WARRIORS TEAM</strong>
            </Link>
          </Button>
        </div>
        
        {/* Индикатор скролла */}
        <div className="absolute bottom-8 sm:bottom-10 text-center w-full animate-appear [animation-delay:800ms]">
          <div className="inline-block text-sm text-neutral-400 mb-2">Scroll for more</div>
          <div className="w-5 h-9 border-2 border-neutral-500 rounded-full mx-auto relative">
            <div 
              className="w-1 h-1.5 bg-neutral-400 rounded-full absolute top-2 left-1/2 -translate-x-1/2"
              style={{ animation: `bounceSimple 1.5s infinite_hero_scroll cubic-bezier(0.5, 0, 0.1, 1)` }}
            ></div>
          </div>
        </div>
        {/* CSS для анимации скролла (можно вынести в globals.css или <style jsx>) */}
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
      </Section>

      {/* --- Остальные секции (пока заглушки) --- */}
      <Section id="next-section-placeholder" className="min-h-[50vh]"> {/* Уменьшил высоту для теста */}
         <div className="text-center">
            <h2 className="text-4xl font-bold text-white">Следующая секция (Видео)</h2>
            <p className="text-neutral-300 mt-4">Мы будем стилизовать ее, когда вы одобрите Hero секцию и фон.</p>
         </div>
      </Section>
      <Section id="another-section-placeholder" className="min-h-[50vh] bg-neutral-900"> {/* Другой фон для теста */}
         <div className="text-center">
            <h2 className="text-4xl font-bold text-white">Еще одна секция</h2>
         </div>
      </Section>

    </div>
  );
}
