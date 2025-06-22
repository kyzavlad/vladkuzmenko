"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactDialog } from "@/components/ui/contact-dialog";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Product",
    href: "#",
    submenu: [
      { name: "The University", href: "/university" },
      { name: "AI Platform", href: "/ai-platform" },
      { name: "Warriors Team", href: "/warriors-team" },
      { name: "Automation Agency", href: "/automation-agency" }
    ]
  },
  {
    name: "Company",
    href: "#",
    submenu: [
      { name: "About", href: "/#about" },
      { name: "Instagram", href: "/#instagram" },
      { name: "Merch Store", href: "/merch" }
    ]
  }
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const elementId = href.substring(2);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleCalendarClick = () => {
    window.open('https://cal.com/vladkuzmenko.com/call', '_blank');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-black/90 backdrop-blur-lg border-b border-gold/10" 
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            <span className="gold-gradient">VladKuzmenko</span>
            <span className="text-white">.com</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <>
                    <button
                      className="flex items-center space-x-1 text-white hover:text-gold transition-colors"
                      onMouseEnter={() => setOpenSubmenu(item.name)}
                      onMouseLeave={() => setOpenSubmenu(null)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <AnimatePresence>
                      {openSubmenu === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-lg border border-gold/20 rounded-lg overflow-hidden"
                          onMouseEnter={() => setOpenSubmenu(item.name)}
                          onMouseLeave={() => setOpenSubmenu(null)}
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={(e) => handleNavClick(e, subItem.href)}
                              className="block px-4 py-2 text-sm text-white hover:bg-gold/10 hover:text-gold transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-white hover:text-gold transition-colors ${
                      pathname === item.href ? "text-gold" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/success-path">
              <Button variant="outline" className="border-gold text-gold hover:bg-gold/10">
                Choose Path
              </Button>
            </Link>
            <Button 
              className="premium-button"
              onClick={handleCalendarClick}
            >
              Book a call today
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-gold transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-t border-gold/10"
          >
            <div className="container mx-auto px-4 py-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <div>
                      <button
                        className="w-full text-left py-2 text-white hover:text-gold transition-colors flex items-center justify-between"
                        onClick={() => setOpenSubmenu(openSubmenu === item.name ? null : item.name)}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          openSubmenu === item.name ? "rotate-180" : ""
                        }`} />
                      </button>
                      <AnimatePresence>
                        {openSubmenu === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-4"
                          >
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={(e) => {
                                  handleNavClick(e, subItem.href);
                                  setIsMobileMenuOpen(false);
                                }}
                                className="block py-2 text-sm text-gray-300 hover:text-gold transition-colors"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-white hover:text-gold transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="mt-4 space-y-2">
                <Link href="/success-path" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-gold text-gold hover:bg-gold/10">
                    Choose Path
                  </Button>
                </Link>
                <Button 
                  className="w-full premium-button"
                  onClick={() => {
                    handleCalendarClick();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Book a call today
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
