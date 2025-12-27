"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, MoveRight, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { StarBorder } from "@/components/ui/star-border";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Header() {
  const headerRef = useRef<HTMLElement | null>(null);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isChoosePathOpen, setChoosePathOpen] = useState(false);

  const navigationItems = [
    { title: "Home", href: "/" },
    {
      title: "Product",
      description: "Explore products and systems inside the ecosystem.",
      items: [
        { title: "The University", href: "/university" },
        { title: "AI Automation", href: "/automation" },
        { title: "Content Platform", href: "/ai-platform" },
        { title: "Elite Equipment", href: "/#merch" },
        { title: "Warriors Team", href: "/warriors-team" },
      ],
    },
    {
      title: "Company",
      description: "Learn about Vlad, the work, and results.",
      items: [
        { title: "About Vlad", href: "/#about" },
        { title: "Success Stories", href: "/#testimonials" },
        { title: "Community", href: "/#warriors-team" },
        { title: "Contact", href: "/#contact" },
      ],
    },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const elementId = href.replace("/#", "");
      const element = document.getElementById(elementId);
      if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (href === "/") {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const updateHeaderHeightVar = () => {
      const h = headerRef.current?.offsetHeight ?? 72;
      document.documentElement.style.setProperty("--header-height", `${h}px`);
    };

    updateHeaderHeightVar();

    const onResize = () => updateHeaderHeightVar();
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setChoosePathOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    // lock scroll when overlays are open (feel premium + no jumps)
    if (isMobileMenuOpen || isChoosePathOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
  }, [isMobileMenuOpen, isChoosePathOpen]);

  return (
    <>
      {/* Blur overlay for Choose Path */}
      {isChoosePathOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setChoosePathOpen(false)}
        />
      )}

      {/* Choose Path popup */}
      {isChoosePathOpen && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg px-4">
          <div className="bg-background/95 backdrop-blur-sm border border-border/40 rounded-2xl p-6 space-y-4 premium-shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Choose Your Path</h2>
              <Button variant="ghost" size="icon" onClick={() => setChoosePathOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <Link href="/university" onClick={() => setChoosePathOpen(false)}>
              <StarBorder
                className="w-full mb-4 hover:scale-[1.02] transition-transform cursor-pointer"
                color="hsl(var(--gold))"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">The University</h3>
                    <p className="text-muted-foreground text-sm">
                      Skills, leverage, and discipline — step by step.
                    </p>
                  </div>
                  <MoveRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </StarBorder>
            </Link>

            <Link href="/automation" onClick={() => setChoosePathOpen(false)}>
              <StarBorder
                className="w-full mb-4 hover:scale-[1.02] transition-transform cursor-pointer"
                color="hsl(var(--color-2))"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">AI Automation Agency</h3>
                    <p className="text-muted-foreground text-sm">
                      Practical AI systems for business growth.
                    </p>
                  </div>
                  <MoveRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </StarBorder>
            </Link>

            <Link href="/ai-platform" onClick={() => setChoosePathOpen(false)}>
              <StarBorder
                className="w-full mb-4 hover:scale-[1.02] transition-transform cursor-pointer"
                color="hsl(var(--color-3))"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">Content Platform</h3>
                    <p className="text-muted-foreground text-sm">
                      Turn long-form into distribution — fast.
                    </p>
                  </div>
                  <MoveRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </StarBorder>
            </Link>

            <Link href="/warriors-team" onClick={() => setChoosePathOpen(false)}>
              <StarBorder
                className="w-full hover:scale-[1.02] transition-transform cursor-pointer"
                color="hsl(var(--color-1))"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">Warriors Team</h3>
                    <p className="text-muted-foreground text-sm">
                      Network of builders. Brotherhood & momentum.
                    </p>
                  </div>
                  <MoveRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </StarBorder>
            </Link>
          </div>
        </div>
      )}

      <header
        ref={headerRef}
        className="w-full z-30 fixed top-0 left-0 bg-background/95 backdrop-blur-sm border-b border-border/40"
      >
        <div className="container relative mx-auto py-4 md:py-5 flex flex-row items-center justify-between lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-4">
          {/* Left side (Desktop navigation) */}
          <div className="hidden lg:flex justify-start items-center">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-row gap-1">
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
                                  <Button size="sm" className="mt-6 w-full md:w-auto premium-button">
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
          <div className="flex justify-center items-center min-w-0">
            <div className="logo-container relative">
              <a href="/" className="flex items-center" aria-label="VladKuzmenko.com Home">
                <span className="text-xl sm:text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/30 dark:from-white dark:via-white dark:to-white/30 font-serif italic logo-underline">
                  VladKuzmenko.com
                </span>
              </a>
            </div>
          </div>

          {/* Right side */}
          <div className="flex justify-end items-center">
            {/* Desktop buttons */}
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" onClick={() => setChoosePathOpen(true)}>
                Choose Path
              </Button>
              <div className="border-r h-6 mx-1 self-center" />
              <ContactDialog triggerText="Get started">
                <Button className="premium-button">Get started</Button>
              </ContactDialog>
            </div>

            {/* Mobile burger */}
            <div className="flex items-center md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setMobileMenuOpen((v) => !v);
                  setChoosePathOpen(false);
                }}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div
            className="absolute left-0 right-0 border-t bg-background shadow-lg py-4 px-4 flex flex-col gap-4 z-20 md:hidden"
            style={{ top: "calc(var(--header-height, 72px) - 1px)" }}
          >
            {navigationItems.map((item) => (
              <div key={item.title} className="py-2 border-b border-border/20 last:border-b-0">
                {item.href ? (
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href!)}
                    className="flex justify-between items-center text-foreground hover:text-primary transition-colors w-full py-1"
                  >
                    <span className="text-base font-medium">{item.title}</span>
                    <MoveRight className="w-4 h-4 text-muted-foreground" />
                  </a>
                ) : (
                  <div>
                    <p className="text-base font-medium text-foreground py-1">{item.title}</p>
                    <div className="pl-2 flex flex-col gap-1 mt-1">
                      {item.items?.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.href}
                          onClick={(e) => handleNavClick(e, subItem.href)}
                          className="flex justify-between items-center text-muted-foreground hover:text-primary transition-colors w-full py-1"
                        >
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
              <Button
                className="w-full"
                onClick={() => {
                  setChoosePathOpen(true);
                  setMobileMenuOpen(false);
                }}
              >
                Choose Path
              </Button>
              <ContactDialog triggerText="Get started">
                <Button variant="outline" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  Get started
                </Button>
              </ContactDialog>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
