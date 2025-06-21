"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Instagram, Send, Twitter, Youtube, MessageCircle, MapPin } from "lucide-react";

export function FooterSection() {
  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full py-12 md:py-16 border-t border-zinc-800 bg-black mt-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Newsletter Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight gold-gradient">Stay Connected</h2>
            <p className="text-gray-400">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="relative flex">
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full text-gray-400 hover:text-[#D4AF37] hover:bg-zinc-800"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Quick Links</h3>
            <nav className="space-y-1.5 text-sm">
              <a href="/" className="block text-gray-400 transition-colors hover:text-[#D4AF37]">Home</a>
              <a href="/#education" className="block text-gray-400 transition-colors hover:text-[#D4AF37]">Education</a>
              <a href="/#automation-teaser" className="block text-gray-400 transition-colors hover:text-[#D4AF37]">AI Agency</a>
              <a href="/#saas-launch-section" className="block text-gray-400 transition-colors hover:text-[#D4AF37]">SaaS</a>
              <a href="/#warriors-team" className="block text-gray-400 transition-colors hover:text-[#D4AF37]">Warriors</a>
            </nav>
          </div>

          {/* Platform Sections */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Platform Sections</h3>
            <nav className="space-y-1.5 text-sm">
              <a href="/university" className="block text-gray-400 transition-colors hover:text-[#D4AF37]">The University</a>
              <a href="/ai-platform" className="block text-gray-400 transition-colors hover:text-[#D4AF37]">AI Platform</a>
              <a href="/warriors-team" className="block text-gray-400 transition-colors hover:text-[#D4AF37]">Warriors Team</a>
              <a href="/automation" className="block text-gray-400 transition-colors hover:text-[#D4AF37]">Automation Agency</a>
              <a href="/#merch" className="block text-gray-400 transition-colors hover:text-[#D4AF37]">Merch Store</a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Contact us</h3>
            <div className="flex items-start gap-2 text-gray-400 text-sm">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>400 5th Ave, New York, NY 10018, United States</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>Email: <a href="mailto:ai@vladkuzmenko.com" className="hover:text-[#D4AF37] transition-colors underline">ai@vladkuzmenko.com</a></span>
            </div>
            
            {/* Social Links */}
            <div className="pt-2 flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full text-gray-400 hover:text-[#D4AF37] hover:bg-zinc-800 w-8 h-8" 
                      asChild
                    >
                      <a href="https://www.instagram.com/vladkuzmenkosxy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <Instagram className="h-4 w-4" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Instagram</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full text-gray-400 hover:text-[#D4AF37] hover:bg-zinc-800 w-8 h-8" 
                      asChild
                    >
                      <a href="https://www.youtube.com/@vladkuzmenkoai" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                        <Youtube className="h-4 w-4" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>YouTube</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full text-gray-400 hover:text-[#D4AF37] hover:bg-zinc-800 w-8 h-8" 
                      asChild
                    >
                      <a href="http://x.com/vladkuzmenkosxy" target="_blank" rel="noopener noreferrer" aria-label="Twitter X">
                        <Twitter className="h-4 w-4" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Twitter/X</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full text-gray-400 hover:text-[#D4AF37] hover:bg-zinc-800 w-8 h-8" 
                      asChild
                    >
                      <a href="https://api.whatsapp.com/send/?phone=380951444853&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>WhatsApp</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full text-gray-400 hover:text-[#D4AF37] hover:bg-zinc-800 w-8 h-8" 
                      asChild
                    >
                      <a href="https://t.me/vladkuzmenkoai" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                        <Send className="h-4 w-4" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Telegram</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 text-center md:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} VladKuzmenko. All rights reserved.
          </p>
          
          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            <Dialog>
              <DialogTrigger className="text-gray-500 hover:text-[#D4AF37] transition-colors">
                Privacy Policy
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-zinc-900 border-zinc-800">
                <DialogHeader>
                  <DialogTitle className="text-white">Privacy Policy</DialogTitle>
                </DialogHeader>
                <div className="prose prose-sm prose-invert mt-4">
                  <h2>1. Information We Collect</h2>
                  <p>We collect information that you provide directly to us, including:</p>
                  <ul>
                    <li>Name and contact information</li>
                    <li>Account credentials</li>
                    <li>Payment information</li>
                    <li>Communication preferences</li>
                  </ul>
                  {/* Остальной контент... */}
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger className="text-gray-500 hover:text-[#D4AF37] transition-colors">
                Terms of Service
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-zinc-900 border-zinc-800">
                <DialogHeader>
                  <DialogTitle className="text-white">Terms of Service</DialogTitle>
                </DialogHeader>
                <div className="prose prose-sm prose-invert mt-4">
                  <h2>1. Acceptance of Terms</h2>
                  <p>By accessing and using our services, you agree to be bound by these Terms of Service.</p>
                  {/* Остальной контент... */}
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger className="text-gray-500 hover:text-[#D4AF37] transition-colors">
                Cookie Settings
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-zinc-900 border-zinc-800">
                <DialogHeader>
                  <DialogTitle className="text-white">Cookie Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <p className="text-gray-400">We use cookies to improve your experience.</p>
                  {/* Упрощенные настройки куков */}
                </div>
              </DialogContent>
            </Dialog>
          </nav>
        </div>
      </div>
    </footer>
  );
}
