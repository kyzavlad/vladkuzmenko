"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";

const copy = {
  en: {
    title: "Try the hotel assistant",
    note: "Explore a sample guest conversation based on the original hotel workflow.",
    initial: "Hello! I can help with room types, hotel services and questions about a stay.",
    scenarios: [
      ["Which rooms can I ask about?", "Tell me your travel dates and how many people are staying. I can then help you compare the room types."],
      ["How do I ask about breakfast?", "I can look up breakfast information and help with questions about meals during your stay."],
      ["How do I ask about my booking?", "Share your booking reference so the hotel team can look up the right reservation and confirm any changes."],
    ],
  },
  ua: {
    title: "Спробувати асистента готелю",
    note: "Приклад діалогу з гостем за сценарієм оригінального асистента.",
    initial: "Вітаю! Допоможу з типами номерів, послугами готелю та питаннями щодо проживання.",
    scenarios: [
      ["Які є типи номерів?", "Вкажіть дати поїздки та кількість гостей. Після цього я допоможу порівняти типи номерів."],
      ["Як дізнатися про сніданок?", "Я можу знайти інформацію про сніданок і допомогти з питаннями про харчування під час проживання."],
      ["Як уточнити деталі бронювання?", "Повідомте номер бронювання. Команда готелю зможе знайти потрібний запис і підтвердити зміни."],
    ],
  },
  ru: {
    title: "Попробовать ассистента отеля",
    note: "Пример диалога с гостем по сценарию оригинального ассистента.",
    initial: "Здравствуйте! Помогу с выбором номера, услугами отеля и вопросами о проживании.",
    scenarios: [
      ["Какие есть типы номеров?", "Укажите даты поездки и количество гостей. После этого я помогу сравнить типы номеров."],
      ["Как узнать о завтраке?", "Я могу найти информацию о завтраке и помочь с вопросами о питании во время проживания."],
      ["Как уточнить детали бронирования?", "Сообщите номер бронирования. Команда отеля сможет найти нужную запись и подтвердить изменения."],
    ],
  },
} as const;

export function HotelAssistantDemo({ locale }: { locale: Lang }) {
  const [selected, setSelected] = useState<number | null>(null);
  const x = copy[locale];
  const exchange = selected === null ? null : x.scenarios[selected];

  return (
    <section id="assistant-demo" aria-labelledby="assistant-demo-title" className="scroll-mt-28 py-10 sm:py-14">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-6 rounded-[28px] border border-amber-300/20 bg-[#0c0b09] p-5 sm:p-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h2 id="assistant-demo-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">{x.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{x.note}</p>
            <div className="mt-6 grid gap-2">
              {x.scenarios.map(([question], index) => (
                <button
                  key={index}
                  type="button"
                  aria-pressed={selected === index}
                  onClick={() => setSelected(index)}
                  className="rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-left text-sm text-zinc-200 transition hover:border-amber-300/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-300 aria-pressed:border-amber-300/55 aria-pressed:bg-amber-300/10"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          <div aria-live="polite" className="min-h-52 space-y-4 rounded-2xl border border-white/10 bg-black/45 p-4 sm:p-6">
            <p className="mr-6 rounded-2xl rounded-tl-sm bg-white/10 p-4 text-sm leading-6 text-zinc-100">{x.initial}</p>
            {exchange && (
              <>
                <p className="ml-6 rounded-2xl rounded-tr-sm bg-amber-300/15 p-4 text-sm leading-6 text-amber-50">{exchange[0]}</p>
                <p className="mr-6 rounded-2xl rounded-tl-sm bg-white/10 p-4 text-sm leading-6 text-zinc-100">{exchange[1]}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
