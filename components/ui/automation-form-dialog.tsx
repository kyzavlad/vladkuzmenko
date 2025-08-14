// ЗАМЕНИТЕ весь компонент AutomationFormDialog на это:

export function AutomationFormDialog({ children, className }: AutomationFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userLanguage, setUserLanguage] = useState('en');

  // Определяем язык пользователя
  useEffect(() => {
    const browserLang = navigator.language.slice(0, 2);
    setUserLanguage(browserLang);
    
    // Добавляем язык в formData
    setFormData(prev => ({
      ...prev,
      userLanguage: browserLang
    }));
  }, []);

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
    if (!isStepValid()) {
      // Показываем какие поля не заполнены
      const missingFields = formSteps[currentStep].fields
        .filter(field => field.required && (!formData[field.id] || formData[field.id].trim() === ""))
        .map(field => field.label);
      
      if (missingFields.length > 0) {
        alert(`Please fill: ${missingFields.join(', ')}`);
        return;
      }
    }

    if (currentStep < formSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      // Скроллим вверх при переходе
      setTimeout(() => {
        const dialogContent = document.querySelector('[role="dialog"]');
        if (dialogContent) {
          dialogContent.scrollTop = 0;
        }
      }, 100);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      // Скроллим вверх
      setTimeout(() => {
        const dialogContent = document.querySelector('[role="dialog"]');
        if (dialogContent) {
          dialogContent.scrollTop = 0;
        }
      }, 100);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Добавляем дополнительные данные
    const enrichedData = {
      ...formData,
      submittedAt: new Date().toISOString(),
      sourceUrl: window.location.href,
      userAgent: navigator.userAgent
    };
    
    try {
      const response = await fetch(
        "https://n8n.vladkuzmenkoai.com/webhook/b60f2736-ecb9-451a-b38e-5018c3935013", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enrichedData),
        }
      );

      if (response.ok) {
        setSubmitted(true);
        
        // Отправляем событие в Google Analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submit', {
            'event_category': 'engagement',
            'event_label': 'automation_form'
          });
        }
        
        setTimeout(() => {
          setOpen(false);
          // Reset form after dialog closes
          setTimeout(() => {
            setSubmitted(false);
            setCurrentStep(0);
            setFormData({ userLanguage });
          }, 300);
        }, 2000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error. Please try again or contact support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Прогресс бар
  const progress = ((currentStep + 1) / formSteps.length) * 100;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onClick={() => setOpen(true)} className={cn("cursor-pointer", className)}>
        {children}
      </div>
      <DialogContent className="bg-black text-white border-white/10 p-0 max-w-[600px] max-h-[90vh] overflow-y-auto">
        {/* Прогресс бар */}
        <div className="h-1 bg-white/10 w-full">
          <div 
            className="h-full bg-brand transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <AnimatePresence mode="wait">
          {submitted ? (
            // Success screen
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-8 text-center"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
              <p className="text-muted-foreground">
                We'll be in touch within 24 hours to discuss your automation needs.
              </p>
            </motion.div>
          ) : (
            // Form steps
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8"
            >
              {/* Step indicator */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {formSteps.length}
                </span>
                <div className="flex gap-1">
                  {formSteps.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "h-2 w-8 rounded-full transition-colors",
                        index <= currentStep ? "bg-brand" : "bg-white/10"
                      )}
                    />
                  ))}
                </div>
              </div>

              <DialogHeader>
                <DialogTitle>{formSteps[currentStep].title}</DialogTitle>
                {formSteps[currentStep].description && (
                  <p className="text-muted-foreground mt-2">
                    {formSteps[currentStep].description}
                  </p>
                )}
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {formSteps[currentStep].fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label className="text-sm font-medium">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {/* Field inputs remain the same */}
                    {field.type === "textarea" ? (
                      <Textarea
                        value={formData[field.id] || ""}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="bg-black/50 border-white/10 focus:border-brand min-h-[100px]"
                        required={field.required}
                      />
                    ) : field.type === "select" ? (
                      <select
                        value={formData[field.id] || ""}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="w-full rounded-md bg-black/50 border border-white/10 focus:border-brand px-3 py-2 text-white"
                        required={field.required}
                      >
                        <option value="" className="bg-black">Select an option</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option} className="bg-black">
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
                        className="bg-black/50 border-white/10 focus:border-brand text-white"
                        required={field.required}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-between items-center">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="bg-black/50 border-white/10 hover:bg-white/5"
                  >
                    Back
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid() || isSubmitting}
                  className={cn(
                    "bg-brand hover:bg-brand/90",
                    currentStep === 0 && "ml-auto"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : currentStep === formSteps.length - 1 ? (
                    "Submit"
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
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
