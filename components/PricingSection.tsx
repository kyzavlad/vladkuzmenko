"use client";

import { Pricing } from "@/components/blocks/pricing";
import { PaymentDialog } from "@/components/ui/payment-dialog";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRef, useState } from "react";

export function PricingSection() {
  const [isMonthly, setIsMonthly] = useState(true);
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      const feedbackEl = document.createElement('div');
      feedbackEl.textContent = '🎉';
      feedbackEl.style.position = 'absolute';
      feedbackEl.style.left = `${x}px`;
      feedbackEl.style.top = `${y}px`;
      feedbackEl.style.fontSize = '24px';
      feedbackEl.style.transform = 'translate(-50%, -50%)';
      feedbackEl.style.zIndex = '9999';
      feedbackEl.style.pointerEvents = 'none';
      document.body.appendChild(feedbackEl);
      
      setTimeout(() => {
        feedbackEl.style.transition = 'all 0.5s ease-out';
        feedbackEl.style.opacity = '0';
        feedbackEl.style.transform = 'translate(-50%, -100px)';
        setTimeout(() => {
          document.body.removeChild(feedbackEl);
        }, 500);
      }, 100);
    }
  };

  const aiAutomationPlans = [
    {
      name: "STARTER",
      price: "2899",
      yearlyPrice: "2319",
      period: "one-time",
      features: [
        "AI Customer Support Bot (Basic)",
        "Email Automation (5 templates)",
        "Content Generation (10 pieces/month)",
        "Analytics Dashboard (Basic)",
        "1 Automation Workflow",
        "1,000 AI Interactions/month",
        "Email Support (48h response)",
        "Community Access"
      ],
      description: "Perfect for small businesses starting with AI automation",
      buttonText: "Get Started",
      href: "/sign-up",
      isPopular: false,
      component: <PaymentDialog 
                  planName="Starter Plan" 
                  planPrice="2899" 
                  planPeriod="one-time" 
                  buttonText="Get Started" 
                  buttonVariant="default" 
                  fullWidth={true} 
                />
    },
    {
      name: "PROFESSIONAL",
      price: "7499",
      yearlyPrice: "5999",
      period: "one-time",
      features: [
        "AI Customer Support Bot (Advanced)",
        "Email Automation (Unlimited templates)",
        "Content Generation (50 pieces/month)",
        "Advanced Analytics & Reporting",
        "25 Automation Workflows",
        "10,000 AI Interactions/month",
        "Priority Support (24h response)",
        "API Access",
        "Team Collaboration Tools",
        "Custom Integrations (2)"
      ],
      description: "Ideal for growing businesses with complex automation needs",
      buttonText: "Get Started",
      href: "/sign-up",
      isPopular: false,
      component: <PaymentDialog 
                  planName="Professional Plan" 
                  planPrice="7499" 
                  planPeriod="one-time" 
                  buttonText="Get Started" 
                  buttonVariant="default" 
                  fullWidth={true} 
                />
    },
    {
      name: "ENTERPRISE",
      price: "14599",
      yearlyPrice: "11679",
      period: "one-time",
      features: [
        "AI Customer Support Bot (Enterprise)",
        "Email Automation (Unlimited + Custom)",
        "Content Generation (Unlimited)",
        "Enterprise Analytics Suite",
        "Unlimited Automation Workflows",
        "Unlimited AI Interactions",
        "Dedicated Account Manager",
        "24/7 Premium Support",
        "Custom Integrations (Unlimited)",
        "Advanced Security Features",
        "SLA Guarantees",
        "Team Training & Onboarding",
        "Full Resource Access",
        "Custom AI Model Training"
      ],
      description: "For organizations requiring custom AI automation solutions",
      buttonText: "Contact Sales",
      href: "/contact",
      isPopular: false,
      component: <ContactDialog 
                  triggerText="Contact Sales" 
                  className="w-full" 
                />
    },
    {
      name: "CUSTOM",
      price: "899",
      yearlyPrice: "719",
      period: "one-time",
      features: [
        "Select only the services you need",
        "Flexible AI Support Bot options",
        "Pay-per-use Email Automation",
        "On-demand Content Generation",
        "Custom Analytics Dashboard",
        "Scalable Workflow options",
        "Pay-as-you-go AI Interactions",
        "Standard Support included",
        "Integration assistance",
        "Personalized pricing"
      ],
      description: "Tailored solution for specific automation needs",
      buttonText: "Get Custom Quote",
      href: "/custom-quote",
      isPopular: true,
      highlighted: true,
      component: <ContactDialog 
                  triggerText="Get Custom Quote" 
                  className="w-full" 
                />
    }
  ];

  return (
    <div id="pricing-section" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">AI Automation Pricing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect AI automation plan for your business needs. All plans include our core platform features with varying levels of AI capabilities and support.
          </p>
        </div>
        <div className="flex justify-center mb-10">
          <label className="relative inline-flex items-center cursor-pointer">
            <Label>
              <Switch
                ref={switchRef as any}
                checked={!isMonthly}
                onCheckedChange={handleToggle}
                className="relative"
              />
            </Label>
          </label>
          <span className="ml-2 font-semibold">
            Annual billing <span className="text-primary">(Save 20%)</span>
          </span>
        </div>
        <p className="text-center text-sm text-muted-foreground mb-8">
          Annual billing means we'll work with you multiple times throughout the year, providing ongoing support, optimization, and continuous improvement of your AI automation solutions.
        </p>
        <Pricing plans={aiAutomationPlans} isMonthly={isMonthly} />
      </div>
    </div>
  )
}