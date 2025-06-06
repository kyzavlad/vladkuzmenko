"use client";

import { useEffect, useState } from "react";
import { 
  MessageSquare, 
  Headphones, 
  Calendar, 
  Mail, 
  FileText,
  Users,
  CheckCircle2,
  Zap,
  Brain,
  Gauge,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PixelCanvas } from "@/components/ui/pixel-canvas";

export function BoardSection() {
  const [activeService, setActiveService] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-rotate through services when not hovering
  useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovering]);

  const services = [
    {
      id: "chatbots",
      icon: <MessageSquare className="h-6 w-6 text-brand" />,
      title: "AI Chatbots",
      description: "Custom-trained AI chatbots with human-like conversations, reducing response time by 80% while maintaining personalized interactions.",
      features: [
        {
          icon: <Brain className="h-4 w-4" />,
          title: "Natural Language Understanding",
          description: "Powered by Claude 3.7 & GPT-4.5"
        },
        {
          icon: <Globe className="h-4 w-4" />,
          title: "Multi-language Support",
          description: "Support in 95+ languages"
        },
        {
          icon: <Users className="h-4 w-4" />,
          title: "Seamless Handoff",
          description: "Context-aware human handoff"
        },
        {
          icon: <Zap className="h-4 w-4" />,
          title: "Continuous Learning",
          description: "Self-improving AI system"
        }
      ],
      metrics: [
        { label: "Response Time", value: "-80%" },
        { label: "Customer Satisfaction", value: "+45%" },
        { label: "Resolution Rate", value: "92%" }
      ]
    },
    {
      id: "voice-assistants",
      icon: <Headphones className="h-6 w-6 text-purple-500" />,
      title: "Voice Assistants",
      description: "Enterprise-grade voice AI powered by DeepSeek V3, handling calls, appointments, and customer service with natural conversation.",
      features: [
        {
          icon: <Gauge className="h-4 w-4" />,
          title: "Natural Voice Synthesis",
          description: "99.7% natural voice quality"
        },
        {
          icon: <Brain className="h-4 w-4" />,
          title: "Context Awareness",
          description: "Advanced semantic understanding"
        },
        {
          icon: <CheckCircle2 className="h-4 w-4" />,
          title: "Emotion Detection",
          description: "Real-time sentiment analysis"
        },
        {
          icon: <Zap className="h-4 w-4" />,
          title: "Noise Filtering",
          description: "Enterprise-grade audio clarity"
        }
      ],
      metrics: [
        { label: "Call Resolution", value: "85%" },
        { label: "Average Handle Time", value: "-40%" },
        { label: "Customer Rating", value: "4.8/5" }
      ]
    },
    {
      id: "booking-automation",
      icon: <Calendar className="h-6 w-6 text-emerald-500" />,
      title: "Booking Automation",
      description: "AI-powered scheduling system with smart capacity planning, reducing no-shows by 35% and optimizing resource allocation.",
      features: [
        {
          icon: <Brain className="h-4 w-4" />,
          title: "Smart Scheduling",
          description: "ML-based optimal scheduling"
        },
        {
          icon: <CheckCircle2 className="h-4 w-4" />,
          title: "Automated Reminders",
          description: "Smart engagement system"
        },
        {
          icon: <Gauge className="h-4 w-4" />,
          title: "Resource Optimization",
          description: "Predictive resource planning"
        },
        {
          icon: <Zap className="h-4 w-4" />,
          title: "Calendar Integration",
          description: "Universal calendar sync"
        }
      ],
      metrics: [
        { label: "No-show Rate", value: "-35%" },
        { label: "Booking Efficiency", value: "+60%" },
        { label: "Resource Utilization", value: "95%" }
      ]
    },
    {
      id: "email-automation",
      icon: <Mail className="h-6 w-6 text-blue-500" />,
      title: "Email Automation",
      description: "Deep personalization email system powered by Claude 3.7, increasing engagement by 45% and conversions by 28%.",
      features: [
        {
          icon: <Brain className="h-4 w-4" />,
          title: "Smart Content Generation",
          description: "Context-aware personalization"
        },
        {
          icon: <CheckCircle2 className="h-4 w-4" />,
          title: "Send-time Optimization",
          description: "AI-predicted optimal timing"
        },
        {
          icon: <Gauge className="h-4 w-4" />,
          title: "A/B Testing",
          description: "Self-optimizing campaigns"
        },
        {
          icon: <Zap className="h-4 w-4" />,
          title: "Response Analysis",
          description: "Predictive analytics"
        }
      ],
      metrics: [
        { label: "Open Rate", value: "+45%" },
        { label: "Click-through Rate", value: "+65%" },
        { label: "Conversion Rate", value: "+28%" }
      ]
    },
    {
      id: "content-generation",
      icon: <FileText className="h-6 w-6 text-amber-500" />,
      title: "Content Generation",
      description: "Multi-model AI content creation powered by GPT-4.5 and Claude 3.7, saving 15+ hours per week while maintaining perfect brand voice.",
      features: [
        {
          icon: <Brain className="h-4 w-4" />,
          title: "Brand Voice Adaptation",
          description: "Neural voice cloning"
        },
        {
          icon: <CheckCircle2 className="h-4 w-4" />,
          title: "SEO Optimization",
          description: "Real-time SEO optimization"
        },
        {
          icon: <Gauge className="h-4 w-4" />,
          title: "Multi-format Content",
          description: "12+ content formats"
        },
        {
          icon: <Zap className="h-4 w-4" />,
          title: "Trend Analysis",
          description: "Predictive content planning"
        }
      ],
      metrics: [
        { label: "Time Saved", value: "15h/week" },
        { label: "Content Quality", value: "4.9/5" },
        { label: "Engagement", value: "+75%" }
      ]
    }
  ];

  return (
    <div id="board-section" className="w-full py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] bg-gradient-radial from-blue-500/10 to-transparent opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-[50%] h-[50%] bg-gradient-radial from-purple-500/10 to-transparent opacity-30 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 text-brand mb-4">
            <Brain className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered Solutions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand via-purple-500 to-brand">
            Enterprise AI Automation Suite
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your business operations with our comprehensive AI automation solutions powered by the latest AI models.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Service navigation sidebar */}
          <div className="lg:w-1/3 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
            {services.map((service, index) => (
              <motion.button
                key={service.id}
                className={cn(
                  "relative group flex items-center gap-3 p-4 rounded-xl transition-all duration-500",
                  "border hover:border-opacity-50",
                  activeService === index 
                    ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500/30" 
                    : "border-border/40 hover:border-border/80",
                  "min-w-[200px] lg:min-w-0"
                )}
                onClick={() => setActiveService(index)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <span className={cn(
                  "flex items-center justify-center p-2 rounded-lg transition-colors duration-500",
                  activeService === index ? "text-blue-500" : "text-muted-foreground"
                )}>
                  {service.icon}
                </span>
                <span className={cn(
                  "font-medium transition-colors duration-500",
                  activeService === index ? "text-foreground" : "text-muted-foreground"
                )}>
                  {service.title}
                </span>
                
                {activeService === index && (
                  <motion.div 
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"
                    layoutId="activeIndicator"
                  />
                )}
              </motion.button>
            ))}
          </div>
          
          {/* Service detail card */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              {services.map((service, index) => (
                activeService === index && (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="relative overflow-hidden rounded-2xl p-6 border border-blue-500/20 bg-background/50 backdrop-blur-sm group"
                  >
                    <PixelCanvas
                      gap={10}
                      speed={25}
                      colors={["#e0f2fe", "#7dd3fc", "#0ea5e9"]}
                      variant="icon"
                    />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                          {service.icon}
                        </div>
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                      </div>
                      
                      <p className="text-muted-foreground text-lg mb-8">
                        {service.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {service.features.map((feature, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="flex flex-col gap-2 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20"
                          >
                            <div className="flex items-center gap-2 text-blue-500">
                              {feature.icon}
                              <h4 className="font-medium">{feature.title}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {feature.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {service.metrics.map((metric, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="flex flex-col items-center justify-center p-4 rounded-xl bg-blue-500/5 border border-blue-500/20"
                          >
                            <span className="text-2xl font-bold text-blue-500">{metric.value}</span>
                            <span className="text-sm text-muted-foreground">{metric.label}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-3xl opacity-20 bg-gradient-radial from-blue-500/40 to-transparent" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {service.icon && (
                          <div className="w-64 h-64 stroke-[0.5] text-foreground/10">
                            {service.icon}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}