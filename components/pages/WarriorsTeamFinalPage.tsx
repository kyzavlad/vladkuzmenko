"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CircleDollarSign,
  Clock3,
  Handshake,
  LockKeyhole,
  MessageSquareText,
  Network,
  ShieldCheck,
  Target,
  UserCheck,
  Users,
  X,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog, type RequestField } from "@/components/ui/request-dialog";
import { InteractiveSurface } from "@/components/ui/premium-interaction";
import { useI18n } from "@/components/i18n-provider";
import type { Lang } from "@/lib/i18n";

const cadenceIcons: LucideIcon[] = [Target, MessageSquareText, Users, Handshake];
const accessIcons: LucideIcon[] = [UserCheck, MessageSquareText, CircleDollarSign, Network];

const COPY: Record<Lang, {
  badge: string;
  eyebrow: string;
  titleA: string;
  titleB: string;
  lead: string;
  support: string;
  apply: string;
  seeModel: string;
  proofLine: string;
  foundingLabel: string;
  foundingValue: string;
  foundingNote: string;
  capLabel: string;
  capValue: string;
  cadenceLabel: string;
  cadenceValue: string;
  platformLabel: string;
  platformValue: string;
  whyEyebrow: string;
  whyTitle: string;
  whyLead: string;
  anti: string[];
  cadenceEyebrow: string;
  cadenceTitle: string;
  cadenceLead: string;
  cadence: { title: string; text: string; meta: string }[];
  roomEyebrow: string;
  roomTitle: string;
  roomLead: string;
  forYouTitle: string;
  forYou: string[];
  notForYouTitle: string;
  notForYou: string[];
  rulesEyebrow: string;
  rulesTitle: string;
  rulesLead: string;
  rules: { title: string; text: string }[];
  accessEyebrow: string;
  accessTitle: string;
  accessLead: string;
  access: { title: string; text: string }[];
  priceEyebrow: string;
  priceTitle: string;
  priceDesc: string;
  priceBullets: string[];
  priceCta: string;
  noCharge: string;
  faqEyebrow: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  finalEyebrow: string;
  finalTitle: string;
  finalDesc: string;
  dialogTitle: string;
  dialogDesc: string;
  dialogSubmit: string;
  dialogSuccessT: string;
  dialogSuccessM: string;
  applicationFields: RequestField[];
}> = {
  en: {
    badge: "Founding Circle · applications open",
    eyebrow: "Warriors Team · private execution circle",
    titleA: "Build around people who ",
    titleB: "expect proof.",
    lead: "A small private circle for builders and operators already shipping real work. Bring the bottleneck, the decision or the commitment. Leave with a clearer move and people who will notice whether you did it.",
    support: "Not a course, not a public feed and not a lead list. The product is the room: curation, direct feedback, accountability and useful introductions.",
    apply: "Apply for the founding circle",
    seeModel: "See how the circle works",
    proofLine: "Selection is based on execution and contribution, not follower count or status.",
    foundingLabel: "Founding rate",
    foundingValue: "$49 / month",
    foundingNote: "Only after acceptance · month-to-month",
    capLabel: "First circle",
    capValue: "Capped at 8",
    cadenceLabel: "Live cadence",
    cadenceValue: "2 sessions / month",
    platformLabel: "Private layer",
    platformValue: "Telegram + live calls",
    whyEyebrow: "The product",
    whyTitle: "The room is the advantage.",
    whyLead: "Warriors is intentionally small. A stronger filter and a repeatable operating rhythm matter more than another app full of channels.",
    anti: ["No endless course library", "No public member directory", "No unsolicited selling", "No vanity activity metrics"],
    cadenceEyebrow: "Operating rhythm",
    cadenceTitle: "A simple loop that creates pressure to execute.",
    cadenceLead: "Enough structure to compound progress, without turning the circle into another full-time feed to keep up with.",
    cadence: [
      { title: "Monday Commit", text: "Post the one outcome that matters this week and the proof that will show it is done.", meta: "Async · weekly" },
      { title: "Friday Proof", text: "Show what shipped, what moved and what blocked you. Claims without evidence do not count.", meta: "Async · weekly" },
      { title: "Circle Session", text: "A focused 60-minute live room: commitments, two hot seats, decisions and the next move.", meta: "Live · twice monthly" },
      { title: "Useful Intros", text: "Introductions happen when there is a real fit: customer, operator, specialist, partner or peer.", meta: "As needed" },
    ],
    roomEyebrow: "Curation",
    roomTitle: "Who makes the room stronger?",
    roomLead: "No hard revenue threshold in the founding circle. The gate is whether you are already doing real work and can add signal to the room.",
    forYouTitle: "Strong fit",
    forYou: [
      "You are actively building or operating a real business, product, content engine or serious skill.",
      "You can point to something you shipped, sold, improved or learned through execution in the last 30 days.",
      "You want direct feedback and can give useful feedback without performing for status.",
      "You can commit to the weekly async rhythm and two live sessions each month.",
      "You respect confidentiality and want relationships that compound over time.",
    ],
    notForYouTitle: "Wrong fit",
    notForYou: [
      "You mainly want access to prospects, clients or people to pitch.",
      "You are collecting motivation, courses or contacts without consistent execution.",
      "You need a huge community, constant content or a public audience around your membership.",
      "You disappear for weeks, avoid accountability or turn every conversation into self-promotion.",
      "You cannot keep private discussions private.",
    ],
    rulesEyebrow: "Circle protocol",
    rulesTitle: "Trust first. Signal second. Noise last.",
    rulesLead: "The rules are deliberately short because a private group only works when they are enforced.",
    rules: [
      { title: "Confidential by default", text: "Stories, numbers and problems stay inside unless the owner explicitly says otherwise." },
      { title: "No unsolicited selling", text: "Members are not a prospect list. Offers and intros only happen when there is clear mutual relevance." },
      { title: "Contribute before consuming", text: "Bring experience, feedback, introductions or useful questions. Passive spectators weaken the room." },
      { title: "Execution is the scoreboard", text: "We care about what changed between commitments, not how impressive the plan sounded." },
    ],
    accessEyebrow: "Access",
    accessTitle: "Application to circle in four steps.",
    accessLead: "Nobody is auto-approved and nobody is charged for applying.",
    access: [
      { title: "Application", text: "Tell us what you are building, recent proof of execution and what you can contribute." },
      { title: "Fit conversation", text: "A short call checks expectations, timing, group fit and potential conflicts." },
      { title: "Accept + activate", text: "If the fit is clear, the founding membership is activated at $49/month and onboarding starts." },
      { title: "Enter the circle", text: "Join the private Telegram, post your member card and set your first measurable commitment." },
    ],
    priceEyebrow: "Founding membership",
    priceTitle: "$49/month after acceptance.",
    priceDesc: "The founding price is intentionally simple while the first circle proves the operating model. It is month-to-month, and the rate stays locked while a founding membership remains active.",
    priceBullets: ["No fee to apply", "No long contract", "Private circle capped at 8", "2 live sessions each month", "Weekly Commit + Proof rhythm", "Direct feedback and relevant introductions"],
    priceCta: "Apply, no payment now",
    noCharge: "Payment is handled only after a fit decision. There is no public instant checkout because selection comes before access.",
    faqEyebrow: "Questions",
    faqTitle: "What the founding circle is — and is not.",
    faq: [
      { q: "Why only eight people?", a: "The first product to prove is the quality of the room. Eight is small enough for every member to be known and large enough for useful perspective." },
      { q: "Do I need a certain revenue level?", a: "No. The founding gate is execution, honesty and contribution. A real project and recent proof matter more than a vanity threshold." },
      { q: "Why Telegram instead of a custom app?", a: "Because the value is the group, not software. We only move to a dedicated community platform when scale or member needs create a real reason." },
      { q: "What happens if someone stops participating?", a: "Repeated absence without communication or long-term passive membership triggers a check-in, pause or removal so the room stays useful." },
      { q: "Can I sell to other members?", a: "Not unsolicited. If two members have a genuine mutual fit, an introduction or commercial conversation is fine. Prospecting the group is not." },
      { q: "What if the fit is not right?", a: "The application can be declined or waitlisted. That protects both the applicant and the quality of the existing circle." },
    ],
    finalEyebrow: "Founding circle",
    finalTitle: "Bring proof. Leave with a stronger next move.",
    finalDesc: "If you are already building and want a small circle where people remember the commitment you made, apply for the first Warriors group.",
    dialogTitle: "Apply to Warriors Founding Circle",
    dialogDesc: "This is a selective application, not an instant checkout. Tell us what you are building, what you have executed recently and what you can add to the room.",
    dialogSubmit: "Submit application",
    dialogSuccessT: "Application received",
    dialogSuccessM: "Your application is in. If the fit looks strong, Vlad will reach out for a short fit conversation before any payment or access.",
    applicationFields: [
      { id: "name", label: "Your name", required: true, placeholder: "First and last name" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / WhatsApp", type: "tel", required: true, placeholder: "@handle or number" },
      { id: "project", label: "Project / business + link", required: true, placeholder: "What you are building + URL / @handle" },
      { id: "building", label: "What are you actively building right now?", type: "textarea", required: true, placeholder: "Current stage, users/clients if relevant, and the main thing you are trying to move" },
      { id: "proof", label: "What did you ship, sell or materially improve in the last 30 days?", type: "textarea", required: true, placeholder: "Concrete proof of execution" },
      { id: "giveGet", label: "What do you want from the circle, and what can you contribute?", type: "textarea", required: true, placeholder: "Your current bottleneck + experience, feedback or connections you can bring" },
      { id: "commitment", label: "Can you do weekly Commit/Proof and attend two calls per month?", type: "select", required: true, options: ["Yes", "Usually yes — occasional conflicts", "No"] },
    ],
  },
  ua: {
    badge: "Founding Circle · заявки відкриті",
    eyebrow: "Warriors Team · приватне коло виконання",
    titleA: "Будуйте поруч із людьми, які ",
    titleB: "очікують доказів.",
    lead: "Невелике приватне коло для builders та operators, які вже роблять реальну роботу. Приносьте bottleneck, рішення або commitment. Виходьте з чіткішим наступним кроком і людьми, які помітять, чи ви його виконали.",
    support: "Не курс, не публічна стрічка і не база лідів. Продукт — це саме коло: відбір, прямий feedback, accountability та корисні introductions.",
    apply: "Подати заявку у founding circle",
    seeModel: "Як працює коло",
    proofLine: "Відбір базується на execution і внеску, а не на кількості підписників чи статусі.",
    foundingLabel: "Founding rate",
    foundingValue: "$49 / місяць",
    foundingNote: "Лише після прийняття · month-to-month",
    capLabel: "Перше коло",
    capValue: "Максимум 8",
    cadenceLabel: "Live cadence",
    cadenceValue: "2 сесії / місяць",
    platformLabel: "Приватний шар",
    platformValue: "Telegram + live calls",
    whyEyebrow: "Продукт",
    whyTitle: "Перевага — саме коло.",
    whyLead: "Warriors навмисно залишається малим. Сильніший фільтр і повторюваний operating rhythm важливіші за ще один app з десятками каналів.",
    anti: ["Без нескінченної бібліотеки курсів", "Без публічного member directory", "Без unsolicited selling", "Без vanity activity metrics"],
    cadenceEyebrow: "Operating rhythm",
    cadenceTitle: "Простий цикл, який створює тиск виконувати.",
    cadenceLead: "Достатньо структури для прогресу, але без перетворення кола на ще одну стрічку, яку треба постійно наздоганяти.",
    cadence: [
      { title: "Monday Commit", text: "Зафіксуйте один результат тижня і evidence, за яким буде видно, що він завершений.", meta: "Async · щотижня" },
      { title: "Friday Proof", text: "Покажіть, що shipped, що зрушилося і що заблокувало. Слова без evidence не рахуються.", meta: "Async · щотижня" },
      { title: "Circle Session", text: "Фокусна 60-хвилинна live-сесія: commitments, два hot seats, рішення і наступний крок.", meta: "Live · 2× на місяць" },
      { title: "Useful Intros", text: "Знайомства тільки коли є реальний fit: клієнт, operator, specialist, partner або peer.", meta: "За потреби" },
    ],
    roomEyebrow: "Відбір",
    roomTitle: "Хто робить коло сильнішим?",
    roomLead: "У founding circle немає жорсткого revenue threshold. Головне — ви вже робите реальну роботу і можете додавати signal у групу.",
    forYouTitle: "Сильний fit",
    forYou: [
      "Ви активно будуєте або ведете реальний бізнес, продукт, content engine чи серйозний skill.",
      "Можете показати, що shipped, sold, improved або чого навчились через execution за останні 30 днів.",
      "Хочете прямий feedback і вмієте давати корисний feedback без гри у статус.",
      "Можете тримати weekly async rhythm і бути на двох live-сесіях щомісяця.",
      "Поважаєте confidentiality і хочете відносин, які накопичують цінність з часом.",
    ],
    notForYouTitle: "Поганий fit",
    notForYou: [
      "Головна мета — отримати prospects, clients або людей для pitch.",
      "Збираєте motivation, courses або contacts без стабільного execution.",
      "Потрібна величезна community, постійний контент або публічна аудиторія навколо membership.",
      "Зникаєте на тижні, уникаєте accountability або перетворюєте кожну розмову на self-promotion.",
      "Не можете зберігати приватні розмови приватними.",
    ],
    rulesEyebrow: "Circle protocol",
    rulesTitle: "Спочатку trust. Потім signal. Noise — останнім.",
    rulesLead: "Правила короткі навмисно: приватна група працює лише тоді, коли їх реально дотримуються.",
    rules: [
      { title: "Confidential by default", text: "Історії, цифри та проблеми залишаються всередині, якщо власник прямо не дозволив інше." },
      { title: "No unsolicited selling", text: "Учасники — не prospect list. Офери та intros з'являються тільки за взаємної релевантності." },
      { title: "Contribute before consuming", text: "Приносьте досвід, feedback, introductions або сильні питання. Пасивні spectators послаблюють коло." },
      { title: "Execution is the scoreboard", text: "Важливо, що змінилось між commitments, а не наскільки красиво звучав план." },
    ],
    accessEyebrow: "Доступ",
    accessTitle: "Від заявки до кола — чотири кроки.",
    accessLead: "Немає auto-approval і немає оплати за подачу заявки.",
    access: [
      { title: "Application", text: "Розкажіть, що будуєте, покажіть recent proof of execution і що можете внести." },
      { title: "Fit conversation", text: "Короткий дзвінок перевіряє очікування, timing, group fit і можливі конфлікти." },
      { title: "Accept + activate", text: "Якщо fit зрозумілий, founding membership активується за $49/місяць і починається onboarding." },
      { title: "Enter the circle", text: "Вхід у приватний Telegram, member card і перший measurable commitment." },
    ],
    priceEyebrow: "Founding membership",
    priceTitle: "$49/місяць після прийняття.",
    priceDesc: "Founding price навмисно простий, поки перше коло доводить operating model. Оплата month-to-month; ставка зберігається, поки founding membership активний.",
    priceBullets: ["Без оплати за заявку", "Без довгого контракту", "Приватне коло максимум 8", "2 live-сесії щомісяця", "Weekly Commit + Proof", "Direct feedback і релевантні introductions"],
    priceCta: "Подати заявку, без оплати зараз",
    noCharge: "Оплата відбувається тільки після fit decision. Public instant checkout немає, тому що selection передує access.",
    faqEyebrow: "Питання",
    faqTitle: "Чим founding circle є — і чим не є.",
    faq: [
      { q: "Чому лише вісім людей?", a: "Спочатку треба довести якість самого кола. Вісім — достатньо мало, щоб знати кожного, і достатньо багато для різних перспектив." },
      { q: "Потрібен певний рівень доходу?", a: "Ні. Founding gate — execution, чесність і contribution. Реальний проєкт та recent proof важливіші за vanity threshold." },
      { q: "Чому Telegram, а не власний app?", a: "Бо цінність — група, а не software. Dedicated platform з'явиться лише тоді, коли scale або потреби учасників дадуть реальну причину." },
      { q: "Що якщо учасник перестає брати участь?", a: "Повторна відсутність без комунікації або довга пасивність веде до check-in, pause або removal, щоб коло залишалось корисним." },
      { q: "Можна продавати іншим учасникам?", a: "Не unsolicited. Якщо між двома учасниками є справжній взаємний fit, commercial conversation нормальна. Prospecting групи — ні." },
      { q: "Що якщо fit не підходить?", a: "Заявку можна відхилити або поставити у waitlist. Це захищає і кандидата, і якість існуючого кола." },
    ],
    finalEyebrow: "Founding circle",
    finalTitle: "Приносьте proof. Виходьте з сильнішим наступним кроком.",
    finalDesc: "Якщо ви вже будуєте і хочете мале коло, де люди пам'ятають ваш commitment, подайте заявку у першу Warriors group.",
    dialogTitle: "Заявка у Warriors Founding Circle",
    dialogDesc: "Це selective application, а не instant checkout. Розкажіть, що будуєте, що виконали останнім часом і що можете додати до кола.",
    dialogSubmit: "Надіслати заявку",
    dialogSuccessT: "Заявку отримано",
    dialogSuccessM: "Заявка прийшла. Якщо fit виглядає сильним, Vlad напише для короткої fit conversation до будь-якої оплати чи доступу.",
    applicationFields: [
      { id: "name", label: "Ваше ім'я", required: true, placeholder: "Ім'я та прізвище" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / WhatsApp", type: "tel", required: true, placeholder: "@handle або номер" },
      { id: "project", label: "Проєкт / бізнес + посилання", required: true, placeholder: "Що будуєте + URL / @handle" },
      { id: "building", label: "Що ви активно будуєте зараз?", type: "textarea", required: true, placeholder: "Стадія, users/clients якщо релевантно, і головний результат, який рухаєте" },
      { id: "proof", label: "Що ви shipped, sold або materially improved за останні 30 днів?", type: "textarea", required: true, placeholder: "Конкретний proof of execution" },
      { id: "giveGet", label: "Що хочете від кола і що можете дати?", type: "textarea", required: true, placeholder: "Поточний bottleneck + досвід, feedback або connections, які можете принести" },
      { id: "commitment", label: "Можете робити weekly Commit/Proof і бути на двох calls на місяць?", type: "select", required: true, options: ["Так", "Зазвичай так — інколи можливі конфлікти", "Ні"] },
    ],
  },
  ru: {
    badge: "Founding Circle · заявки открыты",
    eyebrow: "Warriors Team · закрытый круг исполнения",
    titleA: "Стройте рядом с людьми, которые ",
    titleB: "ждут доказательств.",
    lead: "Небольшой закрытый круг для builders и operators, которые уже делают реальную работу. Приносите bottleneck, решение или commitment. Уходите с более ясным следующим шагом и людьми, которые заметят, выполнили вы его или нет.",
    support: "Не курс, не публичная лента и не база лидов. Продукт — это сам круг: отбор, прямой feedback, accountability и полезные introductions.",
    apply: "Подать заявку в founding circle",
    seeModel: "Как работает круг",
    proofLine: "Отбор основан на execution и вкладе, а не на количестве подписчиков или статусе.",
    foundingLabel: "Founding rate",
    foundingValue: "$49 / месяц",
    foundingNote: "Только после принятия · month-to-month",
    capLabel: "Первый круг",
    capValue: "Максимум 8",
    cadenceLabel: "Live cadence",
    cadenceValue: "2 сессии / месяц",
    platformLabel: "Закрытый слой",
    platformValue: "Telegram + live calls",
    whyEyebrow: "Продукт",
    whyTitle: "Преимущество — сам круг.",
    whyLead: "Warriors намеренно остаётся маленьким. Сильный фильтр и повторяемый operating rhythm важнее ещё одного app с десятками каналов.",
    anti: ["Без бесконечной библиотеки курсов", "Без публичного member directory", "Без unsolicited selling", "Без vanity activity metrics"],
    cadenceEyebrow: "Operating rhythm",
    cadenceTitle: "Простой цикл, который создаёт давление исполнять.",
    cadenceLead: "Достаточно структуры для накопительного прогресса, но без превращения круга в ещё одну ленту, которую надо постоянно догонять.",
    cadence: [
      { title: "Monday Commit", text: "Зафиксируйте один результат недели и evidence, по которому будет видно, что он завершён.", meta: "Async · еженедельно" },
      { title: "Friday Proof", text: "Покажите, что shipped, что сдвинулось и что заблокировало. Слова без evidence не считаются.", meta: "Async · еженедельно" },
      { title: "Circle Session", text: "Фокусная 60-минутная live-сессия: commitments, два hot seats, решения и следующий шаг.", meta: "Live · 2× в месяц" },
      { title: "Useful Intros", text: "Знакомства только когда есть реальный fit: клиент, operator, specialist, partner или peer.", meta: "По необходимости" },
    ],
    roomEyebrow: "Отбор",
    roomTitle: "Кто делает круг сильнее?",
    roomLead: "В founding circle нет жёсткого revenue threshold. Важнее, что вы уже делаете реальную работу и можете добавлять signal в группу.",
    forYouTitle: "Сильный fit",
    forYou: [
      "Вы активно строите или ведёте реальный бизнес, продукт, content engine или серьёзный skill.",
      "Можете показать, что shipped, sold, improved или чему научились через execution за последние 30 дней.",
      "Хотите прямой feedback и умеете давать полезный feedback без игры в статус.",
      "Можете держать weekly async rhythm и быть на двух live-сессиях каждый месяц.",
      "Уважаете confidentiality и хотите отношений, которые накапливают ценность со временем.",
    ],
    notForYouTitle: "Плохой fit",
    notForYou: [
      "Главная цель — получить prospects, clients или людей для pitch.",
      "Собираете motivation, courses или contacts без стабильного execution.",
      "Нужна огромная community, постоянный контент или публичная аудитория вокруг membership.",
      "Пропадаете на недели, избегаете accountability или превращаете каждый разговор в self-promotion.",
      "Не можете сохранять приватные разговоры приватными.",
    ],
    rulesEyebrow: "Circle protocol",
    rulesTitle: "Сначала trust. Потом signal. Noise — последним.",
    rulesLead: "Правила короткие намеренно: закрытая группа работает только тогда, когда они реально соблюдаются.",
    rules: [
      { title: "Confidential by default", text: "Истории, цифры и проблемы остаются внутри, если владелец прямо не разрешил обратное." },
      { title: "No unsolicited selling", text: "Участники — не prospect list. Офферы и intros появляются только при взаимной релевантности." },
      { title: "Contribute before consuming", text: "Приносите опыт, feedback, introductions или сильные вопросы. Пассивные spectators ослабляют круг." },
      { title: "Execution is the scoreboard", text: "Важно, что изменилось между commitments, а не насколько красиво звучал план." },
    ],
    accessEyebrow: "Доступ",
    accessTitle: "От заявки до круга — четыре шага.",
    accessLead: "Нет auto-approval и нет оплаты за подачу заявки.",
    access: [
      { title: "Application", text: "Расскажите, что строите, покажите recent proof of execution и что можете привнести." },
      { title: "Fit conversation", text: "Короткий звонок проверяет ожидания, timing, group fit и возможные конфликты." },
      { title: "Accept + activate", text: "Если fit понятен, founding membership активируется за $49/месяц и начинается onboarding." },
      { title: "Enter the circle", text: "Вход в закрытый Telegram, member card и первый measurable commitment." },
    ],
    priceEyebrow: "Founding membership",
    priceTitle: "$49/месяц после принятия.",
    priceDesc: "Founding price намеренно простой, пока первый круг доказывает operating model. Оплата month-to-month; ставка сохраняется, пока founding membership активен.",
    priceBullets: ["Без оплаты за заявку", "Без длинного контракта", "Закрытый круг максимум 8", "2 live-сессии ежемесячно", "Weekly Commit + Proof", "Direct feedback и релевантные introductions"],
    priceCta: "Подать заявку, без оплаты сейчас",
    noCharge: "Оплата происходит только после fit decision. Public instant checkout отсутствует, потому что selection идёт раньше access.",
    faqEyebrow: "Вопросы",
    faqTitle: "Чем founding circle является — и чем не является.",
    faq: [
      { q: "Почему только восемь человек?", a: "Сначала нужно доказать качество самого круга. Восемь — достаточно мало, чтобы знать каждого, и достаточно много для разных перспектив." },
      { q: "Нужен определённый уровень дохода?", a: "Нет. Founding gate — execution, честность и contribution. Реальный проект и recent proof важнее vanity threshold." },
      { q: "Почему Telegram, а не свой app?", a: "Потому что ценность — группа, а не software. Dedicated platform появится только когда scale или потребности участников дадут реальную причину." },
      { q: "Что если участник перестанет участвовать?", a: "Повторное отсутствие без коммуникации или долгая пассивность ведёт к check-in, pause или removal, чтобы круг оставался полезным." },
      { q: "Можно продавать другим участникам?", a: "Не unsolicited. Если между двумя участниками есть настоящий взаимный fit, commercial conversation нормальна. Prospecting группы — нет." },
      { q: "Что если fit не подходит?", a: "Заявку можно отклонить или поставить в waitlist. Это защищает и кандидата, и качество существующего круга." },
    ],
    finalEyebrow: "Founding circle",
    finalTitle: "Приносите proof. Уходите с более сильным следующим шагом.",
    finalDesc: "Если вы уже строите и хотите маленький круг, где люди помнят ваш commitment, подайте заявку в первую Warriors group.",
    dialogTitle: "Заявка в Warriors Founding Circle",
    dialogDesc: "Это selective application, а не instant checkout. Расскажите, что строите, что исполнили недавно и что можете добавить в круг.",
    dialogSubmit: "Отправить заявку",
    dialogSuccessT: "Заявка получена",
    dialogSuccessM: "Заявка пришла. Если fit выглядит сильным, Vlad напишет для короткой fit conversation до любой оплаты или доступа.",
    applicationFields: [
      { id: "name", label: "Ваше имя", required: true, placeholder: "Имя и фамилия" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / WhatsApp", type: "tel", required: true, placeholder: "@handle или номер" },
      { id: "project", label: "Проект / бизнес + ссылка", required: true, placeholder: "Что строите + URL / @handle" },
      { id: "building", label: "Что вы активно строите сейчас?", type: "textarea", required: true, placeholder: "Стадия, users/clients если релевантно, и главный результат, который двигаете" },
      { id: "proof", label: "Что вы shipped, sold или materially improved за последние 30 дней?", type: "textarea", required: true, placeholder: "Конкретный proof of execution" },
      { id: "giveGet", label: "Что хотите от круга и что можете дать?", type: "textarea", required: true, placeholder: "Текущий bottleneck + опыт, feedback или connections, которые можете принести" },
      { id: "commitment", label: "Можете делать weekly Commit/Proof и быть на двух calls в месяц?", type: "select", required: true, options: ["Да", "Обычно да — иногда возможны конфликты", "Нет"] },
    ],
  },
};

function ApplyButton({ className = "" }: { className?: string }) {
  const { lang } = useI18n();
  const c = COPY[lang];
  return (
    <RequestDialog
      intent="warriors_team_application"
      title={c.dialogTitle}
      description={c.dialogDesc}
      submitLabel={c.dialogSubmit}
      successTitle={c.dialogSuccessT}
      successMessage={c.dialogSuccessM}
      buttonLabel="Warriors Founding Circle - Apply"
      fields={c.applicationFields}
      context={{ source: "warriors_team_page", locale: lang, cohort: "founding_circle_v1", founding_price_usd_monthly: 49 }}
    >
      <Button className={`premium-button h-auto min-h-12 px-7 py-3.5 text-sm sm:text-base ${className}`}>
        {c.apply}<ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </RequestDialog>
  );
}

function SectionHeading({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[.23em] text-violet-200/70">{eyebrow}</p>
      <h2 className="section-title mt-4 text-[clamp(2.5rem,5vw,4.8rem)] text-zinc-100">{title}</h2>
      {lead ? <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">{lead}</p> : null}
    </div>
  );
}

export function WarriorsTeamFinalPage() {
  const { lang } = useI18n();
  const reduced = useReducedMotion();
  const c = COPY[lang];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020203] text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-white/[.07] pb-24 pt-32 sm:pb-32 sm:pt-40">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-1/2 top-0 h-[780px] w-[98%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,.17),rgba(212,175,55,.035)_38%,transparent_70%)]" />
            <div className="absolute left-[8%] top-44 h-64 w-64 rounded-full bg-violet-500/[.045] blur-3xl" />
            <div className="absolute right-[6%] top-20 h-72 w-72 rounded-full bg-amber-300/[.025] blur-3xl" />
          </div>

          <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-[1.06fr_.94fr] lg:gap-14">
              <motion.div initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[.035] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.17em] text-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,.7)]" />{c.badge}
                </span>
                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[.24em] text-violet-200/70">{c.eyebrow}</p>
                <h1 className="section-title mt-4 max-w-4xl text-[clamp(3.4rem,7.5vw,7rem)] leading-[.9] tracking-[-.055em] text-zinc-100">
                  {c.titleA}<em className="bg-gradient-to-br from-violet-100 via-violet-300 to-amber-200 bg-clip-text font-normal italic text-transparent">{c.titleB}</em>
                </h1>
                <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg sm:leading-9">{c.lead}</p>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">{c.support}</p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ApplyButton />
                  <a href="#operating-model">
                    <Button className="h-auto min-h-12 w-full border border-violet-300/18 bg-violet-300/[.045] px-7 py-3.5 text-white hover:bg-violet-300/[.085] sm:w-auto">{c.seeModel}</Button>
                  </a>
                </div>
                <p className="mt-4 flex max-w-xl items-start gap-2 text-xs leading-6 text-zinc-600"><ShieldCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-violet-200/55" />{c.proofLine}</p>
              </motion.div>

              <motion.div initial={reduced ? false : { opacity: 0, y: 20, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .7, delay: .08 }} className="relative">
                <div className="relative overflow-hidden rounded-[32px] border border-violet-200/[.13] bg-[linear-gradient(145deg,rgba(196,181,253,.075),rgba(255,255,255,.018)_48%,rgba(0,0,0,.62))] p-4 shadow-[0_46px_120px_-54px_rgba(139,92,246,.28)] sm:p-5">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-white/[.08]">
                    <Image src="/warriors-discussion.jpg" alt="Warriors private discussion" fill priority sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover opacity-75 saturate-[.8]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050307] via-transparent to-violet-950/10" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 rounded-2xl border border-white/[.08] bg-black/55 p-4 backdrop-blur-xl">
                      <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-violet-100/70">Warriors Founding Circle</p><p className="mt-1 text-sm text-zinc-300">Private · curated · execution-led</p></div>
                      <Network className="h-5 w-5 shrink-0 text-violet-200" />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      [c.foundingLabel, c.foundingValue, c.foundingNote, CircleDollarSign],
                      [c.capLabel, c.capValue, c.platformValue, Users],
                      [c.cadenceLabel, c.cadenceValue, "60 min · focused", CalendarDays],
                      [c.platformLabel, c.platformValue, "No community app yet", LockKeyhole],
                    ].map(([label, value, note, Icon]) => {
                      const I = Icon as LucideIcon;
                      return <div key={String(label)} className="rounded-2xl border border-white/[.07] bg-black/25 p-4"><div className="flex items-center justify-between gap-3"><p className="text-[9px] font-semibold uppercase tracking-[.17em] text-zinc-600">{String(label)}</p><I className="h-3.5 w-3.5 text-violet-200/55" /></div><p className="mt-2 text-base font-semibold text-zinc-100">{String(value)}</p><p className="mt-1 text-[10px] leading-5 text-zinc-600">{String(note)}</p></div>;
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/[.06] py-20 md:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading eyebrow={c.whyEyebrow} title={c.whyTitle} lead={c.whyLead} />
            <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {c.anti.map((item, index) => <div key={item} className="flex min-h-28 flex-col justify-between rounded-[22px] border border-white/[.07] bg-white/[.016] p-5"><X className="h-4 w-4 text-zinc-700" /><p className="mt-5 text-sm leading-6 text-zinc-400">{item}</p><span className="mt-4 text-[9px] tracking-[.16em] text-zinc-800">0{index + 1}</span></div>)}
            </div>
          </div>
        </section>

        <section id="operating-model" className="relative scroll-mt-24 overflow-hidden border-b border-white/[.06] py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(139,92,246,.07),transparent_55%)]" aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading eyebrow={c.cadenceEyebrow} title={c.cadenceTitle} lead={c.cadenceLead} />
            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {c.cadence.map((item, index) => {
                const Icon = cadenceIcons[index] ?? Zap;
                return <motion.div key={item.title} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}><InteractiveSurface accent="violet" className="h-full rounded-[28px] border border-white/[.08] bg-white/[.018] p-6"><div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-300/16 bg-violet-300/[.045] text-violet-200"><Icon className="h-4 w-4" /></span><span className="text-[9px] uppercase tracking-[.14em] text-zinc-700">{item.meta}</span></div><h3 className="mt-6 text-lg font-semibold text-zinc-100">{item.title}</h3><p className="mt-3 text-sm leading-7 text-zinc-500">{item.text}</p></InteractiveSurface></motion.div>;
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-white/[.06] py-24 md:py-32">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading eyebrow={c.roomEyebrow} title={c.roomTitle} lead={c.roomLead} />
            <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_.86fr_1fr]">
              <div className="rounded-[28px] border border-emerald-300/[.12] bg-emerald-300/[.025] p-6 sm:p-7">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-100"><Check className="h-5 w-5 text-emerald-200" />{c.forYouTitle}</h3>
                <ul className="mt-6 space-y-4">{c.forYou.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-6 text-zinc-400"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-200/70" />{item}</li>)}</ul>
              </div>

              <div className="relative min-h-[360px] overflow-hidden rounded-[28px] border border-white/[.08]">
                <Image src="/warriors-group-photo.jpg" alt="Warriors group" fill sizes="(max-width: 1024px) 100vw, 30vw" className="object-cover opacity-60 saturate-[.75]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-violet-950/10" />
                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/[.08] bg-black/62 p-5 backdrop-blur-xl"><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-violet-200/65">The filter</p><p className="mt-2 text-sm leading-6 text-zinc-300">Real work · recent proof · useful contribution · reliable participation</p></div>
              </div>

              <div className="rounded-[28px] border border-white/[.08] bg-white/[.014] p-6 sm:p-7">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-100"><X className="h-5 w-5 text-zinc-600" />{c.notForYouTitle}</h3>
                <ul className="mt-6 space-y-4">{c.notForYou.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-6 text-zinc-500"><X className="mt-1 h-4 w-4 shrink-0 text-zinc-700" />{item}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-white/[.06] py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,.04),transparent_58%)]" aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading eyebrow={c.rulesEyebrow} title={c.rulesTitle} lead={c.rulesLead} />
            <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
              {c.rules.map((item, index) => <div key={item.title} className="rounded-[26px] border border-white/[.075] bg-[linear-gradient(145deg,rgba(255,255,255,.025),rgba(255,255,255,.009))] p-6 sm:p-7"><div className="flex items-start justify-between gap-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-300/[.04] text-violet-200"><ShieldCheck className="h-4 w-4" /></span><span className="text-[10px] tracking-[.17em] text-zinc-800">0{index + 1}</span></div><h3 className="mt-5 text-lg font-semibold text-zinc-100">{item.title}</h3><p className="mt-3 text-sm leading-7 text-zinc-500">{item.text}</p></div>)}
            </div>
          </div>
        </section>

        <section className="border-b border-white/[.06] py-24 md:py-32">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading eyebrow={c.accessEyebrow} title={c.accessTitle} lead={c.accessLead} />
            <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-4">
              {c.access.map((item, index) => {
                const Icon = accessIcons[index] ?? UserCheck;
                return <div key={item.title} className="relative rounded-[25px] border border-white/[.075] bg-white/[.016] p-5"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/16 bg-violet-300/[.045] text-violet-200"><Icon className="h-4 w-4" /></span><p className="mt-5 text-[9px] font-semibold uppercase tracking-[.16em] text-zinc-700">0{index + 1}</p><h3 className="mt-2 text-sm font-semibold text-zinc-100">{item.title}</h3><p className="mt-3 text-xs leading-6 text-zinc-500">{item.text}</p>{index < c.access.length - 1 ? <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-violet-300/25 md:block" /> : null}</div>;
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-white/[.06] py-24 md:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,.095),transparent_58%)]" aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
            <div className="rounded-[34px] border border-violet-200/[.14] bg-[linear-gradient(145deg,rgba(139,92,246,.075),rgba(255,255,255,.018)_45%,rgba(212,175,55,.02))] p-6 sm:p-9 lg:p-10">
              <div className="grid gap-9 lg:grid-cols-[1fr_.78fr] lg:items-end">
                <div><p className="text-[10px] font-semibold uppercase tracking-[.21em] text-amber-200/70">{c.priceEyebrow}</p><h2 className="section-title mt-3 text-[clamp(2.8rem,5vw,4.8rem)] text-zinc-100">{c.priceTitle}</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">{c.priceDesc}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{c.priceBullets.map((item) => <div key={item} className="flex items-start gap-2 text-sm text-zinc-400"><Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-200/75" />{item}</div>)}</div></div>
                <div className="rounded-[26px] border border-white/[.085] bg-black/35 p-6"><div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-[.18em] text-zinc-600">Warriors Founding Circle</p><Clock3 className="h-4 w-4 text-violet-200/60" /></div><p className="mt-5 text-4xl font-semibold tracking-[-.04em] text-white">$49<span className="ml-1 text-base font-normal text-zinc-500">/mo</span></p><p className="mt-2 text-xs leading-6 text-zinc-600">{c.foundingNote}</p><div className="mt-6"><ApplyButton className="w-full" /></div><p className="mt-4 text-[11px] leading-5 text-zinc-600">{c.noCharge}</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/[.06] py-24 md:py-28">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            <SectionHeading eyebrow={c.faqEyebrow} title={c.faqTitle} />
            <div className="mt-10 space-y-3">{c.faq.map((item) => <details key={item.q} className="group rounded-[22px] border border-white/[.075] bg-white/[.016] p-5 open:border-violet-300/15"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-zinc-200"><span>{item.q}</span><ArrowRight className="h-4 w-4 shrink-0 text-zinc-600 transition-transform group-open:rotate-90" /></summary><p className="mt-4 pr-6 text-sm leading-7 text-zinc-500">{item.a}</p></details>)}</div>
          </div>
        </section>

        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,.10),transparent_64%)]" aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6"><p className="text-[10px] font-semibold uppercase tracking-[.23em] text-violet-200/70">{c.finalEyebrow}</p><h2 className="section-title mx-auto mt-4 max-w-4xl text-[clamp(3rem,6vw,5.7rem)] leading-[.95] text-zinc-100">{c.finalTitle}</h2><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">{c.finalDesc}</p><div className="mt-8 flex justify-center"><ApplyButton /></div></div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
