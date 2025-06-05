// app/warriors-team/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Убедитесь, что путь к кнопке верный
import { ChevronRight } from 'lucide-react'; // Иконка для кнопки

export const metadata: Metadata = {
  title: 'Warriors Team | VladKuzmenko.com', // Адаптируйте по необходимости
  description: 'Warriors Team is a global network in which exemplars of individualism work to free the modern man from socially induced incarceration.',
  // Добавьте OpenGraph и Twitter мета-теги как в примере "The War Room.htm"
  openGraph: {
    title: 'Warriors Team',
    description: 'Warriors Team is a global network in which exemplars of individualism work to free the modern man from socially induced incarceration.',
    // Замените на ваше изображение для превью
    images: [{ url: 'https://your-domain.com/images/warriors-team-preview.png' }], 
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Warriors Team',
    description: 'Warriors Team is a global network in which exemplars of individualism work to free the modern man from socially induced incarceration.',
    // Замените на ваше изображение для превью
    images: ['https://your-domain.com/images/warriors-team-preview.png'],
  },
};

// Компонент для сеточного фона (как описано выше)
const GridBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-neutral-950 dark:bg-neutral-950"> {/* Принудительно темный фон для этой страницы */}
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px', // Размер ячеек сетки
        }}
      ></div>
    </div>
  );
};

// Хелпер для секций (оставляем как есть, если подходит)
const Section: React.FC<{ id?: string; className?: string; children: React.ReactNode; useContainer?: boolean }> = ({ id, className, children, useContainer = true }) => (
  <section id={id} className={`py-16 md:py-24 relative ${className}`}>
    {useContainer ? <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">{children}</div> : <div className="relative z-10">{children}</div>}
  </section>
);


export default function WarriorsTeamPage() {
  // Шрифты: В примере используются "Lato" и "Plus Jakarta Sans". 
  // Убедитесь, что ваш layout.tsx или globals.css загружает похожие шрифты, 
  // или используйте Next/Font для их подключения для этой страницы.
  // Я буду использовать общие Tailwind классы, но результат будет лучше с правильными шрифтами.

  return (
    // Для этой страницы принудительно темная тема текста, как в примере
    <div className="bg-neutral-950 text-white selection:bg-red-500/30 min-h-screen"> 
      <GridBackground />
      
      {/* Hero Section - Стилизуем максимально похоже на скриншот */}
      <Section 
        id="hero" 
        className="min-h-screen flex flex-col justify-center items-center text-center pt-20 md:pt-24 !pb-10 md:!pb-16" // !pb-10 для уменьшения нижнего отступа, если он был от Section
        useContainer={true}
      >
        <h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-4" // font-black для очень жирного начертания, как в примере
          style={{ 
            color: '#ffffff', // Ярко-белый цвет
            // WebkitTextStroke: '1px hsla(0,0%,0%,0.5)', // Если нужен легкий черный контур на буквах (не видно на скриншоте)
            textShadow: '0 2px 10px rgba(0,0,0,0.5)' // Тень для текста, чтобы выделить
          }}
        >
          WARRIORS TEAM
        </h1>
        <p 
          className="max-w-3xl mx-auto text-lg md:text-xl lg:text-2xl text-neutral-300 mb-10 leading-relaxed" // Нейтральный светлый цвет для подзаголовка
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.7)'}}
        >
          {/* Текст очень близкий к примеру */}
          No Great Man in History became Exceptional <span className="font-bold text-white">alone.</span>
        </p>
        <div>
          {/* Кнопка стилизована под пример: черная с белым текстом */}
          <Button 
            asChild 
            size="lg" 
            className="group relative flex items-center gap-2 px-8 py-4 text-base md:text-lg font-bold 
                       bg-black hover:bg-neutral-800 text-white 
                       border-2 border-black hover:border-neutral-700
                       rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/checkout"> {/* Замените /checkout на вашу целевую ссылку */}
              JOIN <strong className="ml-1">THE WARRIORS TEAM</strong>
              {/* <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> Убрал иконку, в примере ее нет */}
            </Link>
          </Button>
        </div>
        {/* Placeholder для Lottie-анимации скролла. В примере используется lottie. */}
        <div className="mt-16 md:mt-24 text-sm text-neutral-400 animate-pulse">
          Scroll for more
          <div className="w-6 h-10 border-2 border-neutral-400 rounded-full mx-auto mt-2 relative">
            <div className="w-1 h-2 bg-neutral-400 rounded-full absolute top-2 left-1/2 -translate-x-1/2 animate-bounce"></div>
          </div>
        </div>
      </Section>

      {/* ====================================================================== */}
      {/* ОСТАЛЬНЫЕ СЕКЦИИ БУДУТ ДОБАВЛЕНЫ ПОСЛЕ ВАШЕГО ПОДТВЕРЖДЕНИЯ СТИЛЯ HERO */}
      {/* ====================================================================== */}

      {/* Пример следующей секции (пока как заглушка, чтобы было куда скроллить) */}
      <Section id="next-section-placeholder" className="min-h-screen">
         <div className="text-center">
            <h2 className="text-4xl font-bold text-white">Следующая секция здесь</h2>
            <p className="text-neutral-300 mt-4">Мы будем стилизовать ее после того, как вы одобрите Hero секцию.</p>
         </div>
      </Section>

    </div>
  );
}
