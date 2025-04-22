"use client";

import { BentoGrid } from "@/components/ui/bento-grid";
import { AnimatedCard } from "@/components/ui/feature-block-animated-card";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { PinContainer } from "@/components/ui/3d-pin";
import VideoPlayer from "@/components/ui/video-player";
import { AutomationFormDialog } from "@/components/ui/automation-form-dialog";
import { 
  ArrowRight,
  MessageSquare, 
  Headphones, 
  Calendar, 
  Mail, 
  FileText,
  Users,
  Brain,
  Settings,
  Bot,
  Rocket,
  Globe,
  Zap,
  Gauge,
  CheckCircle2
} from "lucide-react";
import { PixelCanvas } from "@/components/ui/pixel-canvas";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    title: "Lead Generation Suite",
    client: "Global Staffing Agency",
    challenge: "Manual lead generation process limited to 50 contacts per day, resulting in missed opportunities and inconsistent outreach",
    solution: "Implemented AI-powered multi-channel outreach system with deep personalization and automated follow-ups",
    results: [
      "500+ qualified leads contacted daily, up from 50",
      "45% increase in response rates",
      "90% reduction in manual work",
      "315% ROI in first quarter"
    ],
    technologies: [
      "Claude 3.7 for personalization",
      "Make.com for workflow automation",
      "Apollo for lead enrichment",
      "Multi-channel integration (Email, LinkedIn, Twitter)"
    ],
    image: "/case-study-1.webp"
  },
  {
    title: "AI Customer Support",
    client: "Enterprise Software Company",
    challenge: "24+ hour support response times leading to customer dissatisfaction and high churn rate",
    solution: "Deployed 24/7 AI support system with custom-trained chatbots and intelligent routing",
    results: [
      "Response time reduced to under 3 minutes",
      "80% automated resolution rate",
      "Customer satisfaction increased by 55%",
      "$150,000 monthly cost savings"
    ],
    technologies: [
      "GPT-4.5 for natural language",
      "Custom sentiment analysis",
      "Real-time analytics",
      "Seamless human handoff system"
    ],
    image: "/c21e3d219043635.67ab7c0a251c8.webp"
  },
  {
    title: "Smart Booking System",
    client: "International Medical Network",
    challenge: "High no-show rates and inefficient scheduling causing revenue loss and resource underutilization",
    solution: "Implemented AI-powered booking system with smart reminders and capacity optimization",
    results: [
      "35% reduction in no-show rates",
      "95% decrease in scheduling conflicts",
      "60% improvement in resource utilization",
      "$180,000 monthly revenue increase"
    ],
    technologies: [
      "Custom ML scheduling algorithm",
      "Automated SMS/Email reminders",
      "Calendar integration system",
      "Real-time capacity optimization"
    ],
    image: "/case-study-3.webp"
  },
  {
    title: "Email Marketing Automation",
    client: "E-commerce Platform",
    challenge: "Generic email campaigns with low engagement rates and time-consuming manual segmentation",
    solution: "Deployed AI-powered email personalization system with automated segmentation and optimization",
    results: [
      "65% increase in open rates",
      "45% higher click-through rates",
      "28% boost in conversion rates",
      "85% reduction in campaign setup time"
    ],
    technologies: [
      "GPT-4.5 for content generation",
      "ML-based send time optimization",
      "Automated A/B testing",
      "Advanced analytics dashboard"
    ],
    image: "/case-study-4.webp"
  },
  {
    title: "Content Generation Engine",
    client: "Digital Marketing Agency",
    challenge: "Time-consuming content creation process and inconsistent brand voice across channels",
    solution: "Implemented multi-model AI content generation system with brand voice preservation",
    results: [
      "15+ hours saved per week per writer",
      "300% increase in content output",
      "99% brand voice consistency",
      "40% reduction in content costs"
    ],
    technologies: [
      "Claude 3.7 for long-form content",
      "GPT-4.5 for creative writing",
      "Custom brand voice model",
      "Multi-channel distribution system"
    ],
    image: "/case-study-5.webp"
  },
  {
    title: "Voice AI Assistant",
    client: "Insurance Provider",
    challenge: "Long call wait times and high cost of 24/7 phone support operations",
    solution: "Deployed enterprise voice AI system with natural conversation and sentiment analysis",
    results: [
      "85% reduction in wait times",
      "75% calls handled by AI",
      "92% customer satisfaction rate",
      "$250,000 monthly cost savings"
    ],
    technologies: [
      "DeepSeek V3 for voice synthesis",
      "Real-time sentiment analysis",
      "Custom insurance knowledge base",
      "Intelligent call routing system"
    ],
    videoSrc: "https://www.youtube.com/embed/o1H-4kebbQM"
  },
  {
    title: "Financial Process Automation",
    client: "Accounting Firm",
    challenge: "Manual invoice processing and payment reconciliation causing delays and errors",
    solution: "Implemented end-to-end financial automation system with AI-powered document processing",
    results: [
      "95% reduction in processing time",
      "99.9% accuracy in data entry",
      "75% cost reduction in AP/AR",
      "$120,000 annual savings"
    ],
    technologies: [
      "OCR with custom ML models",
      "Automated payment processing",
      "Real-time reconciliation",
      "Financial analytics dashboard"
    ],
    image: "/case-study-7.webp"
  },
  {
    title: "Business Intelligence Suite",
    client: "Retail Chain",
    challenge: "Fragmented data sources and delayed insights hindering decision-making",
    solution: "Deployed AI-powered analytics platform with predictive modeling and real-time dashboards",
    results: [
      "Real-time access to insights",
      "85% faster reporting process",
      "25% increase in sales",
      "40% better inventory management"
    ],
    technologies: [
      "Custom ML prediction models",
      "Real-time data integration",
      "Automated reporting system",
      "Interactive visualization tools"
    ],
    image: "/case-study-8.webp"
  }
];

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
  }
];

// Logo Components
const ClaudeLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 512 512"
      className={className}
    >
      <rect fill="#CC9B7A" width="512" height="512" rx="104.187" ry="105.042" />
      <path
        fill="#1F1F1E"
        fillRule="nonzero"
        d="M318.663 149.787h-43.368l78.952 212.423 43.368.004-78.952-212.427zm-125.326 0l-78.952 212.427h44.255l15.932-44.608 82.846-.004 16.107 44.612h44.255l-79.126-212.427h-45.317zm-4.251 128.341l26.91-74.701 27.083 74.701h-53.993z"
      />
    </svg>
  )
}

const OpenAILogo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.153 11.46a6.888 6.888 0 0 0-.608-5.73 7.117 7.117 0 0 0-3.29-2.93 7.238 7.238 0 0 0-4.41-.454 7.065 7.065 0 0 0-2.41-1.742A7.15 7.15 0 0 0 12.514 0a7.216 7.216 0 0 0-4.217 1.346 7.061 7.061 0 0 0-2.603 3.539 7.12 7.12 0 0 0-2.734 1.188A7.012 7.012 0 0 0 .966 8.268a6.979 6.979 0 0 0 .88 8.273 6.89 6.89 0 0 0 .607 5.729 7.117 7.117 0 0 0 3.29 2.93 7.238 7.238 0 0 0 4.41.454 7.061 7.061 0 0 0 2.409 1.742c.92.404 1.916.61 2.923.604a7.215 7.215 0 0 0 4.22-1.345 7.06 7.06 0 0 0 2.605-3.543 7.116 7.116 0 0 0 2.734-1.187 7.01 7.01 0 0 0 1.993-2.196 6.978 6.978 0 0 0-.884-8.27Z"
        fill="currentColor"
      />
    </svg>
  )
}

const GeminiLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={className}
    >
      <path
        d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
        fill="currentColor"
      />
    </svg>
  )
}

const MakeComLogo = ({ className }: { className?: string }) => (
  <div className={className}>M</div>
);

const N8nLogo = ({ className }: { className?: string }) => (
  <div className={className}>N8N</div>
);

const ZapierLogo = ({ className }: { className?: string }) => (
  <div className={className}>Z</div>
);

const TableauLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M11.654 5.368H9.812V3.524h1.842zm2.746 0h1.842V3.524h-1.842zm0 4.421h1.842V7.947h-1.842zm-2.746 0h1.842V7.947h-1.842zm-2.746 0H7.066V7.947h1.842zm10.984 0h1.842V7.947h-1.842zM6.158 5.368H4.316V3.524h1.842zm5.496 8.842H9.812v-1.842h1.842zm2.746 0h1.842v-1.842h-1.842zm2.746-4.421h1.842V7.947h-1.842zM6.158 9.789H4.316V7.947h1.842zm0 4.421H4.316v-1.842h1.842zm13.73 0h1.842v-1.842h-1.842zm-2.746 4.422h1.842v-1.842h-1.842zm-2.746 0h1.842v-1.842h-1.842zm-2.746 0h1.842v-1.842h-1.842zm-2.746 0H7.066v-1.842h1.842z"/>
  </svg>
);

const PowerBILogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21 1H3C1.9 1 1 1.9 1 3v18c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm-1.5 18.5h-15v-15h15v15z"/>
    <path d="M7.5 12.5h2v5h-2zm3.5-3h2v8h-2zm3.5-3h2v11h-2z"/>
  </svg>
);

const MetabaseLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
  </svg>
);
const solutions = [
  {
    title: "Lead Generation Suite",
    description: "AI-powered multi-channel outreach system with deep personalization, increasing response rates by 45% through intelligent targeting and follow-ups",
    icon: <Brain className="w-4 h-4 text-blue-500" />,
    status: "Live",
    tags: ["Email", "LinkedIn", "Apollo"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&q=80"
  },
  {
    title: "AI Customer Support",
    description: "24/7 intelligent support system with custom-trained chatbots, reducing response time by 80% while maintaining personalized interactions",
    icon: <MessageSquare className="w-4 h-4 text-emerald-500" />,
    status: "Updated",
    tags: ["Support", "AI", "Chat"],
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=500&q=80"
  },
  {
    title: "Smart Scheduling",
    description: "AI-powered booking system with smart capacity planning and no-show prevention, reducing scheduling conflicts by 95%",
    icon: <Calendar className="w-4 h-4 text-purple-500" />,
    status: "Beta",
    tags: ["Calendar", "AI", "Booking"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&q=80"
  },
  {
    title: "Intelligent Email Systems",
    description: "Advanced email automation with AI-powered personalization and smart response handling, boosting engagement by 65%",
    icon: <Mail className="w-4 h-4 text-sky-500" />,
    status: "Live",
    tags: ["Email", "Analytics"],
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=500&q=80"
  },
  {
    title: "AI Content Engine",
    description: "Multi-format content creation powered by GPT-4.5 and Claude 3.7, generating SEO-optimized content across all channels",
    icon: <FileText className="w-4 h-4 text-amber-500" />,
    status: "Updated",
    tags: ["AI", "Content"],
    image: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=800&h=500&q=80"
  },
  {
    title: "Sales Pipeline Automation",
    description: "End-to-end sales process automation with AI-driven lead scoring and smart follow-ups, increasing conversion rates by 40%",
    icon: <Users className="w-4 h-4 text-indigo-500" />,
    status: "Live",
    tags: ["Sales", "CRM", "AI"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=500&q=80"
  },
  {
    title: "Voice AI Platform",
    description: "Enterprise voice automation with natural conversation and real-time sentiment analysis, handling calls 24/7",
    icon: <Headphones className="w-4 h-4 text-rose-500" />,
    status: "Beta",
    tags: ["Voice", "AI"],
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&h=500&q=80"
  },
  {
    title: "Workflow Automation",
    description: "Custom business process automation with predictive analytics and real-time monitoring, reducing operational costs by 75%",
    icon: <Brain className="w-4 h-4 text-teal-500" />,
    status: "Live",
    tags: ["Process", "Analytics"],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&q=80"
  },
];

const technologies = [
  {
    title: "Advanced AI Models",
    description: "Powered by Claude 3.7, GPT-4.5, and DeepSeek V3 for sophisticated content generation",
    icons: [
      { icon: <ClaudeLogo className="h-4 w-4" />, size: "sm" as const },
      { icon: <OpenAILogo className="h-8 w-8 dark:text-white" />, size: "lg" as const },
      { icon: <GeminiLogo className="h-4 w-4" />, size: "sm" as const },
    ]
  },
  {
    title: "Automation Platforms",
    description: "Enterprise-grade workflow automation with Make.com, n8n, and Zapier integration",
    icons: [
      { icon: <MakeComLogo className="h-4 w-4" />, size: "sm" as const },
      { icon: <N8nLogo className="h-8 w-8 dark:text-white" />, size: "lg" as const },
      { icon: <ZapierLogo className="h-4 w-4" />, size: "sm" as const },
    ]
  },
  {
    title: "Data & Analytics",
    description: "Real-time dashboards and predictive modeling powered by Tableau, PowerBI and Metabase",
    icons: [
      { icon: <TableauLogo className="h-4 w-4" />, size: "sm" as const },
      { icon: <PowerBILogo className="h-8 w-8 dark:text-white" />, size: "lg" as const },
      { icon: <MetabaseLogo className="h-4 w-4" />, size: "sm" as const },
    ]
  }
];

export function EnterpriseAISection() {
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

  return (
    <div className="w-full py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] bg-gradient-radial from-blue-500/10 to-transparent opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-[50%] h-[50%] bg-gradient-radial from-purple-500/10 to-transparent opacity-30 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 text-brand mb-4">
            <Brain className="h-4 w-4" />
            <span className="text-sm font-medium">Enterprise AI Automation</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand via-purple-500 to-brand">
            Transform Your Business with AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-4">
            Our enterprise solutions leverage cutting-edge AI models and automation platforms to deliver exceptional results.
          </p>
        </div>

        <div className="flex justify-center mb-24">
          <PinContainer title="AI Automation Platform">
            <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem] bg-gradient-to-b from-slate-800/50 to-slate-800/0 backdrop-blur-sm border border-slate-700/50 rounded-2xl">
              {/* Header */}
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-blue-500 animate-pulse" />
                <div className="text-xs text-slate-400">Enterprise AI</div>
              </div>

              {/* Content */}
              <div className="flex-1 mt-4 space-y-4">
                <div className="text-2xl font-bold text-slate-100">
                  AI Automation Suite
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-blue-400">95%</div>
                    <div className="text-xs text-slate-400">Task Automation</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-emerald-400">75%</div>
                    <div className="text-xs text-slate-400">Cost Reduction</div>
                  </div>
                </div>

                {/* Animated Waves */}
                <div className="relative h-20 overflow-hidden">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i}
                      className="absolute w-full h-20"
                      style={{
                        background: `linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)`,
                        animation: `wave ${2 + i * 0.5}s ease-in-out infinite`,
                        opacity: 0.3 / i,
                        transform: `translateY(${i * 10}px)`,
                      }}
                    />
                  ))}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end">
                  <div className="text-xs text-slate-400">
                    Powered by Claude 3.7
                  </div>
                  <div className="text-blue-400 text-sm font-medium">
                    Explore →
                  </div>
                </div>
              </div>
            </div>
          </PinContainer>

          <style jsx>{`
            @keyframes wave {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }
          `}</style>
        </div>
        {/* Case Studies */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 text-brand mb-4">
              <Rocket className="h-4 w-4" />
              <span className="text-sm font-medium">Success Stories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real Results, Real Impact
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how our AI automation solutions have transformed businesses across industries.
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative overflow-hidden rounded-2xl border border-border/40 bg-background/50 backdrop-blur-sm"
              >
                <div className="grid md:grid-cols-2 gap-6 p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                      <p className="text-muted-foreground">{study.client}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Challenge</h4>
                      <p className="text-muted-foreground">{study.challenge}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Solution</h4>
                      <p className="text-muted-foreground">{study.solution}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Key Results</h4>
                      <ul className="space-y-2">
                        {study.results.map((result, i) => (
                          <li key={i} className="flex items-center gap-2 text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-brand flex-shrink-0" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded-md bg-brand/10 text-brand text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <AutomationFormDialog>
                      <Button className="group">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </AutomationFormDialog>
                  </div>

                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    {study.title === "Voice AI Assistant" ? (
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/o1H-4kebbQM?si=15aiMJ0w6no6zrWS" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="absolute inset-0"
                      />
                    ) : (
                      <img
                        src={study.image}
                        alt={study.title}
                        className="object-cover w-full h-full"
                      />
                    )}
                    {!study.videoSrc && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    )}
                  </div> 
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Service detail card */}
        <div className="lg:w-2/3 mx-auto mb-24">
          <AnimatePresence mode="wait">
            {services.map((service, index) => (
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
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Technology Stack */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="w-full"
            >
              <AnimatedCard
                title={tech.title}
                description={tech.description}
                icons={tech.icons}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
