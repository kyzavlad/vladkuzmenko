"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Send, Youtube, Dumbbell, Car, Briefcase, Camera } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SITE } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";
import { type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { TikTokIcon, XIcon } from "@/components/ui/social-icons";

type ChannelKey = "youtube" | "instagram" | "tiktok" | "x" | "telegram";

type Copy = { eyebrow: string; titleA: string; titleB: string; bio: string; note: string; topics: { title: string; text: string }[]; follow: string; channels: Record<ChannelKey, string> };

const COPY: Record<Lang, Copy> = {
  en: {
    eyebrow: "Vlad Kuzmenko · personal brand",
    titleA: "The work matters. ", titleB: "So does the life around it.",
    bio: "I build businesses and systems, train, ride, travel when I can, and document the decisions, wins, mistakes and routines that sit behind the public result.",
    note: "The media is not a second sales page. It is where the operating philosophy, lifestyle and build process stay visible over time.",
    topics: [
      { title: "Business", text: "What I am building, how I make decisions and what the work actually looks like." },
      { title: "Training", text: "Discipline, strength, combat training and the routines that keep the standard physical." },
      { title: "Machines", text: "Cars, motorcycles, projects and the part of life that should still feel alive." },
      { title: "Story", text: "Thoughts, lessons, behind-the-scenes moments and longer-form conversations." },
    ],
    follow: "Follow the channel that fits you",
    channels: { youtube: "Long-form ideas, builds and conversations.", instagram: "Life, training, cars and visual updates.", tiktok: "Short moments, opinions and sharp cuts.", x: "Short written thoughts and observations.", telegram: "Closer updates, notes and things that do not fit elsewhere." },
  },
  ua: {
    eyebrow: "Vlad Kuzmenko · особистий бренд",
    titleA: "Робота важлива. ", titleB: "Життя навколо неї — теж.",
    bio: "Будую бізнеси й системи, тренуюся, їжджу, подорожую коли виходить і показую рішення, перемоги, помилки та рутину, що стоять за публічним результатом.",
    note: "Медіа — не друга сторінка продажу. Тут з часом видно спосіб мислення, lifestyle і сам процес побудови.",
    topics: [
      { title: "Business", text: "Що будую, як приймаю рішення і як насправді виглядає робота." },
      { title: "Training", text: "Дисципліна, сила, єдиноборства й рутина, яка тримає стандарт фізичним." },
      { title: "Machines", text: "Авто, мотоцикли, проєкти й частина життя, яка має залишатися живою." },
      { title: "Story", text: "Думки, уроки, моменти за кадром і довші розмови." },
    ],
    follow: "Оберіть канал, який вам ближче",
    channels: { youtube: "Довгі відео, ідеї, проєкти та розмови.", instagram: "Життя, тренування, авто й візуальні апдейти.", tiktok: "Короткі моменти, думки й сильні фрагменти.", x: "Короткі письмові думки та спостереження.", telegram: "Ближчі апдейти, нотатки й те, що не входить в інші канали." },
  },
  ru: {
    eyebrow: "Vlad Kuzmenko · личный бренд",
    titleA: "Работа важна. ", titleB: "Жизнь вокруг неё — тоже.",
    bio: "Строю бизнесы и системы, тренируюсь, езжу, путешествую когда получается и показываю решения, победы, ошибки и рутину, которые стоят за публичным результатом.",
    note: "Медиа — не вторая страница продаж. Здесь со временем видно способ мышления, lifestyle и сам процесс построения.",
    topics: [
      { title: "Business", text: "Что строю, как принимаю решения и как на самом деле выглядит работа." },
      { title: "Training", text: "Дисциплина, сила, единоборства и рутина, которая держит стандарт физическим." },
      { title: "Machines", text: "Авто, мотоциклы, проекты и часть жизни, которая должна оставаться живой." },
      { title: "Story", text: "Мысли, уроки, моменты за кадром и длинные разговоры." },
    ],
    follow: "Выберите канал, который вам ближе",
    channels: { youtube: "Длинные видео, идеи, проекты и разговоры.", instagram: "Жизнь, тренировки, машины и визуальные апдейты.", tiktok: "Короткие моменты, мысли и сильные фрагменты.", x: "Короткие письменные мысли и наблюдения.", telegram: "Более близкие апдейты, заметки и то, что не помещается в другие каналы." },
  },
};

const TOPIC_ICONS = [Briefcase, Dumbbell, Car, Camera];
const CHANNELS: { key: ChannelKey; label: string; handle: string; href: string; icon: LucideIcon | ((p: { className?: string }) => JSX.Element) }[] = [
  { key: "youtube", label: "YouTube", handle: "VladKuzmenkoSpeech", href: SITE.socials.youtube, icon: Youtube },
  { key: "instagram", label: "Instagram", handle: "VladKuzmenkoSXY", href: SITE.socials.instagram, icon: Instagram },
  { key: "tiktok", label: "TikTok", handle: "VladKuzmenkoSXY", href: SITE.socials.tiktok, icon: TikTokIcon },
  { key: "x", label: "X", handle: "VladKuzmenkoSXY", href: SITE.socials.x, icon: XIcon },
  { key: "telegram", label: "Telegram", handle: "VladKuzmenkoSXY", href: SITE.socials.telegram, icon: Send },
];

export function PersonalBrand() {
  const { lang } = useI18n();
  const x = COPY[lang];
  return (
    <section id="content" className="relative scroll-mt-24 overflow-hidden border-t border-zinc-900 bg-black py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_16%,rgba(245,190,52,.075),transparent_34%)]" />
      <div className="container relative mx-auto px-4"><div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><span className="eyebrow">{x.eyebrow}</span><h2 className="mt-5 text-4xl font-black tracking-[-.05em] sm:text-5xl md:text-6xl">{x.titleA}<span className="gradient-gold-text">{x.titleB}</span></h2><p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">{x.bio}</p><p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-600">{x.note}</p></motion.div>
          <div className="grid grid-cols-2 gap-3">{x.topics.map((topic, i) => { const Icon = TOPIC_ICONS[i]; return <motion.div key={topic.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .04 }} className="min-h-[150px] rounded-[22px] border border-white/[.09] bg-[#080808] p-5"><Icon className="h-4 w-4 text-amber-300" /><h3 className="mt-5 text-lg font-black tracking-tight">{topic.title}</h3><p className="mt-2 text-xs leading-5 text-zinc-500 sm:text-sm sm:leading-6">{topic.text}</p></motion.div>; })}</div>
        </div>
        <div className="mt-14 flex items-end justify-between gap-4 border-b border-white/[.08] pb-5"><h3 className="text-2xl font-black tracking-[-.035em] sm:text-3xl">{x.follow}</h3><span className="hidden text-[10px] font-bold uppercase tracking-[.2em] text-zinc-700 sm:block">Vlad Kuzmenko Media</span></div>
        <div className="grid border-b border-white/[.08] sm:grid-cols-2 lg:grid-cols-5">{CHANNELS.map((channel, i) => { const Icon = channel.icon; return <motion.a key={channel.key} href={channel.href} target="_blank" rel="noopener noreferrer" onClick={() => track("social_outbound", { platform: channel.key })} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .035 }} className={`group min-h-[210px] border-white/[.08] p-5 transition hover:bg-white/[.025] sm:p-6 ${i ? "lg:border-l" : ""} ${i >= 2 ? "border-t sm:border-t-0" : ""}`}><div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[.1] bg-white/[.025] text-amber-300 transition group-hover:border-amber-300/25 group-hover:bg-amber-300/[.06]"><Icon className="h-4 w-4" /></span><ArrowUpRight className="h-4 w-4 text-zinc-700 transition group-hover:text-amber-300" /></div><h4 className="mt-6 text-lg font-black">{channel.label}</h4><p className="mt-1 text-xs font-semibold text-amber-300/75">{channel.handle}</p><p className="mt-4 text-sm leading-6 text-zinc-500">{x.channels[channel.key]}</p></motion.a>; })}</div>
      </div></div>
    </section>
  );
}
