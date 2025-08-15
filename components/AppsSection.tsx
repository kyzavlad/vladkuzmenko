"use client";

import { ContactDialog } from "@/components/ui/contact-dialog";

/**
 * 16:9 без обрезаний:
 * - обёртка с padding-top:56.25% → точная геометрия
 * - iframe занимает 100% обёртки
 * - inline-стили перетирают любые глобальные правила для iframe
 */
export function AppsSection() {
  return (
    <section id="apps-section" className="w-full pt-2 pb-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">
            AI-Powered Automation Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transform your business operations with our intelligent automation tools.
            Streamline customer support, marketing, and content creation with cutting-edge AI technology.
          </p>
        </div>

        {/* РЕСПОНСИВНАЯ 16:9 ОБЁРТКА */}
        <div className="mx-auto w-full max-w-6xl">
          <div
            className="relative w-full overflow-hidden rounded-xl shadow-2xl bg-black"
            style={{
              paddingTop: "56.25%",         // 9/16
              maxWidth: "100%",
              // защита от любых «ломающих» правил выше по дереву
              boxSizing: "border-box"
            }}
          >
            <iframe
              title="AI Automation Services by VladKuzmenko.com"
              src="https://www.youtube.com/embed/ZEEfv3zrsXk?rel=0&modestbranding=1&playsinline=1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              // абсолютное позиционирование внутри 16:9-обёртки
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                display: "block",
                border: "0",
                // на случай, если где-то задали object-fit:cover
                objectFit: "contain"
              }}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <ContactDialog triggerText="Get Started" className="inline-block" />
