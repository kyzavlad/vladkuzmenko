"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Flame } from "lucide-react";
import { Check } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
  highlighted?: boolean;
  component?: React.ReactNode;
}

interface PricingProps {
  plans: PricingPlan[];
  className?: string;
  isMonthly?: boolean;
}

export function Pricing({
  plans,
  className,
  isMonthly = true,
  ...props
}: PricingProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={cn(
            "rounded-2xl border-[1px] p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative",
            plan.isPopular ? "border-primary border-2" : "border-border",
            plan.highlighted ? "border-gold-medium border-2" : "",
            "flex flex-col",
            !plan.isPopular && !plan.highlighted && "mt-5",
            "z-10"
          )}
        >
          {plan.isPopular && (
            <div className="absolute top-0 right-0 bg-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
              <Flame className="text-primary-foreground h-4 w-4 fill-current" />
              <span className="text-primary-foreground ml-1 font-sans font-semibold">
                Most Popular
              </span>
            </div>
          )}
          {plan.highlighted && !plan.isPopular && (
            <div className="absolute top-0 right-0 bg-gradient-to-r from-gold-light to-gold-dark py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
              <span className="text-black ml-1 font-sans font-semibold">
                Customizable
              </span>
            </div>
          )}
          <div className="flex-1 flex flex-col">
            <p className="text-base font-semibold text-muted-foreground">
              {plan.name}
            </p>
            <div className="mt-6 flex items-center justify-center gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-foreground">
                ${isMonthly ? plan.price : plan.yearlyPrice}
              </span>
            </div>
            <p className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
              {plan.period}
            </p>
            <ul className="mt-5 gap-2 flex flex-col">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-left">{feature}</span>
                </li>
              ))}
            </ul>
            <hr className="w-full my-4" />
            {plan.component ? (
              plan.component
            ) : (
              <Link
                href={plan.href}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors h-9 px-4 py-2 w-full bg-white hover:bg-white/90 text-black border border-input"
              >
                {plan.buttonText}
              </Link>
            )}
            <p className="mt-6 text-xs leading-5 text-muted-foreground">
              {plan.description}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}