"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Dumbbell, Flame, Network, Shield, Target, Users } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";

type Copy = {
  eyebrow: string;
  titleA: string;
  titleB: string;
  lead: string;
  note: string;
  apply: string;
  jump: string;
  differenceTitle: string;
  differenceLead: string;
  difference: { title: string; text: string }[];
  journeyTitle: string;
  journeyLead: string;
  journey: { n: string; title: string; text: string }[];
  insideTitle: string;
  inside: { title: string; text: string }[];
  standardsTitle: string;
  standardsLead: string;
  standards: string[];
  fitTitle: string;
  fitYes: string[];
  fitNo: string[];
  finalTitle: string;
  finalText: string;
};

const COPY: Record<Lang, Copy> = {
  en: {
    eyebrow: "Warriors Team · private network",
    titleA: "Do not build everything ",
    titleB: "alone.",
    lead: "A selective private network for people already building business, body, skill and reputation. The value is not access to more content. It is better peers, direct conversations, accountability and a room where execution is expected.",
    note: "Application-based. Built around contribution and standards, not follower count or status theatre.",
    apply: "Apply to Warriors Team",
    jump: "See how the room works",
    differenceTitle: "A network should change the decisions you make.",
    differenceLead: "The point is to compress distance: to a useful introduction, an experienced opinion, a hard truth or the person who can help move a project forward.",
    difference: [
      { title: "Peers with momentum", text: "People who have something real in motion are more useful than a large anonymous audience." },
      { title: "Direct feedback", text: "Bring a decision, problem or opportunity. Get a clear outside view instead of carrying it alone." },
      { title: "Physical standard", text: "Training keeps discipline tangible. The body is part of the operating standard, not a motivational side topic." },
      { title: "Useful network", text: "Introductions and collaboration happen because members know what each other is building and can actually help." },
    ],
    journeyTitle: "From application to contribution",
    journeyLead: "The experience is designed as a progression, not an open chat you join and forget.",
    journey: [
      { n: "01", title: "Apply", text: "Show what you are building, your current standard and what you can contribute." },
      { n: "02", title: "Fit conversation", text: "A short check that the room and expectations make sense on both sides." },
      { n: "03", title: "Enter with context", text: "Introduce your current priorities, bottleneck and the kind of people you can help." },
      { n: "04", title: "Build in the room", text: "Use recurring check-ins, direct feedback and introductions to move real work forward." },
      { n: "05", title: "Raise the standard", text: "Contribution compounds: better decisions, stronger relationships and a higher normal level of execution." },
    ],
    insideTitle: "What the room is built around",
    inside: [
      { title: "Business & execution", text: "Offers, systems, sales, products, hiring, operations and the decisions behind them." },
      { title: "Training & discipline", text: "Strength, combat training, routines and keeping the physical standard visible." },
      { title: "Network & access", text: "Member context, useful introductions, collaborations and direct conversations." },
      { title: "Accountability", text: "A visible next move, progress check-ins and people who notice when execution stalls." },
    ],
    standardsTitle: "Standards before scale",
    standardsLead: "Warriors Team only works if the room stays useful. That means protecting the quality of interaction before trying to make it large.",
    standards: ["Contribute before asking for attention", "Say what is true, not what sounds impressive", "Keep commitments visible", "Protect confidentiality and trust", "Respect the time and ambition of the room"],
    fitTitle: "Who should apply",
    fitYes: ["You are already building something real", "You train or take physical discipline seriously", "You can contribute knowledge, access, experience or execution", "You want peers who will challenge you, not applaud everything"],
    fitNo: ["You only want motivation or passive content", "You want access without contribution", "You are looking for status, follower growth or shortcuts", "You avoid direct feedback and accountability"],
    finalTitle: "Your environment should make your standard harder to lower.",
    finalText: "If that is the kind of room you want around your business and life, send the application. The next step is a fit conversation, not an automatic membership." ,
  },
  ua: {
    eyebrow: "Warriors Team · private network",
    titleA: "Не будуйте все ",
    titleB: "наодинці.",
    lead: "Вибіркова приватна мережа для людей, які вже будують бізнес, тіло, навичку й репутацію. Цінність не в доступі до ще більшої кількості контенту, а в сильніших peers, прямих розмовах, accountability та середовищі, де execution очікується.",
    note: "Вхід через заявку. Основа — внесок і стандарти, а не кількість підписників чи гра в статус.",
    apply: "Подати заявку в Warriors Team",
    jump: "Подивитися, як працює середовище",
    differenceTitle: "Сильна мережа має змінювати ваші рішення.",
    differenceLead: "Сенс — скоротити відстань до корисного знайомства, досвідченої думки, незручної правди або людини, яка реально може зрушити проєкт.",
    difference: [
      { title: "Peers у русі", text: "Люди, в яких уже щось реально відбувається, корисніші за велику анонімну аудиторію." },
      { title: "Прямий фідбек", text: "Принесіть рішення, проблему чи можливість і отримайте зовнішній погляд замість того, щоб тягнути все самому." },
      { title: "Фізичний стандарт", text: "Тренування роблять дисципліну відчутною. Тіло — частина операційного стандарту, а не окрема мотиваційна тема." },
      { title: "Корисна мережа", text: "Знайомства й співпраця виникають, бо люди розуміють, хто що будує і де можуть реально допомогти." },
    ],
    journeyTitle: "Від заявки до внеску",
    journeyLead: "Досвід побудований як прогресія, а не як відкритий чат, до якого приєдналися й забули.",
    journey: [
      { n: "01", title: "Заявка", text: "Покажіть, що будуєте, який у вас зараз стандарт і що можете привнести." },
      { n: "02", title: "Fit-розмова", text: "Коротко перевіряємо, чи підходять середовище й очікування обом сторонам." },
      { n: "03", title: "Вхід з контекстом", text: "Фіксуємо пріоритети, вузьке місце та людей/задачі, де ви самі можете бути корисні." },
      { n: "04", title: "Будувати всередині", text: "Використовуйте регулярні check-ins, прямий фідбек і знайомства для реального руху роботи." },
      { n: "05", title: "Піднімати стандарт", text: "Внесок накопичується: кращі рішення, сильніші стосунки й вищий нормальний рівень виконання." },
    ],
    insideTitle: "Навколо чого побудоване середовище",
    inside: [
      { title: "Business & execution", text: "Офери, системи, продажі, продукти, команда, операції та рішення за ними." },
      { title: "Training & discipline", text: "Сила, єдиноборства, рутина й фізичний стандарт, який залишається видимим." },
      { title: "Network & access", text: "Контекст учасників, корисні знайомства, співпраця й прямі розмови." },
      { title: "Accountability", text: "Видимий наступний крок, перевірка прогресу й люди, які помічають, коли execution зупиняється." },
    ],
    standardsTitle: "Спочатку стандарти, потім масштаб",
    standardsLead: "Warriors Team працює лише якщо середовище залишається корисним. Тому якість взаємодії важливіша за розмір.",
    standards: ["Спочатку внесок, потім увага", "Говорити правду, а не те, що звучить ефектно", "Тримати зобов’язання видимими", "Захищати конфіденційність і довіру", "Поважати час і амбіції людей у середовищі"],
    fitTitle: "Кому варто подаватися",
    fitYes: ["Ви вже будуєте щось реальне", "Ви тренуєтеся або серйозно ставитеся до фізичної дисципліни", "Можете привнести знання, доступ, досвід або execution", "Хочете peers, які кинуть виклик, а не погодяться з усім"],
    fitNo: ["Потрібна лише мотивація або пасивний контент", "Хочете доступ без внеску", "Шукаєте статус, підписників або короткий шлях", "Уникаєте прямого фідбеку й accountability"],
    finalTitle: "Ваше оточення має робити зниження стандарту складнішим.",
    finalText: "Якщо саме таке середовище потрібне навколо бізнесу й життя, надішліть заявку. Наступний крок — fit-розмова, а не автоматичне членство.",
  },
  ru: {
    eyebrow: "Warriors Team · private network",
    titleA: "Не стройте всё ",
    titleB: "в одиночку.",
    lead: "Выборочная приватная сеть для людей, которые уже строят бизнес, тело, навык и репутацию. Ценность не в доступе к ещё большему количеству контента, а в сильных peers, прямых разговорах, accountability и среде, где execution ожидается.",
    note: "Вход через заявку. Основа — вклад и стандарты, а не количество подписчиков или игра в статус.",
    apply: "Подать заявку в Warriors Team",
    jump: "Посмотреть, как работает среда",
    differenceTitle: "Сильная сеть должна менять ваши решения.",
    differenceLead: "Смысл — сократить расстояние до полезного знакомства, опытного мнения, неудобной правды или человека, который реально может сдвинуть проект.",
    difference: [
      { title: "Peers в движении", text: "Люди, у которых уже что-то реально происходит, полезнее большой анонимной аудитории." },
      { title: "Прямой фидбек", text: "Принесите решение, проблему или возможность и получите внешний взгляд вместо того, чтобы тащить всё одному." },
      { title: "Физический стандарт", text: "Тренировки делают дисциплину осязаемой. Тело — часть операционного стандарта, а не отдельная мотивационная тема." },
      { title: "Полезная сеть", text: "Знакомства и совместная работа возникают, потому что люди понимают, кто что строит и где могут реально помочь." },
    ],
    journeyTitle: "От заявки до вклада",
    journeyLead: "Опыт построен как прогрессия, а не как открытый чат, в который вступили и забыли.",
    journey: [
      { n: "01", title: "Заявка", text: "Покажите, что строите, какой у вас сейчас стандарт и что можете привнести." },
      { n: "02", title: "Fit-разговор", text: "Коротко проверяем, подходят ли среда и ожидания обеим сторонам." },
      { n: "03", title: "Вход с контекстом", text: "Фиксируем приоритеты, узкое место и людей/задачи, где вы сами можете быть полезны." },
      { n: "04", title: "Строить внутри", text: "Используйте регулярные check-ins, прямой фидбек и знакомства для реального движения работы." },
      { n: "05", title: "Поднимать стандарт", text: "Вклад накапливается: лучшие решения, сильнее отношения и выше нормальный уровень исполнения." },
    ],
    insideTitle: "Вокруг чего построена среда",
    inside: [
      { title: "Business & execution", text: "Офферы, системы, продажи, продукты, команда, операции и решения за ними." },
      { title: "Training & discipline", text: "Сила, единоборства, рутина и физический стандарт, который остаётся видимым." },
      { title: "Network & access", text: "Контекст участников, полезные знакомства, совместная работа и прямые разговоры." },
      { title: "Accountability", text: "Видимый следующий шаг, проверка прогресса и люди, которые замечают, когда execution останавливается." },
    ],
    standardsTitle: "Сначала стандарты, потом масштаб",
    standardsLead: "Warriors Team работает только если среда остаётся полезной. Поэтому качество взаимодействия важнее размера.",
    standards: ["Сначала вклад, потом внимание", "Говорить правду, а не то, что звучит эффектно", "Держать обязательства видимыми", "Защищать конфиденциальность и доверие", "Уважать время и амбиции людей в среде"],
    fitTitle: "Кому стоит подаваться",
    fitYes: ["Вы уже строите что-то реальное", "Вы тренируетесь или серьёзно относитесь к физической дисциплине", "Можете привнести знания, доступ, опыт или execution", "Хотите peers, которые бросят вызов, а не согласятся со всем"],
    fitNo: ["Нужна только мотивация или пассивный контент", "Хотите доступ без вклада", "Ищете статус, подписчиков или короткий путь", "Избегаете прямого фидбека и accountability"],
    finalTitle: "Ваше окружение должно делать снижение стандарта сложнее.",
    finalText: "Если именно такая среда нужна вокруг бизнеса и жизни, отправьте заявку. Следующий шаг — fit-разговор, а не автоматическое членство.",
  },
};

const differenceIcons = [Users, Target, Dumbbell, Network];
const insideIcons = [Target, Dumbbell, Network, Shield];

function ApplyButton({ label, source, className = "" }: { label: string; source: string; className?: string }) {
  const { t, lang } = useI18n();
  return (
    <RequestDialog intent="warriors_team_application" title={t.warriors.dialogTitle} description={t.warriors.dialogDesc} submitLabel={t.warriors.dialogSubmit} successTitle={t.warriors.dialogSuccessT} successMessage={t.warriors.dialogSuccessM} buttonLabel={`Warriors — ${source}`} showBuildType={false} helpLabel={t.warriors.helpLabel} helpPlaceholder={t.warriors.helpPh} context={{ source, locale: lang }}>
      <Button size="lg" className={`premium-button h-auto min-h-12 px-8 py-3 text-base ${className}`} onClick={() => track("warriors_application_open", { source })}>{label}<ArrowRight className="ml-2 h-4 w-4" /></Button>
    </RequestDialog>
  );
}

export function WarriorsTeamPage() {
  const { lang } = useI18n();
  const x = COPY[lang];

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />
      <main>
        <section className="relative flex min-h-[88vh] items-center overflow-hidden border-b border-white/[.07] pb-16 pt-32 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(245,190,52,.16),transparent_42%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-[24%] select-none text-[20vw] font-black leading-none tracking-[-.08em] text-white/[.018]">WARRIORS</div>
          <div className="container relative mx-auto max-w-6xl px-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[.06] px-3 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-amber-200"><Flame className="h-3.5 w-3.5" />{x.eyebrow}</span>
            <h1 className="mx-auto mt-7 max-w-5xl text-5xl font-black tracking-[-.055em] sm:text-6xl md:text-8xl">{x.titleA}<span className="gradient-gold-text">{x.titleB}</span></h1>
            <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-zinc-300 sm:text-xl sm:leading-8">{x.lead}</p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-600">{x.note}</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><ApplyButton label={x.apply} source="warriors_hero" /><a href="#journey"><Button variant="outline" className="min-h-12 w-full border-white/15 bg-white/[.025] px-8 text-white hover:bg-white/[.07] sm:w-auto">{x.jump}<ChevronDown className="ml-2 h-4 w-4" /></Button></a></div>
          </div>
        </section>

        <section className="border-b border-white/[.07] py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="max-w-4xl"><span className="eyebrow">Why the room exists</span><h2 className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">{x.differenceTitle}</h2><p className="mt-5 max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg">{x.differenceLead}</p></div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {x.difference.map((item, i) => { const Icon = differenceIcons[i]; return <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .04 }} className="rounded-[26px] border border-white/[.09] bg-[#080808] p-6 sm:p-7"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/[.06] text-amber-300"><Icon className="h-5 w-5" /></span><h3 className="mt-6 text-2xl font-black tracking-[-.035em]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-zinc-400">{item.text}</p></motion.div>; })}
            </div>
          </div>
        </section>

        <section id="journey" className="scroll-mt-24 border-b border-white/[.07] bg-[#050505] py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center"><span className="eyebrow">Member journey</span><h2 className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">{x.journeyTitle}</h2><p className="mt-5 text-base leading-7 text-zinc-400">{x.journeyLead}</p></div>
            <div className="relative mx-auto mt-12 max-w-5xl">
              <div className="absolute bottom-8 left-[27px] top-8 w-px bg-gradient-to-b from-amber-300/40 via-amber-300/20 to-transparent sm:left-1/2 sm:-translate-x-1/2" />
              <div className="space-y-4 sm:space-y-6">
                {x.journey.map((item, i) => (
                  <motion.div key={item.n} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`relative grid gap-4 pl-16 sm:grid-cols-2 sm:pl-0 ${i % 2 ? "" : ""}`}>
                    <div className={`rounded-[24px] border border-white/[.09] bg-[#080808] p-5 sm:p-6 ${i % 2 ? "sm:col-start-2" : "sm:text-right"}`}>
                      <div className="text-xs font-black tracking-[.2em] text-amber-300/65">{item.n}</div><h3 className="mt-3 text-xl font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{item.text}</p>
                    </div>
                    <span className="absolute left-[8px] top-6 flex h-10 w-10 items-center justify-center rounded-full border border-amber-300/30 bg-black text-xs font-black text-amber-300 sm:left-1/2 sm:-translate-x-1/2">{item.n}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/[.07] py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center"><span className="eyebrow">Inside Warriors</span><h2 className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">{x.insideTitle}</h2></div>
            <div className="mt-10 grid gap-4 lg:grid-cols-4">
              {x.inside.map((item, i) => { const Icon = insideIcons[i]; return <div key={item.title} className="rounded-[24px] border border-white/[.09] bg-[#080808] p-6"><Icon className="h-5 w-5 text-amber-300" /><h3 className="mt-5 text-xl font-bold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-zinc-500">{item.text}</p></div>; })}
            </div>
          </div>
        </section>

        <section className="border-b border-white/[.07] bg-[#050505] py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
              <div className="rounded-[28px] border border-amber-300/18 bg-[radial-gradient(circle_at_30%_0%,rgba(245,190,52,.10),transparent_42%),#080808] p-7 sm:p-9"><Shield className="h-6 w-6 text-amber-300" /><h2 className="mt-6 text-3xl font-black tracking-[-.04em]">{x.standardsTitle}</h2><p className="mt-4 text-sm leading-6 text-zinc-400">{x.standardsLead}</p></div>
              <div className="rounded-[28px] border border-white/[.09] bg-[#080808] p-7 sm:p-9"><div className="space-y-4">{x.standards.map((item) => <div key={item} className="flex gap-3 border-b border-white/[.07] pb-4 text-sm leading-6 text-zinc-300 last:border-0 last:pb-0"><Check className="mt-1 h-4 w-4 shrink-0 text-amber-300" /><span>{item}</span></div>)}</div></div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/[.07] py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center"><span className="eyebrow">Fit</span><h2 className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">{x.fitTitle}</h2></div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <div className="rounded-[26px] border border-amber-300/18 bg-[#080808] p-7"><div className="mb-5 text-xs font-bold uppercase tracking-[.18em] text-amber-300/75">Strong fit</div><div className="space-y-4">{x.fitYes.map((item) => <div key={item} className="flex gap-3 text-sm leading-6 text-zinc-300"><Check className="mt-1 h-4 w-4 shrink-0 text-amber-300" />{item}</div>)}</div></div>
              <div className="rounded-[26px] border border-white/[.09] bg-[#080808] p-7"><div className="mb-5 text-xs font-bold uppercase tracking-[.18em] text-zinc-600">Probably not a fit</div><div className="space-y-4">{x.fitNo.map((item) => <div key={item} className="flex gap-3 text-sm leading-6 text-zinc-500"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-700" />{item}</div>)}</div></div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="container mx-auto max-w-5xl px-4"><div className="rounded-[30px] border border-amber-300/18 bg-[radial-gradient(circle_at_50%_0%,rgba(245,190,52,.13),transparent_45%),#080808] p-7 text-center sm:p-10 md:p-12"><Flame className="mx-auto h-6 w-6 text-amber-300" /><h2 className="mx-auto mt-5 max-w-4xl text-3xl font-black tracking-[-.045em] sm:text-5xl">{x.finalTitle}</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-400">{x.finalText}</p><div className="mt-8 flex justify-center"><ApplyButton label={x.apply} source="warriors_final" /></div></div></div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
