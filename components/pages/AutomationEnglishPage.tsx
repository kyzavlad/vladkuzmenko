"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Building2,
  Check,
  ClipboardCheck,
  Headphones,
  Hotel,
  MessageSquare,
  Route,
  ShoppingBag,
  Sparkles,
  UserCheck,
  Workflow,
  Wrench,
} from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { cn } from "@/lib/utils";

type ScenarioKey = "lead" | "support" | "booking" | "commerce";

type Scenario = {
  tab: string;
  source: string;
  messages: Array<{ from: "visitor" | "assistant"; text: string }>;
  fields: Array<{ label: string; value: string }>;
};

const scenarios: Record<ScenarioKey, Scenario> = {
  lead: {
    tab: "Sales / lead",
    source: "Instagram Direct",
    messages: [
      { from: "visitor", text: "I need a consultation. I want to understand the options and likely scope." },
      { from: "assistant", text: "I can collect the context for the right person. What kind of business is this, and which manual step currently takes the most time?" },
      { from: "visitor", text: "A three-location business. Managers repeat the same answers and collect contact details manually." },
    ],
    fields: [
      { label: "Request", value: "Automation consultation" },
      { label: "Business", value: "3-location business" },
      { label: "Bottleneck", value: "Repeated answers and manual contact capture" },
      { label: "Next step", value: "Review one representative enquiry flow" },
    ],
  },
  support: {
    tab: "Support",
    source: "Website chat",
    messages: [
      { from: "visitor", text: "My payment went through, but I still do not have access." },
      { from: "assistant", text: "I can route this correctly. Please share the order email and approximate payment time. Do not send any banking details." },
      { from: "visitor", text: "client@example.com, today at around 11:20." },
    ],
    fields: [
      { label: "Category", value: "Payment / access missing" },
      { label: "Email", value: "client@example.com" },
      { label: "Time", value: "Today, around 11:20" },
      { label: "Route", value: "Billing support" },
    ],
  },
  booking: {
    tab: "Booking",
    source: "Website form",
    messages: [
      { from: "visitor", text: "I would like to book a consultation after 4 PM next week." },
      { from: "assistant", text: "What should the consultation cover, and which days are easiest for you? I will prepare a structured booking request for confirmation." },
      { from: "visitor", text: "Automation of inbound leads. Tuesday or Thursday works." },
    ],
    fields: [
      { label: "Service", value: "Automation consultation" },
      { label: "Time", value: "After 16:00" },
      { label: "Days", value: "Tuesday or Thursday" },
      { label: "Next step", value: "Confirm an available slot" },
    ],
  },
  commerce: {
    tab: "Product selection",
    source: "Messenger",
    messages: [
      { from: "visitor", text: "I need a practical gift within my budget and delivered tomorrow." },
      { from: "assistant", text: "Who is it for, what budget should I stay within, and are there categories I should exclude?" },
      { from: "visitor", text: "For a man, no alcohol. Something practical would be best." },
    ],
    fields: [
      { label: "Task", value: "Practical gift selection" },
      { label: "Budget", value: "Defined by customer" },
      { label: "Constraints", value: "No alcohol, delivery tomorrow" },
      { label: "Preference", value: "Practical product" },
    ],
  },
};

const capabilities = [
  { title: "Lead qualification", text: "Collect context, contact details and intent, then hand a structured lead to the right person." },
  { title: "Customer support", text: "Answer from an approved knowledge base and escalate exceptions instead of inventing an answer." },
  { title: "Booking and requests", text: "Collect service, timing and constraints, then prepare a request for confirmation." },
  { title: "Product or service selection", text: "Ask relevant questions and surface options according to the business rules." },
  { title: "Internal operations", text: "Move structured data between forms, spreadsheets, CRM records and team notifications." },
  { title: "Exception handling", text: "Recognise when automation should stop and involve the responsible person." },
];

const capabilityIcons = [UserCheck, Headphones, ClipboardCheck, ShoppingBag, Workflow, Route];
const caseIcons = [Hotel, Building2, Sparkles, Wrench];

const cases = [
  {
    title: "Hotel Natsionalny",
    status: "Real project",
    real: true,
    text: "AI-assisted guest communication and automation for routing enquiries to the hotel team.",
    result: "Knowledge-base answers, routing rules and controlled human handoff.",
  },
  {
    title: "Dacha TV",
    status: "Real project",
    real: true,
    text: "Website, booking requests and operational flows for local commerce and services.",
    result: "Structured enquiries, team notifications and less manual coordination.",
  },
  {
    title: "TurbotaAI",
    status: "Real project",
    real: true,
    text: "AI product with user flows, subscriptions and access management.",
    result: "A complete digital process rather than a standalone chatbot window.",
  },
  {
    title: "AI system for auto dealers",
    status: "Interactive prototype",
    real: false,
    text: "Qualification flows for vehicle enquiries, test drives, service, trade-in and selection.",
    result: "A prototype used to validate the future process before implementation.",
  },
];

const process = [
  { title: "1. Map the current journey", text: "Identify the enquiry source, manual actions, rules and the point where a person must take over." },
  { title: "2. Choose one first scenario", text: "Start with the flow that repeats most often or creates the largest delay or loss." },
  { title: "3. Build a working version", text: "Configure questions, knowledge, exceptions, notifications and the minimum useful integration." },
  { title: "4. Test on real cases", text: "Correct the logic first. Add more channels and features only after the first flow works reliably." },
];

export function AutomationEnglishPage() {
  const [active, setActive] = useState<ScenarioKey>("lead");
  const scenario = scenarios[active];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.14),transparent_45%)]" />
          <div className="container relative mx-auto max-w-6xl px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="premium-badge mx-auto mb-6 inline-flex items-center gap-2">
                <Bot className="h-4 w-4" /> AI systems for real business processes
              </div>
              <h1 className="mx-auto max-w-5xl text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                Not just a chatbot. <span className="gradient-gold-text">A managed process from enquiry to the next action</span>
              </h1>
              <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
                I design systems that receive enquiries, collect the information a business actually needs, follow its rules and hand a clear result to the responsible person.
              </p>
              <p className="mt-4 text-sm text-zinc-500">Walk through four representative scenarios below.</p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="#live-demo">
                  <Button className="premium-button h-12 px-7">Open interactive demo<ArrowRight className="ml-2 h-4 w-4" /></Button>
                </a>
                <RequestDialog
                  intent="automation_portfolio_process_request"
                  title="Describe the process briefly"
                  description="Tell me where enquiries come from and what the team still does manually. I will suggest the smallest useful first stage."
                  submitLabel="Send request"
                  successTitle="Request received"
                  successMessage="I will review the process and come back with a concrete next step."
                  helpLabel="What should be automated?"
                  helpPlaceholder="For example: Instagram enquiries, booking requests or customer support..."
                  showBuildType={false}
                  context={{ offer: "AI automation discovery", page: "automation portfolio" }}
                >
                  <Button variant="outline" className="h-12 border-amber-300/30 bg-transparent px-7 text-amber-100 hover:bg-amber-300/10">Review my process</Button>
                </RequestDialog>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="live-demo" className="section-tint scroll-mt-24 py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="eyebrow">Interactive demonstration</div>
              <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">See the system logic, not a promise</h2>
              <p className="mt-5 text-lg leading-relaxed text-zinc-400">Choose a scenario to see what the assistant asks and what structured information reaches the manager or responsible person.</p>
            </div>
            <div className="mt-10">
              <p className="mb-4 text-center text-sm font-medium text-zinc-500">Choose a scenario</p>
              <div className="mx-auto grid max-w-4xl gap-2 sm:grid-cols-4">
                {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActive(key)}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-sm font-medium transition",
                      active === key ? "border-amber-300/50 bg-amber-300/10 text-amber-200" : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white",
                    )}
                  >
                    {scenarios[key].tab}
                  </button>
                ))}
              </div>
            </div>
            <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 grid gap-5 lg:grid-cols-[1.08fr_.92fr]">
              <div className="luxe-card p-5 sm:p-7">
                <div className="mb-5 flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 font-medium"><MessageSquare className="h-4 w-4 text-amber-300" />{scenario.tab}</div>
                  <span className="text-xs text-zinc-500">Channel: {scenario.source}</span>
                </div>
                <div className="space-y-4">
                  {scenario.messages.map((message, index) => (
                    <div key={`${message.text}-${index}`} className={cn("flex", message.from === "visitor" ? "justify-end" : "justify-start")}>
                      <div className={cn("max-w-[88%] rounded-2xl px-4 py-3", message.from === "visitor" ? "rounded-br-sm bg-amber-300 text-black" : "rounded-bl-sm border border-white/10 bg-white/[0.05] text-zinc-200")}>
                        <div className={cn("mb-1 text-[11px] font-semibold uppercase tracking-wide", message.from === "visitor" ? "text-black/55" : "text-amber-300/70")}>{message.from === "visitor" ? "Customer" : "AI assistant"}</div>
                        <p className="text-sm leading-relaxed sm:text-base">{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="luxe-card border-amber-300/20 p-5 sm:p-7">
                <div className="mb-5 flex items-center gap-2 border-b border-white/10 pb-4 font-medium"><ClipboardCheck className="h-5 w-5 text-amber-300" />The team receives</div>
                <div className="space-y-3">
                  {scenario.fields.map((field) => (
                    <div key={field.label} className="rounded-xl border border-white/10 bg-black/30 p-4">
                      <div className="text-xs uppercase tracking-wide text-zinc-500">{field.label}</div>
                      <div className="mt-1 text-sm font-medium text-zinc-100">{field.value}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-zinc-400">Context, the next action and structured data without asking the customer the same questions again.</p>
              </div>
            </motion.div>
            <p className="mx-auto mt-6 max-w-4xl text-center text-xs leading-relaxed text-zinc-600">These conversations are demonstrations, not real customers and not promised results. Questions, rules, knowledge and integrations are configured for the actual business process.</p>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center"><div className="eyebrow">What can be automated</div><h2 className="mt-4 text-3xl font-semibold sm:text-5xl">One approach, different business processes</h2></div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((item, index) => {
                const Icon = capabilityIcons[index];
                return <div key={item.title} className="luxe-card p-6"><Icon className="h-6 w-6 text-amber-300" /><h3 className="mt-5 text-xl font-semibold">{item.title}</h3><p className="mt-3 leading-relaxed text-zinc-400">{item.text}</p></div>;
              })}
            </div>
          </div>
        </section>

        <section className="section-tint py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center"><div className="eyebrow">Selected work</div><h2 className="mt-4 text-3xl font-semibold sm:text-5xl">Real implementations kept separate from demonstrations</h2><p className="mt-5 text-lg text-zinc-400">Working projects and concepts are labelled explicitly instead of being presented as the same thing.</p></div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {cases.map((item, index) => {
                const Icon = caseIcons[index];
                return (
                  <article key={item.title} className="luxe-card p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-4"><Icon className="h-7 w-7 text-amber-300" /><span className={cn("rounded-full border px-3 py-1 text-xs font-medium", item.real ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-300" : "border-amber-300/25 bg-amber-300/10 text-amber-200")}>{item.status}</span></div>
                    <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-zinc-400">{item.text}</p>
                    <div className="mt-5 flex gap-2 border-t border-white/10 pt-5 text-sm text-zinc-300"><Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />{item.result}</div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center"><div className="eyebrow">How the work starts</div><h2 className="mt-4 text-3xl font-semibold sm:text-5xl">Start with one narrow process, then expand</h2></div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">{process.map((item) => <div key={item.title} className="luxe-card p-6"><h3 className="text-xl font-semibold text-amber-100">{item.title}</h3><p className="mt-3 leading-relaxed text-zinc-400">{item.text}</p></div>)}</div>
            <div className="mt-10 rounded-2xl border border-amber-300/20 bg-amber-300/[0.05] p-6 sm:p-8"><h3 className="text-xl font-semibold">What this page proves, and what it does not</h3><p className="mt-3 max-w-4xl leading-relaxed text-zinc-400">It demonstrates the approach, interface and handoff logic. It does not prove future conversion, and it does not imply that one template can be connected to every business without adaptation.</p></div>
          </div>
        </section>

        <section className="section-accent py-20 sm:py-24">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-semibold sm:text-5xl">Show me one process your team still handles manually</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-300">I will suggest a concrete first stage without rebuilding the whole business or adding unnecessary features.</p>
            <div className="mt-8">
              <RequestDialog
                intent="automation_portfolio_final_request"
                title="Describe the process briefly"
                description="Tell me where enquiries come from and what the team still does manually. I will suggest the smallest useful first stage."
                submitLabel="Send request"
                successTitle="Request received"
                successMessage="I will review the process and come back with a concrete next step."
                helpLabel="What should be automated?"
                helpPlaceholder="For example: Instagram enquiries, booking requests or customer support..."
                showBuildType={false}
                context={{ offer: "AI automation discovery", page: "automation portfolio final CTA" }}
              >
                <Button className="premium-button h-12 px-8">Review my process<ArrowRight className="ml-2 h-4 w-4" /></Button>
              </RequestDialog>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
