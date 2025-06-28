'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, Scissors, Film, Upload, ShoppingCart } from "lucide-react";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { motion } from "framer-motion";
import { useCart } from '@/context/cart-context';
import { useToast } from "@/hooks/use-toast";

export function SaasLaunchSection() {
  const { addToCart, setIsCartOpen } = useCart();
  const { toast } = useToast();
  
  const saasProduct = {
    id: "saas-monthly",
    name: "AI Content Multiplier - Monthly",
    price: 149.00,
    image: '/case-study-6.webp' // Пример изображения
  };
  
  const handleAddToCart = () => {
    addToCart(saasProduct);
    toast({
      title: "Platform Access Added!",
      description: `${saasProduct.name} has been added to your cart.`,
    });
    setIsCartOpen(true);
  };

  const platformFeatures = [
    {
      icon: <Scissors className="h-8 w-8 text-[#D4AF37]" />,
      title: "Smart Clip Extraction",
      description: "Upload any long-form video and our AI automatically identifies and extracts the most viral moments.",
    },
    {
      icon: <Film className="h-8 w-8 text-purple-500" />,
      title: "Template-Based Editing",
      description: "Choose from premium templates and watch as your clips transform into scroll-stopping content.",
    },
    {
      icon: <Upload className="h-8 w-8 text-blue-500" />,
      title: "Multi-Platform Publishing",
      description: "Schedule and publish across all social platforms with optimized formats for each.",
    }
  ];

  return (
    // ИСПРАВЛЕНО: Убран 'section-transition' и добавлено больше отступов
    <section id="saas-launch-section" className="w-full py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-gradient-radial from-purple-500 to-transparent blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[40%] bg-gradient-radial from-blue-500 to-transparent blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            {/* Launch Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-8">
              <Rocket className="h-5 w-5 text-purple-500 animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-wider">Now Live - Limited Access</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
              CONTENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">MULTIPLIER</span>
            </h2>
            
            <p className="text-2xl md:text-3xl font-semibold mb-6 text-foreground/90 max-w-4xl mx-auto">
              Turn one video into <span className="font-bold text-foreground">30 days of viral content</span>.
            </p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI extracts the best moments and transforms them into platform-optimized clips that get views.
            </p>
          </motion.div>

          {/* Early Access Note */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/20 max-w-2xl mx-auto mb-20"
          >
            <p className="text-lg text-white font-semibold mb-2">🎯 Personalized Onboarding Required</p>
            <p className="text-gray-300">
              We're currently providing personalized platform access to ensure the best experience. 
              Submit your business details below and we'll set up your custom workspace within 24 hours.
            </p>
          </motion.div>
          
          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-zinc-900 to-zinc-950 rounded-3xl p-12 border border-zinc-800"
          >
            <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Upload", desc: "Drop your long video (podcast, webinar, etc.)" },
                { step: "02", title: "AI Magic", desc: "Our AI finds the best 20-30 viral moments" },
                { step: "03", title: "Choose Style", desc: "Select templates that match your brand" },
                { step: "04", title: "Publish", desc: "Schedule across all platforms instantly" }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="text-5xl font-bold gold-gradient mb-4">{item.step}</div>
                  <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-24"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-8">
              Ready to 10x Your Content Output?
            </h3>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join <span className="text-[#D4AF37] font-semibold">500+ creators</span> already using our platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(124,58,237,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(124,58,237,0.7)] hover:scale-105 glow-effect"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-6 w-6" />
                Get Platform Access - $149/mo
              </Button>
              
              <ContactDialog triggerText="Book Demo →">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-12 py-6 text-xl border-purple-500 text-purple-500 hover:bg-purple-500/10"
                >
                  Book Demo →
                </Button>
              </ContactDialog>
            </div>
            
            <p className="text-sm text-gray-500 mt-6">
              Limited spots available • Setup within 24 hours • Cancel anytime
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* ИСПРАВЛЕНО: Лишний div для перехода удален */}
    </section>
  );
}
