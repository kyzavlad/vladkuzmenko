"use client";

import { useState } from "react";
import { CalendarDays, CheckCircle2, Clock3 } from "lucide-react";
import type { Lang } from "@/lib/i18n";

const slots = ["09:30", "11:00", "14:30"] as const;
type Slot = (typeof slots)[number];
type Action = "created" | "rescheduled" | "cancelled";

const copy = {
  en: {
    title: "Try the booking workflow",
    purpose: "Choose a time, book it, then move or cancel the appointment. This demo uses sample data in your browser.",
    day: "Wednesday, 2 December",
    slots: "Appointment times",
    booking: "Appointment",
    empty: "No appointment yet",
    cancelled: "Appointment cancelled",
    confirmed: "Confirmed",
    book: "Confirm appointment",
    move: "Move appointment",
    cancel: "Cancel appointment",
    eventLog: "Booking events",
    noEvents: "Events appear here as you make changes.",
    events: { created: "Created", rescheduled: "Rescheduled", cancelled: "Cancelled" },
  },
  ua: {
    title: "Спробуйте сценарій запису",
    purpose: "Оберіть час, запишіться, а потім перенесіть або скасуйте запис. Демо працює у браузері на тестових даних.",
    day: "Середа, 2 грудня",
    slots: "Час прийому",
    booking: "Запис на прийом",
    empty: "Запису ще немає",
    cancelled: "Запис скасовано",
    confirmed: "Підтверджено",
    book: "Підтвердити запис",
    move: "Перенести запис",
    cancel: "Скасувати запис",
    eventLog: "Події запису",
    noEvents: "Тут з’являтимуться події після кожної зміни.",
    events: { created: "Створено", rescheduled: "Перенесено", cancelled: "Скасовано" },
  },
  ru: {
    title: "Попробуйте сценарий записи",
    purpose: "Выберите время, запишитесь, затем перенесите или отмените запись. Демо работает в браузере на тестовых данных.",
    day: "Среда, 2 декабря",
    slots: "Время приёма",
    booking: "Запись на приём",
    empty: "Записи пока нет",
    cancelled: "Запись отменена",
    confirmed: "Подтверждено",
    book: "Подтвердить запись",
    move: "Перенести запись",
    cancel: "Отменить запись",
    eventLog: "События записи",
    noEvents: "Здесь будут появляться события после каждого изменения.",
    events: { created: "Создана", rescheduled: "Перенесена", cancelled: "Отменена" },
  },
} satisfies Record<Lang, {
  title: string;
  purpose: string;
  day: string;
  slots: string;
  booking: string;
  empty: string;
  cancelled: string;
  confirmed: string;
  book: string;
  move: string;
  cancel: string;
  eventLog: string;
  noEvents: string;
  events: Record<Action, string>;
}>;

interface BookingEvent {
  action: Action;
  time: Slot;
}

const buttonClass = "min-h-11 rounded-xl px-4 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-200";

export function BookingWorkflowDemo({ locale }: { locale: Lang }) {
  const t = copy[locale];
  const [selected, setSelected] = useState<Slot>(slots[0]);
  const [events, setEvents] = useState<BookingEvent[]>([]);
  const lastEvent = events.at(-1);
  const appointment = lastEvent?.action !== "cancelled" ? lastEvent?.time : undefined;
  const status = appointment ? t.confirmed : lastEvent ? t.cancelled : t.empty;

  function confirm() {
    if (appointment === selected) return;
    const action = appointment ? "rescheduled" : "created";
    setEvents((previous) => [...previous, { action, time: selected }]);
  }

  function cancel() {
    if (!appointment) return;
    setEvents((previous) => [...previous, { action: "cancelled", time: appointment }]);
  }

  return (
    <section className="container mx-auto max-w-6xl px-4 py-9 sm:py-12" aria-labelledby="booking-demo-title">
      <div data-booking-demo className="overflow-hidden rounded-[26px] border border-teal-300/25 bg-[#071515] text-white shadow-[0_24px_80px_rgba(10,90,79,.15)]">
        <div className="border-b border-teal-200/15 bg-[radial-gradient(ellipse_at_top_right,rgba(45,212,191,.23),transparent_62%)] px-5 py-6 sm:px-8 sm:py-8">
          <CalendarDays aria-hidden className="mb-4 h-8 w-8 rounded-lg bg-teal-200/10 p-1.5 text-teal-200" />
          <h2 id="booking-demo-title" className="text-2xl font-bold tracking-tight sm:text-4xl">{t.title}</h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-[#b3d1cc]">{t.purpose}</p>
        </div>
        <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1.05fr_.95fr]">
          <div className="min-w-0">
            <fieldset>
              <legend className="text-base font-semibold text-teal-100">{t.slots}</legend>
              <p className="mt-2 flex items-center gap-2 text-sm text-[#b3d1cc]"><Clock3 aria-hidden className="h-4 w-4" />{t.day}</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {slots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    aria-pressed={selected === time}
                    onClick={() => setSelected(time)}
                    className={`${buttonClass} px-1 tabular-nums ${selected === time ? "bg-teal-200 text-[#072321]" : "border border-[#315a54] bg-[#102222] text-teal-50 hover:bg-[#193d37]"}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="mt-5 flex flex-wrap gap-2">
              <button type="button" onClick={confirm} disabled={appointment === selected} className={`${buttonClass} bg-teal-300 text-[#092322] hover:bg-teal-100 disabled:bg-[#1c3432] disabled:text-[#a7c0bd]`}>
                {appointment ? t.move : t.book}
              </button>
              {appointment && (
                <button type="button" onClick={cancel} className={`${buttonClass} border border-[#315a54] text-teal-50 hover:bg-[#193d37]`}>
                  {t.cancel}
                </button>
              )}
            </div>
          </div>
          <div className="min-w-0 rounded-2xl border border-[#315a54] bg-[#0e2221] p-4 sm:p-5">
            <h3 className="font-semibold text-teal-100">{t.booking}</h3>
            <p role="status" className="mt-2 flex min-h-6 flex-wrap items-center gap-2 text-sm text-[#c2dcd8]">
              {appointment && <CheckCircle2 aria-hidden className="h-4 w-4 text-teal-200" />}
              {status} {appointment && <time className="font-semibold text-white">{appointment}</time>}
            </p>
            <h3 className="mt-4 border-t border-teal-200/15 pt-4 text-sm font-semibold text-teal-100">{t.eventLog}</h3>
            {events.length === 0 ? <p className="mt-2 text-sm text-[#b3d1cc]">{t.noEvents}</p> : (
              <ol className="mt-2 space-y-1.5 text-sm text-[#bfdbd5]">
                {events.slice(-3).reverse().map((event, index) => (
                  <li key={events.length - index} className="flex flex-wrap justify-between gap-x-3">
                    <span>{t.events[event.action]}</span>
                    <time className="font-medium tabular-nums">{event.time}</time>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
