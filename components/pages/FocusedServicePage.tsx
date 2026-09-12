"use client";

import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { useI18n } from "@/components/i18n-provider";
import { langHref } from "@/lib/i18n";
import { SITE } from "@/lib/site";

const COPY = {
  en: {
    audit: {
      label: "Website audit · VisibilityOS",
      title: "Find the next useful improvement.",
      description: "We review your website against the action your customer needs to take. You receive findings with evidence, priorities and a proposed scope for the first useful change.",
      steps: ["Share your website, customer and current goal.", "Review the offer, buying path, trust and technical friction.", "Agree the scope, fee and acceptance criteria before implementation."],
      note: "The audit is part of client work. Scope and price are agreed for your situation.",
      cta: "Discuss a website audit",
    },
    collaboration: {
      label: "Warriors · Collaboration",
      title: "Build something useful together.",
      description: "A personal network for people who want to contribute to real projects. Tell me what you can do, when you are available and what kind of work interests you.",
      steps: ["Have a short conversation about skills and availability.", "Choose a concrete task with a clear outcome.", "Agree responsibilities, payment and review before starting."],
      note: "Collaboration is arranged directly, project by project.",
      cta: "Talk about collaboration",
    },
  },
  ua: {
    audit: {
      label: "Аудит сайту · VisibilityOS",
      title: "Знайдемо наступне корисне покращення.",
      description: "Перевіримо сайт з погляду дії, яку має зробити ваш клієнт. Ви отримаєте висновки з доказами, пріоритети та пропозицію першого корисного доопрацювання.",
      steps: ["Надішліть сайт, опишіть клієнта й поточну мету.", "Розглянемо пропозицію, шлях до покупки, довіру й технічні перешкоди.", "Погодимо обсяг, вартість і критерії приймання до початку реалізації."],
      note: "Аудит є частиною клієнтської роботи. Обсяг і вартість погоджуємо під вашу ситуацію.",
      cta: "Обговорити аудит сайту",
    },
    collaboration: {
      label: "Warriors · Співпраця",
      title: "Створимо щось корисне разом.",
      description: "Особисте коло людей для роботи над реальними проєктами. Розкажіть, що вмієте, коли маєте час і яка робота вам цікава.",
      steps: ["Обговоримо навички та доступний час.", "Оберемо конкретну задачу зі зрозумілим результатом.", "Погодимо відповідальність, оплату й перевірку до початку роботи."],
      note: "Домовляємося про співпрацю особисто, під конкретний проєкт.",
      cta: "Обговорити співпрацю",
    },
  },
  ru: {
    audit: {
      label: "Аудит сайта · VisibilityOS",
      title: "Найдём следующее полезное улучшение.",
      description: "Проверим сайт с точки зрения действия, которое должен совершить ваш клиент. Вы получите выводы с доказательствами, приоритеты и предложение первой полезной доработки.",
      steps: ["Пришлите сайт, опишите клиента и текущую цель.", "Разберём предложение, путь к покупке, доверие и технические препятствия.", "Согласуем объём, стоимость и критерии приёмки до начала реализации."],
      note: "Аудит является частью клиентской работы. Объём и стоимость согласуем под вашу ситуацию.",
      cta: "Обсудить аудит сайта",
    },
    collaboration: {
      label: "Warriors · Сотрудничество",
      title: "Создадим что-то полезное вместе.",
      description: "Личный круг людей для работы над реальными проектами. Расскажите, что умеете, когда свободны и какая работа вам интересна.",
      steps: ["Обсудим навыки и доступное время.", "Выберем конкретную задачу с понятным результатом.", "Согласуем ответственность, оплату и проверку до начала работы."],
      note: "Договариваемся о сотрудничестве лично, под конкретный проект.",
      cta: "Обсудить сотрудничество",
    },
  },
};

export function FocusedServicePage({ kind }: { kind: "audit" | "collaboration" }) {
  const { lang } = useI18n();
  const copy = COPY[lang][kind];
  const href = kind === "audit" ? `${langHref(lang)}#contact` : SITE.socials.telegram;
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <section id={kind === "audit" ? "audit" : "collaboration"} className="container mx-auto max-w-5xl px-5 pb-24 pt-40 sm:px-8">
        <p className="text-sm font-medium tracking-wide text-amber-200">{copy.label}</p>
        <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">{copy.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">{copy.description}</p>
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {copy.steps.map((step, index) => (
            <li key={step} className="rounded-2xl border border-white/10 bg-white/[.025] p-6">
              <span className="text-sm text-amber-200">0{index + 1}</span>
              <p className="mt-4 leading-7 text-zinc-200">{step}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-2xl text-sm leading-7 text-zinc-400">{copy.note}</p>
        <a href={href} className="premium-button mt-8 inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-3 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200">{copy.cta}</a>
      </section>
      <FooterSection />
    </main>
  );
}
