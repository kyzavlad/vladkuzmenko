// app/warriors-team/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Warriors Team | VladKuzmenko.com',
  description: 'Warriors Team is a global network in which exemplars of individualism work to free the modern man from socially induced incarceration.',
  // Вы можете добавить здесь больше мета-тегов, специфичных для этой страницы,
  // например, openGraph, twitter cards, как вы делали в page.tsx
  openGraph: {
    title: 'Warriors Team',
    description: 'A global network for driven individuals.',
    // Замените URL на актуальное изображение для превью этой страницы
    images: [{ url: 'https://vladkuzmenko.com/images/warriors-team-preview.jpg' }], 
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Warriors Team',
    description: 'A global network for driven individuals.',
    // Замените URL на актуальное изображение для превью этой страницы
    images: ['https://vladkuzmenko.com/images/warriors-team-preview.jpg'],
  },
};

export default function WarriorsTeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Этот layout просто передает children дальше, не добавляя своей разметки,
  // чтобы страница warriors-team/page.tsx могла полностью контролировать свой вид
  // и использовать глобальный фон из html/body.
  return <>{children}</>;
}
