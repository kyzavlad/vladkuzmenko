"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Calendar, CheckCircle, Loader2, Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SITE, submitLead } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";
import { langHref, type Lang } from "@/lib/i18n";

type Copy = {
  eyebrow: string; titleA: string; titleB: string; desc: string; pathTitle: string;
  paths: { title: string; text: string; cta: string; slug: string }[];
  formTitle: string; formDesc: string; name: string; email: string; contact: string; message: string;
  send: string; sending: string; error: string; sentTitle: string; sent: string;
};

const COPY: Record<Lang, Copy> = {
  en: {
    eyebrow: "Next move", titleA: "If something should be moving faster, ", titleB: "show me where it gets stuck.",
    desc: "For client work, start with the business bottleneck. For software or Warriors Team, use the dedicated path. If you are not sure, send the situation in plain language and I will route it from there.",
    pathTitle: "Choose the shortest path",
    paths: [
      { title: "Build a Growth System", text: "Traffic, conversion, follow-up, web or automation around a real commercial bottleneck.", cta: "Start with the bottleneck", slug: "growth-systems" },
      { title: "Use VisibilityOS", text: "Start with evidence if the website should be performing better but the cause is unclear.", cta: "Open VisibilityOS", slug: "visibilityos" },
      { title: "Join Warriors Team", text: "Apply if what you need is stronger peers, accountability and a better room around the work.", cta: "Explore Warriors", slug: "warriors-team" },
    ],
    formTitle: "Send the situation directly", formDesc: "No pitch deck required. A few lines about what is happening and what you want to change is enough.",
    name: "Name", email: "Email", contact: "Telegram / phone (optional)", message: "What should change?", send: "Send to Vlad", sending: "Sending…", error: "Add your name, email and a short message.", sentTitle: "Received", sent: "Thanks. Your message was sent directly and will be handled from this context.",
  },
  ua: {
    eyebrow: "Наступний крок", titleA: "Якщо щось має рухатися швидше, ", titleB: "покажіть, де воно застрягає.",
    desc: "Для клієнтської роботи почніть із вузького місця бізнесу. Для software або Warriors Team є окремий шлях. Якщо не впевнені, просто опишіть ситуацію своїми словами.",
    pathTitle: "Оберіть найкоротший шлях",
    paths: [
      { title: "Побудувати Growth System", text: "Traffic, conversion, follow-up, web або automation навколо реального комерційного вузького місця.", cta: "Почати з вузького місця", slug: "growth-systems" },
      { title: "Використати VisibilityOS", text: "Почніть з evidence, якщо сайт має працювати краще, але причина втрат незрозуміла.", cta: "Відкрити VisibilityOS", slug: "visibilityos" },
      { title: "Приєднатися до Warriors Team", text: "Подайте заявку, якщо потрібні сильніші peers, accountability та краще середовище навколо роботи.", cta: "Відкрити Warriors", slug: "warriors-team" },
    ],
    formTitle: "Надішліть ситуацію напряму", formDesc: "Презентація не потрібна. Достатньо кількох рядків про те, що відбувається і що хочете змінити.",
    name: "Ім’я", email: "Email", contact: "Telegram / телефон (необов’язково)", message: "Що має змінитися?", send: "Надіслати Vlad", sending: "Надсилаю…", error: "Додайте ім’я, email і коротке повідомлення.", sentTitle: "Отримано", sent: "Дякую. Повідомлення надіслано напряму й буде розглянуте з цим контекстом.",
  },
  ru: {
    eyebrow: "Следующий шаг", titleA: "Если что-то должно двигаться быстрее, ", titleB: "покажите, где оно застревает.",
    desc: "Для клиентской работы начните с узкого места бизнеса. Для software или Warriors Team есть отдельный путь. Если не уверены, просто опишите ситуацию своими словами.",
    pathTitle: "Выберите самый короткий путь",
    paths: [
      { title: "Построить Growth System", text: "Traffic, conversion, follow-up, web или automation вокруг реального коммерческого узкого места.", cta: "Начать с узкого места", slug: "growth-systems" },
      { title: "Использовать VisibilityOS", text: "Начните с evidence, если сайт должен работать лучше, но причина потерь непонятна.", cta: "Открыть VisibilityOS", slug: "visibilityos" },
      { title: "Присоединиться к Warriors Team", text: "Подайте заявку, если нужны сильнее peers, accountability и лучше среда вокруг работы.", cta: "Открыть Warriors", slug: "warriors-team" },
    ],
    formTitle: "Отправьте ситуацию напрямую", formDesc: "Презентация не нужна. Достаточно нескольких строк о том, что происходит и что вы хотите изменить.",
    name: "Имя", email: "Email", contact: "Telegram / телефон (необязательно)", message: "Что должно измениться?", send: "Отправить Vlad", sending: "Отправляю…", error: "Добавьте имя, email и короткое сообщение.", sentTitle: "Получено", sent: "Спасибо. Сообщение отправлено напрямую и будет рассмотрено с этим контекстом.",
  },
};

export function ContactSection() {
  const { lang } = useI18n();
  const x = COPY[lang];
  const base = langHref(lang); const prefix = base === "/" ? "" : base;
  const [form, setForm] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false); const [done, setDone] = useState(false); const [error, setError] = useState(false);
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const valid = !!form.name?.trim() && !!form.email?.trim() && !!form.message?.trim();
  const submit = async () => {
    if (!valid) { setError(true); return; }
    setSubmitting(true); setError(false);
    const ok = await submitLead({ intent: "general_request", language: lang, buttonLabel: "Home final CTA — direct message", ...form });
    setSubmitting(false); if (ok) setDone(true); else setError(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-zinc-900 bg-black py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(245,190,52,.10),transparent_38%)]" />
      <div className="container relative mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-5xl text-center"><span className="eyebrow">{x.eyebrow}</span><h2 className="mt-5 text-4xl font-black tracking-[-.05em] sm:text-5xl md:text-7xl">{x.titleA}<span className="gradient-gold-text">{x.titleB}</span></h2><p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">{x.desc}</p></motion.div>
        <div className="mx-auto mt-14 max-w-6xl"><div className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-zinc-600">{x.pathTitle}</div><div className="grid gap-3 md:grid-cols-3">{x.paths.map((path, i) => <a key={path.slug} href={`${prefix}/${path.slug}`} className="group flex min-h-[230px] flex-col rounded-[24px] border border-white/[.09] bg-[#080808] p-6 transition hover:border-amber-300/25 hover:bg-[#0b0b0b]"><div className="flex items-center justify-between"><Briefcase className="h-5 w-5 text-amber-300" /><span className="text-[10px] font-bold tracking-[.2em] text-zinc-700">0{i + 1}</span></div><h3 className="mt-6 text-xl font-black tracking-[-.03em]">{path.title}</h3><p className="mt-3 flex-1 text-sm leading-6 text-zinc-500">{path.text}</p><div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-300">{path.cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div></a>)}</div></div>
        <div className="mx-auto mt-6 grid max-w-6xl overflow-hidden rounded-[28px] border border-white/[.09] bg-[#070707] lg:grid-cols-[.8fr_1.2fr]">
          <div className="border-b border-white/[.07] p-7 sm:p-9 lg:border-b-0 lg:border-r"><h3 className="text-3xl font-black tracking-[-.04em]">{x.formTitle}</h3><p className="mt-4 text-sm leading-6 text-zinc-500">{x.formDesc}</p><div className="mt-8 space-y-3 text-sm"><a href={SITE.calcom} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-400 transition hover:text-amber-300"><Calendar className="h-4 w-4" />{lang === "ru" ? "Записаться на звонок" : lang === "ua" ? "Записатися на дзвінок" : "Book a call"}</a><a href={SITE.socials.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-400 transition hover:text-amber-300"><Send className="h-4 w-4" />Telegram</a><a href={SITE.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-400 transition hover:text-amber-300"><MessageCircle className="h-4 w-4" />WhatsApp</a><a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-zinc-400 transition hover:text-amber-300"><Mail className="h-4 w-4" />{SITE.email}</a></div></div>
          <div className="p-7 sm:p-9">{done ? <div className="flex min-h-[310px] flex-col items-center justify-center text-center"><span className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/[.07] text-amber-300"><CheckCircle className="h-6 w-6" /></span><h3 className="mt-5 text-2xl font-black">{x.sentTitle}</h3><p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">{x.sent}</p></div> : <div className="grid gap-4"><div className="grid gap-4 sm:grid-cols-2"><Input value={form.name || ""} onChange={(e) => set("name", e.target.value)} placeholder={x.name} className="h-12 border-white/10 bg-white/[.035] text-white placeholder:text-zinc-600" /><Input type="email" value={form.email || ""} onChange={(e) => set("email", e.target.value)} placeholder={x.email} className="h-12 border-white/10 bg-white/[.035] text-white placeholder:text-zinc-600" /></div><Input value={form.phone || ""} onChange={(e) => set("phone", e.target.value)} placeholder={x.contact} className="h-12 border-white/10 bg-white/[.035] text-white placeholder:text-zinc-600" /><Textarea value={form.message || ""} onChange={(e) => set("message", e.target.value)} placeholder={x.message} className="min-h-[130px] border-white/10 bg-white/[.035] text-white placeholder:text-zinc-600" />{error && <p className="text-sm text-red-400">{x.error}</p>}<Button onClick={submit} disabled={submitting || !valid} className="premium-button min-h-12 w-full text-base disabled:opacity-50">{submitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />{x.sending}</> : <><Send className="mr-2 h-5 w-5" />{x.send}</>}</Button></div>}</div>
        </div>
      </div>
    </section>
  );
}
