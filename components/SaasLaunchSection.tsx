'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Rocket, ArrowRight, Zap, Film, Scissors, Upload } from "lucide-react";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { motion } from "framer-motion";

export function SaasLaunchSection() {
  const [isLaunched, setIsLaunched] = useState(true); // Платформа уже запущена

  const platformFeatures = [
    {
      icon: <Scissors className="h-8 w-8 text-orange-500" />,
      title: "Smart Clip Extraction",
      description: "Upload any long-form video and our AI automatically identifies and extracts the most viral moments.",
      details: [
        "AI-powered highlight detection",
        "Automatic hook identification",
        "Emotional peak analysis",
        "Multi-format export"
      ]
    },
    {
      icon: <Film className="h-8 w-8 text-purple-500" />,
      title: "Template-Based Editing",
      description: "Choose from premium templates and watch as your clips transform into scroll-stopping content.",
      details: [
        "50+ professional templates",
        "Dynamic captions & animations",
        "Brand kit integration",
        "One-click rendering"
      ]
    },
    {
      icon: <Upload className="h-8 w-8 text-blue-500" />,
      title: "Multi-Platform Publishing",
      description: "Schedule and publish across all social platforms with optimized formats for each.",
      details: [
        "Auto-resize for each platform",
        "Bulk scheduling",
        "Analytics dashboard",
        "Hashtag optimization"
      ]
    }
  ];

  return (
    <div id="saas-launch-section" className="w-full py-20 lg:py-32 bg-gradient-to-b from-zinc-950 to-black section-transition relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-purple-500/10 via-transparent to-transparent blur-3xl animate-pulse"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto mb-16"
        >
          {/* Launch Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-8">
            <Rocket className="h-5 w-5 text-purple-500 animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-wider">Now Live - Limited Access</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading uppercase mb-6">
            Content <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Multiplier</span> Platform
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
            Turn one video into <span className="text-white font-semibold">30 days of viral content</span>. 
            Our AI extracts the best moments and transforms them into platform-optimized clips that get views.
          </p>

          {/* Early Access Note */}
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/20 max-w-2xl mx-auto">
            <p className="text-lg text-white font-semibold mb-2">🎯 Personalized Onboarding Required</p>
            <p className="text-gray-300">
              We're currently providing personalized platform access to ensure the best experience. 
              Submit your business details below and we'll set up your custom workspace within 24 hours.
            </p>
          </div>
        </motion.div>
          
        {/* Platform Features */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {platformFeatures.map((feature, index) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-zinc-900/80 backdrop-blur-sm p-8 rounded-2xl border border-zinc-800 h-full">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-zinc-900 to-zinc-950 rounded-3xl p-12 mb-16 border border-zinc-800"
        >
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Upload", desc: "Drop your long video (podcast, webinar, etc.)" },
              { step: "02", title: "AI Magic", desc: "Our AI finds the best 20-30 viral moments" },
              { step: "03", title: "Choose Style", desc: "Select templates that match your brand" },
              { step: "04", title: "Publish", desc: "Schedule across all platforms instantly" }
            ].map((item, index) => (
              <div key={item.step} className="text-center">
                <div className="text-5xl font-bold text-orange-500 mb-4">{item.step}</div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
          
        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to 10x Your Content Output?</h3>
          <p className="text-xl text-gray-300 mb-8">
            Join <span className="text-orange-500 font-semibold">500+ creators</span> already using our platform
          </p>
          
          <ContactDialog triggerText="Get Platform Access →">
            <Button 
              size="lg" 
              className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(124,58,237,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(124,58,237,0.7)] hover:scale-105"
            >
              Get Platform Access →
            </Button>
          </ContactDialog>
          
          <p className="text-sm text-gray-500 mt-6">
            Limited spots available • Setup within 24 hours • Cancel anytime
          </p>
        </motion.div>
      </div>
    </div>
  );
}
