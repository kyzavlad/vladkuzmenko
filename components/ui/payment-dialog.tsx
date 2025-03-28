"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AutomationFormDialog } from "@/components/ui/automation-form-dialog";

interface PaymentDialogProps {
  planName: string;
  planPrice: string;
  planPeriod: string;
  buttonText: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  fullWidth?: boolean;
  className?: string;
}

export function PaymentDialog({
  planName,
  planPrice,
  planPeriod,
  buttonText,
  buttonVariant = "default",
  fullWidth = false,
  className
}: PaymentDialogProps) {
  const TriggerComponent = fullWidth ? "div" : Button;

  return (
    <AutomationFormDialog>
        <TriggerComponent 
          className={cn(
            fullWidth ? "cursor-pointer" : "",
            className
          )}
          {...(!fullWidth ? { variant: buttonVariant } : {})}
        >
          {fullWidth ? (
            <Button 
              variant={buttonVariant}
              className="w-full"
            >
              {buttonText}
            </Button>
          ) : (
            buttonText
          )}
        </TriggerComponent>
    </AutomationFormDialog>
  );
}