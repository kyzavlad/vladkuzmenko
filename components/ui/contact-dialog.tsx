"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { ArrowRight } from "lucide-react";
import { AutomationFormDialog } from "@/components/ui/automation-form-dialog";

interface ContactDialogProps {
  triggerText: string;
  children?: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  className?: string;
  isRainbowButton?: boolean;
}

export function ContactDialog({ 
  triggerText, 
  children, 
  variant = "default", 
  className = "",
  isRainbowButton = false
}: ContactDialogProps) {
  
  return (
    <AutomationFormDialog className={className}>
      {children ? (
        children
      ) : isRainbowButton ? (
        <RainbowButton>
          <span className="flex items-center">
            {triggerText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </RainbowButton>
      ) : (
        <Button variant={variant} className="w-full h-9 px-4 py-2 text-sm bg-white hover:bg-white/90 text-black border border-input">{triggerText}</Button>
      )}
    </AutomationFormDialog>
  );
}