"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { ShoppingCart, Search } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const productLinks = [
    { href: "/university", label: "The University" },
    { href: "/ai-platform", label: "AI Platform" },
    { href: "/warriors-team", label: "Warriors Team" },
    { href: "/automation", label: "Automation Agency" },
  ];

  const companyLinks = [
    { href: "/#about", label: "About" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo with golden underline */}
          <Link href="/" className="relative group">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-white tracking-tight"
            >
              VladKuzmenko<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">.com</span>
            </motion.div>
            {/* Golden underline */}
            <motion.div
              className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-amber-400 to-yellow-600"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className={`transition-colors hover:text-amber-400 ${
                pathname === "/" ? "text-amber-400" : "text-gray-300"
              }`}
            >
              Home
            </Link>

            {/* Product Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-300 hover:text-amber-400 transition-colors">
                Product
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100">
                <div className="bg-gray-900/95 backdrop-blur-xl rounded-lg shadow-xl border border-gray-800 overflow-hidden">
                  {productLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-3 hover:bg-amber-400/10 hover:text-amber-400 transition-colors text-gray-300"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Company Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-300 hover:text-amber-400 transition-colors">
                Company
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100">
                <div className="bg-gray-900/95 backdrop-blur-xl rounded-lg shadow-xl border border-gray-800 overflow-hidden">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-3 hover:bg-amber-400/10 hover:text-amber-400 transition-colors text-gray-300"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/#path"
              className="text-gray-300 hover:text-amber-400 transition-colors"
            >
              Choose Path
            </Link>
          </nav>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-amber-400"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-amber-400"
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-black font-semibold"
            >
              <a href="https://cal.com/vladkuzmenko.com/call" target="_blank" rel="noopener noreferrer">
                Book a call today
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-gray-800"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              <Link
                href="/"
                className="py-2 text-gray-300 hover:text-amber-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <div className="py-2">
                <div className="text-gray-500 text-sm mb-2">Product</div>
                {productLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-2 pl-4 text-gray-300 hover:text-amber-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="py-2">
                <div className="text-gray-500 text-sm mb-2">Company</div>
                {companyLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-2 pl-4 text-gray-300 hover:text-amber-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Button
                asChild
                className="mt-4 w-full bg-gradient-to-r from-amber-400 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-black font-semibold"
              >
                <a href="https://cal.com/vladkuzmenko.com/call" target="_blank" rel="noopener noreferrer">
                  Book a call today
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
