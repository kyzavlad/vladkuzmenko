"use client";

import { AnimatedCard } from "@/components/ui/feature-block-animated-card";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";

// Logo Components - Moved to the top
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
        d="M26.153 11.46a6.888 6.888 0 0 0-.608-5.73 7.117 7.117 0 0 0-3.29-2.93 7.238 7.238 0 0 0-4.41-.454a7.065 7.065 0 0 0-2.41-1.742A7.15 7.15 0 0 0 12.514 0a7.216 7.216 0 0 0-4.217 1.346 7.061 7.061 0 0 0-2.603 3.539 7.12 7.12 0 0 0-2.734 1.188A7.012 7.012 0 0 0 .966 8.268a6.979 6.979 0 0 0 .88 8.273 6.89 6.89 0 0 0 .607 5.729 7.117 7.117 0 0 0 3.29 2.93 7.238 7.238 0 0 0 4.41.454 7.061 7.061 0 0 0 2.409 1.742c.92.404 1.916.61 2.923.604a7.215 7.215 0 0 0 4.22-1.345 7.06 7.06 0 0 0 2.605-3.543 7.116 7.116 0 0 0 2.734-1.187 7.01 7.01 0 0 0 1.993-2.196 6.978 6.978 0 0 0-.884-8.27Z"
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

// Placeholder logos - replace with actual SVGs
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
  <div className={className}>T</div>
);

const PowerBILogo = ({ className }: { className?: string }) => (
  <div className={className}>BI</div>
);

const MetabaseLogo = ({ className }: { className?: string }) => (
  <div className={className}>MB</div>
);

// Technologies array - Moved after logo components
const technologies = [
  {
    title: "Advanced AI Models",
    description: "Powered by Claude 3.7, GPT-4.5, and DeepSeek V3 for sophisticated content generation",
    icons: [
      { icon: <ClaudeLogo className="h-4 w-4" />, size: "sm" as const },
      { icon: <OpenAILogo className="h-8 w-8 dark:text-white" />, size: "lg" as const },
      { icon: <GeminiLogo className="h-4 w-4" />, size: "sm" as const },
    ],
  },
  {
    title: "Automation Platforms",
    description: "Enterprise-grade workflow automation with Make.com, n8n, and Zapier integration",
    icons: [
      { icon: <MakeComLogo className="h-4 w-4" />, size: "sm" as const },
      { icon: <N8nLogo className="h-8 w-8 dark:text-white" />, size: "lg" as const },
      { icon: <ZapierLogo className="h-4 w-4" />, size: "sm" as const },
    ],
  },
  {
    title: "Data & Analytics",
    description: "Real-time dashboards and predictive modeling powered by Tableau, PowerBI and Metabase",
    icons: [
      { icon: <TableauLogo className="h-4 w-4" />, size: "sm" as const },
      { icon: <PowerBILogo className="h-8 w-8 dark:text-white" />, size: "lg" as const },
      { icon: <MetabaseLogo className="h-4 w-4" />, size: "sm" as const },
    ],
  }
];

export function TechnologySection() {
  return (
    <div className="w-full py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 text-brand mb-4">
            <Brain className="h-4 w-4" />
            <span className="text-sm font-medium">Enterprise Technology Stack</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand via-purple-500 to-brand">
            Powered by Latest AI Models
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-4">
            Our enterprise solutions leverage cutting-edge AI models and automation platforms to deliver exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
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