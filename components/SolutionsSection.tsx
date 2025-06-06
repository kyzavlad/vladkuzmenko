"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Headphones, 
  Calendar, 
  Mail, 
  FileText,
  Users,
  Brain,
  Settings,
  Globe,
  Zap,
  Gauge,
  Settings,
  Globe,
  Zap,
  Gauge,
  CheckCircle2
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { PixelCanvas } from "@/components/ui/pixel-canvas";

const solutions = [
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
    ],
    status: "Live",
    tags: ["Email", "LinkedIn", "Apollo"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&q=80"
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
    ],
    status: "Updated",
    tags: ["Calendar", "Scheduling"],
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=500&q=80"
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
    ],
    status: "Beta",
    tags: ["ClickUp", "Notion", "CRM"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&q=80"
  },
  {
    id: "email",
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
    ],
    status: "Live",
    tags: ["Email", "Analytics"],
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=500&q=80"
  },
  {
    id: "content",
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
    ],
    status: "Updated",
    tags: ["AI", "Content"],
    image: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=800&h=500&q=80"
  },
  {
    title: "AI Chatbots",
    description: "Custom-trained AI chatbots reducing response time by 80% while maintaining personalized interactions",
    icon: <MessageSquare className="w-4 h-4 text-indigo-500" />,
    status: "Live",
    tags: ["Support", "AI"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=500&q=80"
  },
  {
    title: "Voice Assistants",
    description: "Enterprise-grade voice AI for customer service with natural conversation and sentiment analysis",
    icon: <Headphones className="w-4 h-4 text-rose-500" />,
    status: "Beta",
    tags: ["Voice", "AI"],
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&h=500&q=80"
  },
  {
    title: "Business Process Automation",
    description: "End-to-end automation for hiring, payments, and operations with advanced analytics",
    icon: <Brain className="w-4 h-4 text-teal-500" />,
    status: "Live",
    tags: ["Process", "Analytics"],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&q=80"
  }
];

export function SolutionsSection() {
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

  const [selectedSolution, setSelectedSolution] = useState("chatbots");
  const currentSolution = solutions.find(s => s.id === selectedSolution);

  return (
    <div className="w-full py-16 md:py-24 bg-background">
      {/* Background gradient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] bg-gradient-radial from-blue-500/10 to-transparent opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-[50%] h-[50%] bg-gradient-radial from-purple-500/10 to-transparent opacity-30 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 text-brand mb-4">
            <Brain className="h-4 w-4" />
            <span className="text-sm font-medium">AI Automation Solutions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand via-purple-500 to-brand">
            Our Core AI Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-4">
            Our core AI-powered solutions designed to transform your business operations and enhance customer experiences.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left sidebar navigation */}
          <div className="w-[300px] flex-shrink-0">
            {solutions.map((solution) => (
              <motion.button
                key={solution.id}
                className={cn(
                  "relative w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 mb-2",
                  selectedSolution === solution.id 
                    ? "bg-[#1e2124] text-white" 
                    : "hover:bg-[#1e2124]/50"
                )}
                onClick={() => setSelectedSolution(solution.id)}
              >
                <span className="w-8 h-8 flex items-center justify-center">
                  {solution.icon}
                </span>
                <span className="font-medium">
                  {solution.title}
                </span>
                
                {selectedSolution === solution.id && (
                  <motion.div 
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500"
                    layoutId="activeIndicator"
                  />
                )}
              </motion.button>
            ))}
          </div>
          
          {/* Right side content */}
          <div className="flex-1">
            {currentSolution && (
              <div className="bg-[#1e2124] rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center">
                    {currentSolution.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{currentSolution.title}</h3>
                </div>
                
                <p className="text-gray-400 text-lg mb-8">
                  {currentSolution.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {currentSolution.features.map((feature, i) => (
                    <div 
                      key={i}
                      className="bg-[#13151a] rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 text-blue-500 mb-2">
                        {feature.icon}
                        <h4 className="font-medium text-blue-400">{feature.title}</h4>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {currentSolution.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="bg-[#13151a] rounded-xl p-4 text-center"
                    >
                      <span className="text-2xl font-bold text-blue-500 block mb-1">
                        {metric.value}
                      </span>
                      <span className="text-sm text-gray-400">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Service detail card */}
        <div className="lg:w-2/3 mx-auto mb-24">
          <AnimatePresence mode="wait">
            {solutions.map((service, index) => (
              activeService === index && (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="relative overflow-hidden rounded-2xl p-6 border border-blue-500/20 bg-background/50 backdrop-blur-sm"
                >
                  <PixelCanvas
                    gap={10}
                    speed={25}
                    colors={["#e0f2fe", "#7dd3fc", "#0ea5e9"]}
                    variant="icon"
                  />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}