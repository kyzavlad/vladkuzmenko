"use client";

import { RainbowButton } from "@/components/ui/rainbow-button";
// Импорты Timeline, motion, Trophy, useRef, Image, cn и связанные с ними хуки удалены, так как они больше не используются.

export function ProjectsSection() {
  // Константа 'data' и связанные с ней 'sectionRef', 'scrollYProgress' удалены.

  return (
    <div id="projects-section" className="w-full bg-background relative">
      {/* Фоновый градиентный оверлей */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        {/* Секция заголовка и описания проектов удалена */}

        {/* Секция таймлайна проектов удалена */}

        {/* Кнопка "Смотреть полное портфолио" */}
        <div className="flex justify-center mt-16 mb-8"> {/* Вы можете настроить отступы mt-16 mb-8 по своему усмотрению */}
          <a
            href="https://www.behance.net/gallery/219043635/AI-Automation-Chat-Voice-Email-Assistants"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RainbowButton className="group relative flex items-center gap-2 px-6 py-3">
              <span className="relative z-10 flex items-center gap-2">
                View Full Portfolio on Behance
              </span>
            </RainbowButton>
          </a>
        </div>
      </div>
    </div>
  );
}

// Функция ProjectImage удалена, так как она больше не используется.
