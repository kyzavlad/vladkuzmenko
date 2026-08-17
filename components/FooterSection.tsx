"use client";

import * as React from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Instagram, Send, Youtube, MessageCircle, Loader2, Check, Mail } from "lucide-react";
import { SITE, submitLead } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";
import { langHref, type Lang } from "@/lib/i18n";
import { TikTokIcon, XIcon } from "@/components/ui/social-icons";

const COPY: Record<Lang, {
  signoff: string;
  nav: string;
  growth: string;
  work: string;
  visibility: string;
  warriors: string;
  performance: string;
  about: string;
}> = {
  en: { signoff: "Systems, products and a stronger standard of execution.", nav: "Explore", growth: "Business", work: "Projects", visibility: "VisibilityOS", warriors: "Warriors Team", performance: "Performance", about: "About" },
  ua: { signoff: "Системи, продукти і вища планка виконання.", nav: "Навігація", growth: "Бізнес", work: "Проєкти", visibility: "VisibilityOS", warriors: "Warriors Team", performance: "Performance", about: "Про мене" },
  ru: { signoff: "Системы, продукты и более высокая планка исполнения.", nav: "Навигация", growth: "Бизнес", work: "Проекты", visibility: "VisibilityOS", warriors: "Warriors Team", performance: "Performance", about: "Обо мне" },
};

type DepthRoute = "visibilityos" | "warriors-team" | "drop";

type DepthCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  cards: { title: string; text: string }[];
};

const DEPTH_COPY: Record<Lang, Record<DepthRoute, DepthCopy>> = {
  en: {
    visibilityos: {
      eyebrow: "After the audit",
      title: "Diagnosis should end in a decision, not another report",
      intro: "The useful sequence is simple: prove the leak, fix the highest-impact layer first, then check the same journey again.",
      cards: [
        { title: "Prioritize", text: "Separate issues that affect trust, conversion or visibility from cosmetic changes that can wait." },
        { title: "Implement", text: "Turn the evidence into a short execution list for your team or into the relevant Growth System." },
        { title: "Re-check", text: "Review the same pages and paths after changes so the next decision is based on evidence, not memory." },
      ],
    },
    "warriors-team": {
      eyebrow: "The point of the network",
      title: "A strong circle is valuable when it improves the quality of decisions",
      intro: "The format is built around real work, direct context and useful relationships rather than passive networking or motivational noise.",
      cards: [
        { title: "Real context", text: "Bring an actual business, training or execution problem instead of discussing ideas in the abstract." },
        { title: "Direct feedback", text: "Useful feedback should make the next move clearer, even when the answer is not comfortable." },
        { title: "Relevant network", text: "Introductions matter when there is a real reason for two people to help each other move faster." },
      ],
    },
    drop: {
      eyebrow: "Before launch",
      title: "The product has to survive three tests before it deserves scale",
      intro: "Performance stays in validation until the routine works for real users and the operating model works in the real world.",
      cards: [
        { title: "Repeatability", text: "The product should be simple enough to use repeatedly, not only interesting for the first week." },
        { title: "Operations", text: "Production, packaging and delivery have to be reliable enough to support the promise." },
        { title: "Economics", text: "Price and unit economics have to make sense before paid growth or a larger launch is justified." },
      ],
    },
  },
  ua: {
    visibilityos: {
      eyebrow: "Після аудиту",
      title: "Діагностика має завершуватися рішенням, а не ще одним звітом",
      intro: "Корисна послідовність проста: довести втрату, спочатку виправити шар із найбільшим впливом, а потім перевірити той самий шлях ще раз.",
      cards: [
        { title: "Пріоритет", text: "Відокремити проблеми довіри, конверсії та видимості від косметичних змін, які можуть зачекати." },
        { title: "Впровадження", text: "Перетворити докази на короткий список дій для вашої команди або на відповідну Growth System." },
        { title: "Повторна перевірка", text: "Після змін перевірити ті самі сторінки й шляхи, щоб наступне рішення спиралося на факти." },
      ],
    },
    "warriors-team": {
      eyebrow: "Сенс мережі",
      title: "Сильне коло має цінність, коли підвищує якість рішень",
      intro: "Формат будується навколо реальної роботи, прямого контексту й корисних зв’язків, а не пасивного нетворкінгу чи мотиваційного шуму.",
      cards: [
        { title: "Реальний контекст", text: "Приносити конкретну бізнес-, тренувальну або виконавчу задачу замість абстрактних розмов." },
        { title: "Прямий фідбек", text: "Корисний фідбек має робити наступний крок яснішим, навіть коли відповідь некомфортна." },
        { title: "Релевантна мережа", text: "Знайомства мають сенс, коли є реальна причина двом людям допомогти одне одному рухатися швидше." },
      ],
    },
    drop: {
      eyebrow: "До запуску",
      title: "Продукт має пройти три перевірки, перш ніж його варто масштабувати",
      intro: "Performance залишається у валідації, доки сам режим не працює для реальних людей, а операційна модель — у реальному світі.",
      cards: [
        { title: "Повторюваність", text: "Продукт має бути достатньо простим для регулярного використання, а не лише цікавим перший тиждень." },
        { title: "Операції", text: "Виробництво, пакування та доставка мають бути достатньо надійними для обіцяного досвіду." },
        { title: "Економіка", text: "Ціна та юніт-економіка мають сходитися до платного масштабування або більшого запуску." },
      ],
    },
  },
  ru: {
    visibilityos: {
      eyebrow: "После аудита",
      title: "Диагностика должна заканчиваться решением, а не ещё одним отчётом",
      intro: "Полезная последовательность проста: доказать потерю, сначала исправить слой с самым большим влиянием, затем проверить тот же путь ещё раз.",
      cards: [
        { title: "Приоритет", text: "Отделить проблемы доверия, конверсии и видимости от косметических изменений, которые могут подождать." },
        { title: "Внедрение", text: "Превратить доказательства в короткий список действий для вашей команды или в соответствующую Growth System." },
        { title: "Повторная проверка", text: "После изменений проверить те же страницы и пути, чтобы следующее решение опиралось на факты." },
      ],
    },
    "warriors-team": {
      eyebrow: "Смысл сети",
      title: "Сильное окружение ценно, когда повышает качество решений",
      intro: "Формат строится вокруг реальной работы, прямого контекста и полезных связей, а не пассивного нетворкинга или мотивационного шума.",
      cards: [
        { title: "Реальный контекст", text: "Приносить конкретную бизнес-, тренировочную или исполнительскую задачу вместо абстрактных разговоров." },
        { title: "Прямой фидбек", text: "Полезный фидбек должен делать следующий шаг яснее, даже когда ответ не самый комфортный." },
        { title: "Релевантная сеть", text: "Знакомства имеют смысл, когда есть реальная причина двум людям помочь друг другу двигаться быстрее." },
      ],
    },
    drop: {
      eyebrow: "До запуска",
      title: "Продукт должен пройти три проверки, прежде чем его стоит масштабировать",
      intro: "Performance остаётся в валидации, пока сам режим не работает для реальных людей, а операционная модель — в реальном мире.",
      cards: [
        { title: "Повторяемость", text: "Продукт должен быть достаточно простым для регулярного использования, а не только интересным первую неделю." },
        { title: "Операции", text: "Производство, упаковка и доставка должны быть достаточно надёжными для обещанного опыта." },
        { title: "Экономика", text: "Цена и юнит-экономика должны сходиться до платного масштабирования или большого запуска." },
      ],
    },
  },
};

const DEPTH_STYLE: Record<DepthRoute, { eyebrow: string; glow: string; border: string; number: string }> = {
  visibilityos: { eyebrow: "text-sky-200/70", glow: "bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,.065),transparent_62%)]", border: "hover:border-sky-300/18", number: "text-sky-200/45" },
  "warriors-team": { eyebrow: "text-violet-200/70", glow: "bg-[radial-gradient(ellipse_at_top,rgba(167,139,250,.065),transparent_62%)]", border: "hover:border-violet-300/18", number: "text-violet-200/45" },
  drop: { eyebrow: "text-emerald-200/70", glow: "bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,.06),transparent_62%)]", border: "hover:border-emerald-300/18", number: "text-emerald-200/45" },
};

export function FooterSection() {
  const { lang, t } = useI18n();
  const pathname = usePathname() || "/";
  const f = t.footer;
  const x = COPY[lang];
  const base = langHref(lang);
  const pageHref = (slug: string) => (base === "/" ? `/${slug}` : `${base}/${slug}`);
  const hashHref = (id: string) => `${base === "/" ? "/" : base}#${id}`;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const nav = [
    [x.growth, pageHref("growth-systems")],
    [x.work, pageHref("growth-systems#portfolio")],
    [x.visibility, pageHref("visibilityos")],
    [x.warriors, pageHref("warriors-team")],
    [x.performance, pageHref("drop")],
    [x.about, hashHref("about")],
  ];

  const depthRoute: DepthRoute | null = pathname.endsWith("/visibilityos") || pathname === "/visibilityos"
    ? "visibilityos"
    : pathname.endsWith("/warriors-team") || pathname === "/warriors-team"
      ? "warriors-team"
      : pathname.endsWith("/drop") || pathname === "/drop"
        ? "drop"
        : null;
  const depth = depthRoute ? DEPTH_COPY[lang][depthRoute] : null;
  const depthStyle = depthRoute ? DEPTH_STYLE[depthRoute] : null;

  const subscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || status === "sending") return;
    setStatus("sending");
    const ok = await submitLead({ intent: "newsletter_signup", language: lang, buttonLabel: "Footer - Newsletter", email });
    setStatus(ok ? "done" : "idle");
    if (ok) setEmail("");
  };

  return (
    <>
      {depth && depthStyle ? (
        <section className="relative overflow-hidden border-t border-white/[.06] bg-[#020202] py-20 md:py-24">
          <div className={`pointer-events-none absolute inset-0 ${depthStyle.glow}`} aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-4xl text-center">
              <span className={`text-[10px] font-semibold uppercase tracking-[.24em] ${depthStyle.eyebrow}`}>{depth.eyebrow}</span>
              <h2 className="section-title mx-auto mt-4 max-w-4xl text-[clamp(2.3rem,4vw,3.8rem)] text-zinc-100">{depth.title}</h2>
              <p className="section-lead mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base sm:leading-8">{depth.intro}</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {depth.cards.map((card, index) => (
                <div key={card.title} className={`rounded-[24px] border border-white/[.08] bg-white/[.018] p-6 transition-colors ${depthStyle.border}`}>
                  <span className={`text-[10px] font-semibold tracking-[.16em] ${depthStyle.number}`}>0{index + 1}</span>
                  <h3 className="mt-4 text-lg font-semibold text-zinc-100">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-500">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <footer className="relative overflow-hidden border-t border-white/[.08] bg-[#010101] py-12 md:py-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[90%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,.055),transparent_67%)]" aria-hidden="true" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_.7fr_1.25fr] lg:gap-14">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/vlad-kuzmenko-logo-gold.png" alt="Vlad Kuzmenko" className="h-auto w-[210px]" />
              <p className="mt-4 max-w-sm text-sm leading-7 text-zinc-500">{x.signoff}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  ["Instagram", SITE.socials.instagram, Instagram],
                  ["YouTube", SITE.socials.youtube, Youtube],
                  ["X", SITE.socials.x, XIcon],
                  ["TikTok", SITE.socials.tiktok, TikTokIcon],
                  ["Telegram", SITE.socials.telegram, Send],
                  ["WhatsApp", SITE.socials.whatsapp, MessageCircle],
                ].map(([label, href, Icon]) => {
                  const SocialIcon = Icon as React.ComponentType<{ className?: string }>;
                  return <a key={String(label)} href={String(href)} target="_blank" rel="noopener noreferrer" aria-label={String(label)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[.08] bg-white/[.025] text-zinc-500 transition-colors hover:border-amber-300/25 hover:text-amber-300"><SocialIcon className="h-4 w-4" /></a>;
                })}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[.2em] text-zinc-600">{x.nav}</h3>
              <nav className="mt-5 space-y-2.5">{nav.map(([label, href]) => <a key={label} href={href} className="block text-sm text-zinc-400 transition-colors hover:text-amber-300">{label}</a>)}</nav>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-zinc-100">{f.newsletterTitle}</h3>
              <p className="mt-2 max-w-md text-sm leading-7 text-zinc-500">{f.newsletterDesc}</p>
              {status === "done" ? (
                <p className="mt-5 flex items-center gap-2 text-sm text-amber-300"><Check className="h-4 w-4" />{f.subscribed}</p>
              ) : (
                <form className="relative mt-5 flex max-w-md" onSubmit={subscribe}>
                  <Input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder={f.emailPh} className="h-12 rounded-xl bg-white/[.035] pr-12 text-white placeholder:text-zinc-600" />
                  <Button type="submit" size="icon" variant="ghost" disabled={status === "sending"} className="absolute right-1.5 top-1/2 h-9 w-9 -translate-y-1/2 rounded-lg text-zinc-500 hover:bg-white/[.05] hover:text-amber-300">{status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}<span className="sr-only">{f.newsletterTitle}</span></Button>
                </form>
              )}
              <a href={`mailto:${SITE.email}`} className="mt-5 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-amber-300"><Mail className="h-4 w-4" /> {SITE.email}</a>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[.07] pt-7 text-center md:flex-row">
            <p className="text-xs text-zinc-700">© {new Date().getFullYear()} Vlad Kuzmenko. {f.rights}</p>
            <nav className="flex flex-wrap justify-center gap-4 text-xs">
              <Dialog>
                <DialogTrigger className="text-zinc-600 transition-colors hover:text-amber-300">{f.privacy}</DialogTrigger>
                <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto border-zinc-800 bg-zinc-950">
                  <DialogHeader><DialogTitle className="text-white">{f.privacy}</DialogTitle></DialogHeader>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-400"><p>When you submit a form on this site, the information you provide is sent to Vlad Kuzmenko so he can respond.</p><p>Your information is not sold. To request access or deletion, email <a href={`mailto:${SITE.email}`} className="text-amber-300">{SITE.email}</a>.</p></div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger className="text-zinc-600 transition-colors hover:text-amber-300">{f.terms}</DialogTrigger>
                <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto border-zinc-800 bg-zinc-950">
                  <DialogHeader><DialogTitle className="text-white">{f.terms}</DialogTitle></DialogHeader>
                  <div className="mt-4 text-sm leading-7 text-zinc-400"><p>This site presents Vlad Kuzmenko services, projects and product concepts. Research-list and early-access requests are expressions of interest, not a purchase.</p></div>
                </DialogContent>
              </Dialog>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
