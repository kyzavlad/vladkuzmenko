'use client';

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X, Sparkles, BrainCircuit, Users, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isChoosePathOpen, setChoosePathOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { 
      title: "Home", 
      href: "/" 
    },
    {
      title: "Services",
      description: "Explore our ecosystem of products and services",
      items: [
        { title: "The University", href: "#education", icon: <BookOpen className="h-4 w-4" /> },
        { title: "AI Automation", href: "/automation", icon: <BrainCircuit className="h-4 w-4" /> },
        { title: "Warriors Team", href: "/warriors-team", icon: <Users className="h-4 w-4" /> },
        { title: "Elite Equipment", href: "#merch", icon: <Sparkles className="h-4 w-4" /> },
      ],
    },
    {
      title: "Platform",
      href: "#saas-launch-section"
    },
    {
      title: "About",
      description: "Learn about Vlad and the mission",
      items: [
        { title: "About Vlad", href: "#about" },
        { title: "Success Stories", href: "#education" },
        { title: "Contact", href: "#contact" },
      ],
    },
  ];

  const businessModels = [
    {
      icon: <BookOpen className="h-8 w-8 text-orange-500" />,
      title: "The University",
      description: "Master high-income skills",
      href: "#education",
      color: "from-orange-500/20 to-orange-600/10"
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-purple-500" />,
      title: "AI Automation Agency",
      description: "Transform your business with AI",
      href: "/automation",
      color: "from-purple-500/20 to-purple-600/10"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-blue-500" />,
      title: "Content Platform",
      description: "Multiply your content output",
      href: "#saas-launch-section",
      color: "from-blue-500/20 to-blue-600/10"
    },
    {
      icon: <Users className="h-8 w-8 text-red-500" />,
      title: "Warriors Team",
      description: "Join the brotherhood",
      href: "/warriors-team",
      color: "from-red-500/20 to-red-600/10"
    }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Choose Path Modal */}
      <AnimatePresence>
        {isChoosePathOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setChoosePathOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl px-4"
            >
              <div className="bg-zinc-950/95 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 premium-shadow">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold">Choose Your Path</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setChoosePathOpen(false)}
                    className="hover:bg-zinc-800"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {businessModels.map((model, index) => (
                    <Link
                      key={model.title}
                      href={model.href}
                      onClick={(e) => {
                        handleNavClick(e, model.href);
                        setChoosePathOpen(false);
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-6 rounded-xl bg-gradient-to-r ${model.color} border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover-lift cursor-pointer group`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">{model.icon}</div>
                          <div className="flex-grow">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                              {model.title}
                            </h3>
                            <p className="text-gray-400">{model.description}</p>
                          </div>
                          <MoveRight className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <header className={`w-full z-40 fixed top-0 left-0 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-md border-b border-zinc-800' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Left - Navigation */}
            <div className="hidden lg:flex items-center flex-1">
              <NavigationMenu>
                <NavigationMenuList>
                  {navigationItems.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      {item.href ? (
                        <Link href={item.href} passHref legacyBehavior>
                          <NavigationMenuLink className="px-4 py-2 text-sm font-medium hover:text-orange-500 transition-colors">
                            {item.title}
                          </NavigationMenuLink>
                        </Link>
                      ) : (
                        <>
                          <NavigationMenuTrigger className="text-sm font-medium">
                            {item.title}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="w-96 p-6">
                              <p className="text-sm text-gray-400 mb-4">{item.description}</p>
                              <div className="space-y-2">
                                {item.items?.map((subItem) => (
                                  <a
                                    key={subItem.title}
                                    href={subItem.href}
                                    onClick={(e) => handleNavClick(e, subItem.href)}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-900 transition-colors group"
                                  >
                                    {subItem.icon && subItem.icon}
                                    <div className="flex-grow">
                                      <span className="font-medium group-hover:text-orange-500 transition-colors">
                                        {subItem.title}
                                      </span>
                                    </div>
                                    <MoveRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
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

            {/* Center - Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-display font-bold animated-gradient">
                  VladKuzmenko
                </span>
              </Link>
            </div>

            {/* Right - Actions */}
            <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
              <Button
                variant="ghost"
                onClick={() => setChoosePathOpen(true)}
                className="hover:text-orange-500"
              >
                Choose Path
              </Button>
              <ContactDialog triggerText="Get Started">
                <Button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400">
                  Get Started
                </Button>
              </ContactDialog>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-black/95 backdrop-blur-md border-t border-zinc-800"
            >
              <div className="container mx-auto px-4 py-6 space-y-4">
                {navigationItems.map((item) => (
                  <div key={item.title}>
                    {item.href ? (
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="block py-2 text-lg font-medium hover:text-orange-500 transition-colors"
                      >
                        {item.title}
                      </a>
                    ) : (
                      <div>
                        <p className="py-2 text-lg font-medium">{item.title}</p>
                        <div className="pl-4 space-y-2">
                          {item.items?.map((subItem) => (
                            <a
                              key={subItem.title}
                              href={subItem.href}
                              onClick={(e) => handleNavClick(e, subItem.href)}
                              className="block py-1 text-gray-400 hover:text-orange-500 transition-colors"
                            >
                              {subItem.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 space-y-3">
                  <Button 
                    className="w-full"
                    onClick={() => {
                      setChoosePathOpen(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Choose Path
                  </Button>
                  <ContactDialog triggerText="Get Started">
                    <Button variant="outline" className="w-full">
                      Get Started
                    </Button>
                  </ContactDialog>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
