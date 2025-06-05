// components/FooterSection.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Этот импорт был, но Label не используется в JSX ниже. Если он не нужен, его можно будет удалить.
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Instagram, Moon, Send, Sun, Twitter, Youtube, MessageCircle, MapPin } from "lucide-react";
import { useTheme } from "next-themes"; // Импортируем useTheme для управления темой

// Этот файл определяет компонент Footerdemo.
// Импорт Footerdemo из этого же файла не нужен.
// export function Footerdemo() { ... } -> это и есть ваш компонент.
// Я переименую его в FooterContent, чтобы избежать путаницы с названием файла,
// а экспортировать будем FooterSection, который его использует.

function FooterContent() { // Переименовал Footerdemo в FooterContent для ясности
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  // const [isChatOpen, setIsChatOpen] = React.useState(false); // Это состояние не используется в JSX

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Эта функция управляет классом dark на html, но это теперь делает ThemeProviderWrapper через next-themes.
  // Поэтому этот useEffect не нужен для управления темой.
  // React.useEffect(() => {
  //   if (theme === "dark") { // Проверяем текущую тему из next-themes
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [theme]); // Зависимость от темы из next-themes

  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) {
    // Предотвращает несоответствие UI при гидрации, связанное с темой
    return null; 
  }

  return (
    <footer className="w-full py-8 md:py-12 border-t border-border"> {/* Используем border-border из темы */}
      <div className="container px-4 md:px-6"> {/* Класс container из globals.css */}
        <div className="grid gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          
          <div className="relative space-y-4"> {/* Убрал лишний p-[2px] и animate-gradient, если они были тут */}
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Stay Connected</h2> {/* Уменьшил шрифт заголовка */}
            <p className="text-muted-foreground"> {/* text-base md:text-lg убраны, чтобы наследовался из text-muted-foreground */}
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="relative flex"> {/* Используем flex для кнопки в Input */}
              <Input
                type="email"
                placeholder="Enter your email"
                // Классы для Input: фон и текст из темы, плейсхолдер тоже
                className="pr-12 bg-input text-foreground placeholder:text-muted-foreground/80 border-border focus-visible:ring-ring" 
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost" // Можно попробовать ghost или outline для менее навязчивого вида
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full 
                           text-muted-foreground hover:text-primary hover:bg-accent" // Цвета для иконки
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            {/* Декоративный элемент можно оставить, если нравится, или убрать */}
            {/* <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl -z-10" /> */}
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">Quick Links</h3>
            <nav className="space-y-1.5 text-sm">
              <a href="#hero-section" className="block text-muted-foreground transition-colors hover:text-primary" onClick={(e) => scrollToSection('hero-section', e)} > Home </a>
              <a href="#features-section" className="block text-muted-foreground transition-colors hover:text-primary" onClick={(e) => scrollToSection('features-section', e)} > Features </a>
              <a href="#board-section" className="block text-muted-foreground transition-colors hover:text-primary" onClick={(e) => scrollToSection('board-section', e)} > Services </a>
              <a href="#pricing-section" className="block text-muted-foreground transition-colors hover:text-primary" onClick={(e) => scrollToSection('pricing-section', e)} > Pricing </a>
              <a href="#blog-section" className="block text-muted-foreground transition-colors hover:text-primary" onClick={(e) => scrollToSection('blog-section', e)} > Blog </a>
            </nav>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">Platform Sections</h3>
            <nav className="space-y-1.5 text-sm">
              <a href="#audio-section" className="block text-muted-foreground transition-colors hover:text-primary" onClick={(e) => scrollToSection('audio-section', e)} > Voice Assistant </a>
              <a href="#testimonials-section" className="block text-muted-foreground transition-colors hover:text-primary" onClick={(e) => scrollToSection('testimonials-section', e)} > Testimonials </a>
              <a href="#map-section" className="block text-muted-foreground transition-colors hover:text-primary" onClick={(e) => scrollToSection('map-section', e)} > Global Network </a>
              <a href="#saas-launch-section" className="block text-muted-foreground transition-colors hover:text-primary" onClick={(e) => scrollToSection('saas-launch-section', e)} > Coming Soon </a>
              <a href="#cta-section" className="block text-muted-foreground transition-colors hover:text-primary" onClick={(e) => scrollToSection('cta-section', e)} > Get Started </a>
            </nav>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">Contact us</h3>
            {/* Используем text-muted-foreground для контактов, цвет которого мы исправили в globals.css для светлой темы */}
            <div className="flex items-start gap-2 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>400 5th Ave, New York, NY 10018, United States</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span>Email: <a href="mailto:ai@vladkuzmenko.com" className="hover:text-primary transition-colors underline">ai@vladkuzmenko.com</a></span>
            </div>
            
            <div className="pt-2 flex space-x-2"> {/* Уменьшил space-x для иконок */}
              <TooltipProvider> <Tooltip> <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary hover:bg-accent w-8 h-8" asChild>
                  <a href="https://www.instagram.com/vladkuzmenkosxy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"> <Instagram className="h-4 w-4" /> </a>
                </Button>
              </TooltipTrigger> <TooltipContent><p>Instagram</p></TooltipContent> </Tooltip> </TooltipProvider>
              
              <TooltipProvider> <Tooltip> <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary hover:bg-accent w-8 h-8" asChild>
                  <a href="https://www.youtube.com/@vladkuzmenkoai" target="_blank" rel="noopener noreferrer" aria-label="YouTube"> <Youtube className="h-4 w-4" /> </a>
                </Button>
              </TooltipTrigger> <TooltipContent><p>YouTube</p></TooltipContent> </Tooltip> </TooltipProvider>

              <TooltipProvider> <Tooltip> <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary hover:bg-accent w-8 h-8" asChild>
                  <a href="http://x.com/vladkuzmenkosxy" target="_blank" rel="noopener noreferrer" aria-label="Twitter X"> <Twitter className="h-4 w-4" /> </a>
                </Button>
              </TooltipTrigger> <TooltipContent><p>Twitter/X</p></TooltipContent> </Tooltip> </TooltipProvider>
              
              <TooltipProvider> <Tooltip> <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary hover:bg-accent w-8 h-8" asChild>
                  <a href="https://api.whatsapp.com/send/?phone=380951444853&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </Button>
              </TooltipTrigger> <TooltipContent><p>WhatsApp</p></TooltipContent> </Tooltip> </TooltipProvider>
              
              <TooltipProvider> <Tooltip> <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary hover:bg-accent w-8 h-8" asChild>
                  <a href="https://t.me/vladkuzmenkoai" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                    <Send className="h-4 w-4" />
                  </a>
                </Button>
              </TooltipTrigger> <TooltipContent><p>Telegram</p></TooltipContent> </Tooltip> </TooltipProvider>
            </div>

            {/* Theme switcher - теперь использует useTheme */}
            <div className="flex items-center space-x-2 pt-2">
              <Sun className="h-5 w-5 text-muted-foreground" />
              <Switch
                id="dark-mode-footer" // Изменил id на всякий случай, если есть другой с id "dark-mode"
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                aria-label="Toggle theme"
              />
              <Moon className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} VladKuzmenko. All rights reserved.
          </p>
          
          <nav className="flex flex-wrap justify-center gap-4 text-sm"> {/* Добавил flex-wrap для мобильных */}
            <Dialog> <DialogTrigger className="text-muted-foreground hover:text-primary transition-colors"> Privacy Policy </DialogTrigger> <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto"> <DialogHeader> <DialogTitle>Privacy Policy</DialogTitle> </DialogHeader> <div className="prose prose-sm dark:prose-invert mt-4"> {/* ... ваш текст Privacy Policy ... */} </div> </DialogContent> </Dialog>
            <Dialog> <DialogTrigger className="text-muted-foreground hover:text-primary transition-colors"> Terms of Service </DialogTrigger> <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto"> <DialogHeader> <DialogTitle>Terms of Service</DialogTitle> </DialogHeader> <div className="prose prose-sm dark:prose-invert mt-4"> {/* ... ваш текст Terms of Service ... */} </div> </DialogContent> </Dialog>
            <Dialog> <DialogTrigger className="text-muted-foreground hover:text-primary transition-colors"> Cookie Settings </DialogTrigger> <DialogContent className="max-w-2xl"> <DialogHeader> <DialogTitle>Cookie Settings</DialogTitle> </DialogHeader> <div className="space-y-4 mt-4"> {/* ... ваш код Cookie Settings ... */} </div> </DialogContent> </Dialog>
          </nav>
        </div>
      </div>
    </footer>
  );
}


// Это основной экспортируемый компонент, который вы используете в других частях сайта.
// Он просто оборачивает FooterContent.
export function FooterSection() {
  return (
    // Если вы хотите, чтобы сам блок FooterSection имел свой фон (отличный от глобального), задайте его здесь.
    // Например, className="w-full bg-card border-t border-border mt-8 md:mt-16"
    // Если он должен быть прозрачным и показывать глобальный фон, то: className="w-full mt-8 md:mt-16"
    // В вашем исходном коде было bg-background, что тоже вариант, если он отличается от глобального.
    // Я оставлю как в вашем исходном файле:
    <div className="w-full bg-background mt-8 md:mt-16"> 
      {/* Убрал container и relative отсюда, так как они есть в FooterContent */}
      <FooterContent />
    </div>
  );
}
