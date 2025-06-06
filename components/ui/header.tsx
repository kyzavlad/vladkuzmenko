// app/Header.tsx (или где у вас лежит этот компонент)
"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { StarBorder } from "@/components/ui/star-border";

export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isChoosePathOpen, setChoosePathOpen] = useState(false);

  const navigationItems = [
    { title: "Home", href: "/" },
    {
      title: "Product",
      description: "Explore our AI automation solutions for your business.", // Этот текст можно будет поменять, если "Warriors Team" не про AI
      items: [
        { title: "AI Solutions", href: "#board-section" }, // И эти тоже
        { title: "Features", href: "#features-section" },
        { title: "Voice Assistant", href: "#audio-section" },
        { title: "Pricing", href: "#pricing-section" },
      ],
    },
    {
      title: "Company",
      description: "Learn more about our company and success stories.",
      items: [
        { title: "Success Stories", href: "#projects-section" },
        { title: "Global Network", href: "#map-section" },
        { title: "Testimonials", href: "#testimonials-section" },
        { title: "Blog", href: "#blog-section" },
      ],
    },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Для внешних ссылок или других страниц
      // Если используете Next.js router, лучше router.push(href)
      window.location.href = href; 
    }
  };
  
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        setChoosePathOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <>
      {/* Blur overlay for Choose Path menu */}
      {isChoosePathOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setChoosePathOpen(false)}
        />
      )}

      {/* Choose Path Menu popup */}
      {isChoosePathOpen && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg px-4">
          <div className="bg-background/95 backdrop-blur-sm border border-border/40 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Choose Your Path</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setChoosePathOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <Link href="/#pricing-section" onClick={(e) => { handleNavClick(e, "/#pricing-section"); setChoosePathOpen(false); }}>
              <StarBorder
                className="w-full mb-4 hover:scale-[1.02] transition-transform cursor-pointer"
                color="hsl(var(--brand))"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">Our Services</h3>
                    <p className="text-muted-foreground text-sm">Explore our range of AI automation services</p>
                  </div>
                  <MoveRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </StarBorder>
            </Link>

            <div onClick={() => { window.open('https://vladkuzmenkoai.com', '_blank'); setChoosePathOpen(false); }} className="cursor-pointer">
              <StarBorder
                className="w-full mb-4 hover:scale-[1.02] transition-transform"
                color="hsl(var(--color-2))"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">AI Automation Platform</h3>
                    <p className="text-muted-foreground text-sm">Access our powerful platform</p>
                  </div>
                  <MoveRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </StarBorder>
            </div>
            
            {/* ИЗМЕНЕННАЯ ССЫЛКА ДЛЯ WARRIORS TEAM */}
            <Link href="/warriors-team" passHref legacyBehavior>
              <a 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => setChoosePathOpen(false)}
                className="block cursor-pointer" 
              >
                <StarBorder 
                  className="w-full hover:scale-[1.02] transition-transform" // Убрал mb-4, если это последний элемент
                  color="hsl(var(--color-3))"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <h3 className="font-semibold text-lg">Warriors Team</h3>
                      <p className="text-muted-foreground text-sm">Join our elite community</p>
                    </div>
                    <MoveRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </StarBorder>
              </a>
            </Link>
          </div>
        </div>
      )}

      <header className="w-full z-30 fixed top-0 left-0 bg-background/95 backdrop-blur-sm border-b border-border/40">
        {/* КОНТЕЙНЕР ХЕДЕРА:
          - На мобильных (<lg): flex flex-row items-center justify-between. Логотип слева, иконка меню справа.
          - На десктопах (lg+): lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-x-4. 
            Боковые колонки (auto) по ширине содержимого, центральная (1fr) для логотипа занимает остальное место.
        */}
        <div className="container relative mx-auto py-4 md:py-5 flex flex-row items-center justify-between lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-4">
          
          {/* Left side (Desktop navigation) */}
          <div className="hidden lg:flex justify-start items-center">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-row gap-1"> {/* Уменьшен gap */}
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.href ? (
                      <NavigationMenuLink asChild>
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href!)}
                          className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                        >
                          {item.title}
                        </a>
                      </NavigationMenuLink>
                    ) : (
                      <>
                        <NavigationMenuTrigger className="h-10 px-3 py-2 font-medium text-sm">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="!w-[450px] p-4">
                          {/* ... Содержимое NavigationMenuContent ... (оставляем ваш код) */}
                          <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                            <div className="flex flex-col h-full justify-between">
                              <div>
                                <p className="text-base font-semibold">{item.title}</p>
                                <p className="text-muted-foreground text-sm mt-1">
                                  {item.description}
                                </p>
                              </div>
                              <div>
                                <ContactDialog triggerText="Book a call today">
                                  <Button size="sm" className="mt-6 w-full md:w-auto">
                                    Book a call today
                                  </Button>
                                </ContactDialog>
                              </div>
                            </div>
                            <div className="flex flex-col text-sm gap-1">
                              {item.items?.map((subItem) => (
                                <a
                                  href={subItem.href}
                                  key={subItem.title}
                                  onClick={(e) => handleNavClick(e, subItem.href)}
                                  className="flex flex-row justify-between items-center hover:bg-accent hover:text-accent-foreground py-2 px-3 rounded-md transition-colors"
                                >
                                  <span>{subItem.title}</span>
                                  <MoveRight className="w-4 h-4 text-muted-foreground" />
                                </a>
                              ))}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Center (Logo) */}
          {/* Обертка логотипа: min-w-0 позволяет ей сжиматься. justify-center для грид-колонки. */}
          <div className="flex justify-center items-center min-w-0"> 
            {/* Класс 'logo-container' используется из globals.css. Tailwind класс 'overflow-hidden' здесь не нужен. */}
            <div className="logo-container relative"> 
              <a href="/" className="flex items-center" aria-label="VladKuzmenko.com Home">
                <span 
                  className="text-xl sm:text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/30 dark:from-white dark:via-white dark:to-white/30 font-serif italic"
                  // Убран 'whitespace-nowrap', текст будет переноситься по необходимости (как в вашем оригинале)
                >
                  VladKuzmenko.com
                </span>
              </a>
            </div>
          </div>

          {/* Right side (Desktop buttons & Mobile Menu Icon) */}
          <div className="flex justify-end items-center">
            {/* Desktop Buttons: Видимы на md экранах и выше */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => setChoosePathOpen(true)}
              >
                Choose Path
              </Button>
              <div className="border-r h-6 mx-1 self-center"></div> {/* Вертикальная черта */}
              <ContactDialog triggerText="Get started">
                <Button>Get started</Button>
              </ContactDialog>
            </div>

            {/* Mobile menu button: Видима на экранах меньше md */}
            <div className="flex items-center md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile navigation menu popup */}
        {isMobileMenuOpen && (
          // ... (код вашего мобильного выпадающего меню без изменений) ...
          <div className="absolute top-[calc(var(--header-height,72px)-1px)] left-0 right-0 border-t bg-background shadow-lg py-4 px-4 flex flex-col gap-4 z-20 md:hidden">
            {navigationItems.map((item) => (
              <div key={item.title} className="py-2 border-b border-border/20 last:border-b-0">
                {item.href ? (
                  <a href={item.href} onClick={(e) => handleNavClick(e, item.href!)} className="flex justify-between items-center text-foreground hover:text-primary transition-colors w-full py-1" >
                    <span className="text-base font-medium">{item.title}</span>
                    <MoveRight className="w-4 h-4 text-muted-foreground" />
                  </a>
                ) : (
                  <div>
                    <p className="text-base font-medium text-foreground py-1">{item.title}</p>
                    <div className="pl-2 flex flex-col gap-1 mt-1">
                      {item.items?.map((subItem) => (
                        <a key={subItem.title} href={subItem.href} onClick={(e) => handleNavClick(e, subItem.href)} className="flex justify-between items-center text-muted-foreground hover:text-primary transition-colors w-full py-1" >
                          <span>{subItem.title}</span>
                          <MoveRight className="w-4 h-4 stroke-1" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Button className="w-full" onClick={() => { setChoosePathOpen(true); setMobileMenuOpen(false); }} >
                Choose Path
              </Button>
              <ContactDialog triggerText="Get started">
                <Button variant="outline" className="w-full">Get started</Button>
              </ContactDialog>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
