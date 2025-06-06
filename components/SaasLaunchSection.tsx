"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Rocket, ArrowRight, Zap } from "lucide-react";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { motion } from "framer-motion";

export function SaasLaunchSection() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isLaunched, setIsLaunched] = useState(false);

  // Set launch date to January 1st, 2025
  const launchDate = new Date('2025-01-01T00:00:00');

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setIsLaunched(true);
        clearInterval(timer);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num.toString();
  };

  return (
    <div id="saas-launch-section" className="w-full py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-purple-500/5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-brand/10 via-transparent to-transparent blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
          >
            {/* Launch Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-brand/10 to-purple-500/10 border border-brand/20 mb-8">
              <Rocket className="h-5 w-5 text-brand animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-wider">Limited Early Access</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
              AI AUTOMATION
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand to-purple-500">
                PLATFORM 2.0
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              The future of business automation is here. Join the elite group of early adopters 
              who will transform their operations with our revolutionary AI platform.
            </p>
            
            {/* Countdown timer - Premium style */}
            {!isLaunched ? (
              <div className="w-full max-w-2xl mb-16">
                <p className="text-lg font-semibold mb-6 text-muted-foreground">
                  Platform Launch In:
                </p>
                <div className="grid grid-cols-4 gap-3 md:gap-4">
                  {[
                    { label: "Days", value: countdown.days },
                    { label: "Hours", value: countdown.hours },
                    { label: "Minutes", value: countdown.minutes },
                    { label: "Seconds", value: countdown.seconds }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-purple-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
                      <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl p-4 md:p-6">
                        <div className="text-3xl md:text-5xl font-black mb-1 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                          {formatNumber(item.value)}
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                          {item.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-16">
                <p className="text-3xl font-bold text-brand mb-4">Platform is Now Live!</p>
                <p className="text-xl text-muted-foreground">Get instant access to the future of AI automation.</p>
              </div>
            )}
            
            {/* Feature cards - Premium minimal style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50 h-full">
                  <Zap className="h-8 w-8 text-blue-500 mb-4" />
                  <h3 className="text-xl font-bold mb-3">10x Faster</h3>
                  <p className="text-muted-foreground">
                    Automate complex workflows in minutes, not months. Our AI handles the heavy lifting.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50 h-full">
                  <Sparkles className="h-8 w-8 text-purple-500 mb-4" />
                  <h3 className="text-xl font-bold mb-3">AI-Powered</h3>
                  <p className="text-muted-foreground">
                    Next-generation AI models that understand your business and adapt to your needs.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50 h-full">
                  <Rocket className="h-8 w-8 text-emerald-500 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Early Access</h3>
                  <p className="text-muted-foreground">
                    Join now and get lifetime access to premium features at a fraction of the cost.
                  </p>
                </div>
              </motion.div>
            </div>
            
            {/* CTA Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <p className="text-lg text-muted-foreground mb-6">
                <span className="font-bold text-foreground">Limited spots available.</span> Only for serious entrepreneurs ready to scale.
              </p>
              
              <ContactDialog triggerText="Get Platform Access Now">
                <Button 
                  size="lg" 
                  className="px-12 py-6 text-xl font-bold tracking-wider bg-gradient-to-r from-brand to-purple-600 hover:from-brand/90 hover:to-purple-600/90 text-white transition-all duration-300 rounded-none shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.7)] hover:scale-105 uppercase group"
                >
                  Get Platform Access Now
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </ContactDialog>
              
              <p className="text-sm text-muted-foreground mt-6">
                🔥 <span className="font-semibold">247 entrepreneurs</span> joined in the last 24 hours
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
