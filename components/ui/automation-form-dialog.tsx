"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AutomationFormDialogProps {
  children: React.ReactNode;
  className?: string;
}

type FormStep = {
  title: string;
  description?: string;
  fields: {
    id: string;
    label: string;
    type: "text" | "email" | "textarea" | "select";
    placeholder?: string;
    options?: string[];
    required?: boolean;
  }[];
};

const formSteps: FormStep[] = [
  {
    title: "Let's get to know you",
    description: "Tell us about yourself and your company",
    fields: [
      {
        id: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "John",
        required: true
      },
      {
        id: "lastName",
        label: "Last Name", 
        type: "text",
        placeholder: "Smith",
        required: true
      },
      {
        id: "email",
        label: "Work Email",
        type: "email", 
        placeholder: "john@company.com",
        required: true
      },
      {
        id: "company",
        label: "Company Name",
        type: "text",
        placeholder: "Acme Inc",
        required: true
      }
    ]
  },
  {
    title: "Tell us about your business",
    description: "Help us understand your needs better",
    fields: [
      {
        id: "businessDescription",
        label: "What does your company do?",
        type: "textarea",
        placeholder: "Briefly describe your main products/services...",
        required: true
      },
      {
        id: "companySize",
        label: "Company Size",
        type: "select",
        options: [
          "1-10 employees",
          "11-50 employees",
          "51-200 employees",
          "201-500 employees",
          "500+ employees"
        ],
        required: true
      }
    ]
  },
  {
    title: "Your Automation Needs",
    description: "Select the areas where you need automation",
    fields: [
      {
        id: "monthlyRevenue",
        label: "What is your monthly business revenue?",
        type: "select",
        options: [
          "Less than $10,000",
          "$10,000 - $50,000", 
          "$50,000 - $100,000",
          "$100,000 - $500,000",
          "$500,000 - $1,000,000",
          "Over $1,000,000"
        ],
        required: true
      },
      {
        id: "automationCosts",
        label: "How much do you currently spend on tasks you want to automate?",
        type: "select",
        options: [
          "Less than $1,000/month",
          "$1,000 - $5,000/month",
          "$5,000 - $10,000/month", 
          "$10,000 - $50,000/month",
          "Over $50,000/month"
        ],
        required: true
      },
      {
        id: "currentChallenges",
        label: "What are your current challenges?",
        type: "textarea",
        placeholder: "Describe the problems you're trying to solve...",
        required: true
      },
      {
        id: "automationGoals",
        label: "What are your automation goals?",
        type: "textarea",
        placeholder: "What outcomes are you looking to achieve?",
        required: true
      }
    ]
  }
];

export function AutomationFormDialog({ children, className }: AutomationFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const isStepValid = () => {
    const currentFields = formSteps[currentStep].fields;
    return currentFields.every(field => 
      !field.required || (formData[field.id] && formData[field.id].trim() !== "")
    );
  };

  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://n8n.vladkuzmenkoai.com/webhook/b60f2736-ecb9-451a-b38e-5018c3935013", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setOpen(false);
          // Reset form after dialog closes
          setTimeout(() => {
            setSubmitted(false);
            setCurrentStep(0);
            setFormData({});
          }, 300);
        }, 2000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onClick={() => setOpen(true)} className={cn("cursor-pointer", className)}>
        {children}
      </div>
      <DialogContent className="bg-black text-white border-white/10 p-0 max-w-[600px]">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-8 text-center"
            >
              <DialogHeader>
                <DialogTitle>Success</DialogTitle>
              </DialogHeader>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand/20 text-brand">
                <ArrowRight className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
              <p className="text-muted-foreground">
                We'll be in touch with you shortly to discuss your automation needs.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8"
            >
              <DialogHeader>
                <DialogTitle>{formSteps[currentStep].title}</DialogTitle>
              </DialogHeader>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    Step {currentStep + 1} of {formSteps.length}
                  </span>
                </div>
                {formSteps[currentStep].description && (
                  <p className="text-muted-foreground">
                    {formSteps[currentStep].description}
                  </p>
                )}
              </div>

              <div className="space-y-6">
                {formSteps[currentStep].fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label className="text-sm font-medium">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {field.type === "textarea" ? (
                      <Textarea
                        value={formData[field.id] || ""}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="bg-black/50 border-white/10 focus:border-brand"
                      />
                    ) : field.type === "select" ? (
                      <select
                        value={formData[field.id] || ""}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full rounded-md bg-black/50 border border-white/10 focus:border-brand px-3 py-2"
                      >
                        <option value="">Select an option</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        type={field.type}
                        value={formData[field.id] || ""}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="bg-black/50 border-white/10 focus:border-brand"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-between items-center">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="bg-black/50 border-white/10 hover:bg-white/5"
                  >
                    Back
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid() || isSubmitting}
                  className="ml-auto bg-brand hover:bg-brand/90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : currentStep === formSteps.length - 1 ? (
                    "Submit"
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
