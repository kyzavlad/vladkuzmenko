import type { Lang } from "@/lib/i18n";

// Each row describes the product scenarios visible in the supplied case materials.
const highlights = {
  zentra: [
    "See station availability and network health|Compare usage, energy and revenue|Find a charger on mobile and track the session",
    "Перевірити доступність зарядок і стан мережі|Порівняти завантаженість, енергію та виручку|Знайти зарядку в застосунку й стежити за сеансом",
    "Проверить доступность зарядок и состояние сети|Сравнить загрузку, энергию и выручку|Найти зарядку в приложении и следить за сеансом",
  ],
  buildora: [
    "Start a website layout from a text prompt|Refine its sections with reusable blocks|Preview the result at different screen widths",
    "Створити макет сайту з текстового запиту|Налаштувати секції за допомогою готових блоків|Переглянути результат на різних екранах",
    "Создать макет сайта из текстового запроса|Настроить секции с помощью готовых блоков|Проверить результат на разных экранах",
  ],
  "velora-energy": [
    "Monitor solar generation and household consumption|Check battery storage on mobile|Explore energy solutions on the public site",
    "Стежити за генерацією й споживанням енергії|Перевірити заряд батареї в застосунку|Переглянути каталог енергорішень на сайті",
    "Следить за генерацией и потреблением энергии|Проверять заряд батареи в приложении|Изучать каталог энергорешений на сайте",
  ],
  cilo: [
    "Open a support conversation with order context|Review a suggested reply and churn signals|Connect conversation activity with retention data",
    "Відкрити діалог разом з історією замовлень|Переглянути підказку для відповіді й ризик відтоку|Зіставити роботу підтримки з утриманням клієнтів",
    "Открыть диалог вместе с историей заказов|Посмотреть подсказку для ответа и риск оттока|Сопоставить работу поддержки с удержанием клиентов",
  ],
  ramtabs: [
    "Read revenue, costs and budget totals together|Check a supplier transaction in the ledger|Review spending decisions in the approval workspace",
    "Зіставити доходи, витрати й бюджет|Знайти операцію з постачальником у журналі|Переглянути рішення про витрати в розділі погоджень",
    "Сопоставить доходы, расходы и бюджет|Найти операцию с поставщиком в журнале|Проверить решения о расходах в разделе согласований",
  ],
  studyx: [
    "Set up and manage courses in the instructor workspace|Follow lessons in the learner dashboard|Review individual and group progress",
    "Створювати курси в кабінеті викладача|Проходити уроки в кабінеті учня|Переглядати особистий прогрес і успішність групи",
    "Создавать курсы в кабинете преподавателя|Проходить уроки в кабинете ученика|Следить за личным прогрессом и успеваемостью группы",
  ],
  shipline: [
    "Enter recipient details and configure a shipment|Review carrier and shipment information|Monitor delivery status from the operations console",
    "Заповнити дані отримувача й оформити відправлення|Переглянути перевізника й дані посилки|Відстежувати доставку в робочому кабінеті",
    "Заполнить данные получателя и оформить отправление|Посмотреть перевозчика и данные посылки|Отслеживать доставку в рабочем кабинете",
  ],
  axella: [
    "Review occupancy and rent from the overview|Open a property to check lease dates and overdue rent|Start a maintenance request from the property record",
    "Переглянути заповненість і платежі на панелі|Відкрити об’єкт і перевірити строки оренди та борги|Створити заявку на обслуговування з картки",
    "Посмотреть заполняемость и платежи на панели|Открыть объект и проверить сроки аренды и просрочки|Создать заявку на обслуживание из карточки",
  ],
  tripaxis: [
    "Compare destinations and hotel options|Move from search results to a booking itinerary|Keep the boarding pass accessible on mobile",
    "Порівняти напрямки й варіанти готелів|Перейти від пошуку до маршруту поїздки|Відкрити посадковий талон на телефоні",
    "Сравнить направления и варианты отелей|Перейти от поиска к маршруту поездки|Открыть посадочный талон на телефоне",
  ],
  clinify: [
    "Review the day’s appointments|Open a patient record from the clinic workspace|Track the team’s workload from the console",
    "Переглянути записи на день|Відкрити картку пацієнта з робочого кабінету|Стежити за навантаженням команди",
    "Просмотреть записи на день|Открыть карточку пациента из рабочего кабинета|Отслеживать загрузку команды",
  ],
  academos: [
    "Explore courses from the public catalogue|Open a course workspace to see its activity|Review learner progress in the organiser dashboard",
    "Переглянути курси у відкритому каталозі|Відкрити курс і перевірити активність|Переглянути прогрес учнів на панелі організатора",
    "Изучить курсы в открытом каталоге|Открыть курс и проверить активность|Посмотреть прогресс учеников на панели организатора",
  ],
  mailpilot: [
    "Set up a campaign and choose audience segments|Compare email variants in an A/B test|Review campaign figures in the analytics tables",
    "Налаштувати кампанію та вибрати сегменти аудиторії|Порівняти варіанти листів у A/B-тесті|Переглянути показники кампанії в таблиці аналітики",
    "Настроить кампанию и выбрать сегменты аудитории|Сравнить варианты писем в A/B-тесте|Посмотреть показатели кампании в таблице аналитики",
  ],
  hivohr: [
    "Find employee information in a shared HR workspace|Review team activity on the dashboard|Move from summary charts to operational screens",
    "Знайти дані співробітника в HR-кабінеті|Переглянути активність команди на панелі|Перейти від зведених графіків до робочих екранів",
    "Найти данные сотрудника в HR-кабинете|Посмотреть активность команды на панели|Перейти от сводных графиков к рабочим экранам",
  ],
  teamtrek: [
    "Find employees through the directory and org chart|Open a department to see its structure|Review schedules and team analytics alongside the directory",
    "Знайти співробітників у довіднику й оргструктурі|Відкрити відділ і переглянути його склад|Переглянути графіки й аналітику команди",
    "Найти сотрудников в справочнике и оргструктуре|Открыть отдел и посмотреть его состав|Посмотреть расписания и аналитику команды",
  ],
  axora: [
    "Switch between the task list and calendar|Open a task to read its details and discussion|Keep the relevant project context in the same workspace",
    "Перемикатися між списком завдань і календарем|Відкривати деталі завдання й обговорення|Працювати з контекстом проєкту в одному кабінеті",
    "Переключаться между списком задач и календарём|Открывать детали задачи и обсуждение|Работать с контекстом проекта в одном кабинете",
  ],
  learnaxis: [
    "Scan the dashboard for learning activity|Open the course or learner that needs attention|Explore the published course list in the catalogue view",
    "Переглянути навчальну активність на панелі|Відкрити потрібний курс або профіль учня|Дослідити список курсів у каталозі",
    "Посмотреть учебную активность на панели|Открыть нужный курс или профиль ученика|Изучить список курсов в каталоге",
  ],
  leadflow: [
    "See deals by pipeline stage|Open an individual lead record from the pipeline|Compare team activity with the headline sales metrics",
    "Переглянути угоди за етапами воронки|Відкрити картку ліда з воронки|Зіставити активність команди з показниками продажів",
    "Посмотреть сделки по этапам воронки|Открыть карточку лида из воронки|Сопоставить активность команды с показателями продаж",
  ],
  efficia: [
    "Start with a sales snapshot on the dashboard|Open a contact or task from the records list|Review scheduled work in the CRM calendar",
    "Почати з огляду продажів на панелі|Відкрити контакт або завдання зі списку|Переглянути заплановану роботу в календарі CRM",
    "Начать с обзора продаж на панели|Открыть контакт или задачу из списка|Посмотреть запланированную работу в календаре CRM",
  ],
  "project-management-workspace": [
    "Browse projects and their tasks on a board|See the people involved in the project|Review the timeline to plan work across dates",
    "Переглянути проєкти й завдання на дошці|Побачити учасників проєкту|Зіставити завдання й терміни на часовій шкалі",
    "Посмотреть проекты и задачи на доске|Увидеть участников проекта|Сопоставить задачи и сроки на временной шкале",
  ],
  "healthcare-workspace": [
    "Open a patient record from the overview|Review diagnosis history alongside the body diagram|Read medical statistics in the patient’s context",
    "Відкрити картку пацієнта з огляду|Переглянути історію діагнозів поруч зі схемою тіла|Оцінити показники в контексті картки пацієнта",
    "Открыть карточку пациента из обзора|Посмотреть историю диагнозов рядом со схемой тела|Оценить показатели в контексте карточки пациента",
  ],
  cryptofy: [
    "Check balances and compare assets on one dashboard|Review operations from desktop or mobile|Use the light or dark interface for the same tasks",
    "Перевірити баланс і порівняти активи на панелі|Переглянути операції на комп’ютері або телефоні|Використовувати світлу чи темну тему для тих самих дій",
    "Проверить баланс и сравнить активы на панели|Посмотреть операции на компьютере или телефоне|Использовать светлую или тёмную тему для тех же действий",
  ],
  finai: [
    "Check the current balance and latest activity together|Open the detailed transaction history|Find money-management actions beside the balance",
    "Переглянути баланс і останню активність разом|Відкрити повну історію транзакцій|Знайти дії з коштами поруч із балансом",
    "Посмотреть баланс и последнюю активность вместе|Открыть подробную историю транзакций|Найти действия со средствами рядом с балансом",
  ],
  fluorine: [
    "Learn how conversations become tasks through product examples|Follow the path from the homepage to the first session|Use the same Framer site on desktop and mobile",
    "Побачити на прикладах, як розмови стають завданнями|Перейти з головної сторінки до першої сесії|Користуватися адаптивним сайтом Framer на різних екранах",
    "Увидеть на примерах, как обсуждения становятся задачами|Перейти с главной страницы к первой сессии|Пользоваться адаптивным сайтом Framer на разных экранах",
  ],
  thrust: [
    "Explore services and find relevant examples|Read cases and articles before opening an enquiry|Use responsive Framer layouts on desktop and mobile",
    "Переглянути послуги та знайти відповідні приклади|Прочитати кейси й статті перед зверненням|Переглядати адаптивні сторінки Framer на різних екранах",
    "Посмотреть услуги и подобрать подходящие примеры|Прочитать кейсы и статьи перед обращением|Просматривать адаптивные страницы Framer на разных экранах",
  ],
  "nexfin-ai": [
    "See balances and trends in the mobile overview|Open individual financial views without leaving the app|Use the AI conversation alongside the charts",
    "Побачити баланс і динаміку в мобільному огляді|Відкрити деталі фінансів у застосунку|Скористатися AI-діалогом поруч із графіками",
    "Увидеть баланс и динамику в мобильном обзоре|Открыть детали финансов в приложении|Воспользоваться AI-диалогом рядом с графиками",
  ],
  "nexfin-mobile": [
    "Switch cards and see the selected balance|Open a payment to inspect its details|Review activity trends in the mobile charts",
    "Перемикати картки й перевіряти баланс обраної|Відкрити платіж і переглянути деталі|Дивитися динаміку операцій у мобільних графіках",
    "Переключать карты и проверять баланс выбранной|Открыть платёж и посмотреть детали|Смотреть динамику операций на мобильных графиках",
  ],
  "video-sharing-mobile": [
    "Watch vertical clips in the feed|Move from viewing to the publication screen|Browse a creator’s videos on their profile",
    "Дивитися вертикальні відео у стрічці|Перейти від перегляду до публікації|Переглянути відео автора в його профілі",
    "Смотреть вертикальные видео в ленте|Перейти от просмотра к публикации|Просмотреть видео автора в его профиле",
  ],
  "digital-art-marketplace": [
    "Discover work through curated collections|Open the creator’s profile and individual artworks|Check the price and purchase action on the item page",
    "Знаходити роботи через добірки|Відкрити профіль автора та окремі роботи|Перевірити ціну й дію покупки в картці",
    "Находить работы через подборки|Открыть профиль автора и отдельные работы|Проверить цену и действие покупки в карточке",
  ],
  "fintech-website": [
    "Understand the service from the introductory sections|Find the registration path from the landing page|Complete the same visual flow through the form",
    "Зрозуміти пропозицію з вступних розділів|Знайти шлях до реєстрації на сайті|Пройти сценарій до форми реєстрації",
    "Понять предложение из вводных разделов|Найти путь к регистрации на сайте|Пройти сценарий до формы регистрации",
  ],
  growthgenius: [
    "See accounts and recent transactions together|Compare changes across periods in the charts|Use transaction history to explain movements in the totals",
    "Переглянути рахунки й останні транзакції разом|Порівняти зміни за періодами на графіках|Зіставити рух у підсумках з історією операцій",
    "Посмотреть счета и последние транзакции вместе|Сравнить изменения по периодам на графиках|Сопоставить движение в итогах с историей операций",
  ],
  "finance-wallet": [
    "Review bank cards and accounts from the wallet|Check recent transactions in the same workspace|See how spending categories contribute to the total",
    "Переглянути картки та рахунки в гаманці|Перевірити останні транзакції в тому самому кабінеті|Побачити частки категорій у загальних витратах",
    "Посмотреть карты и счета в кошельке|Проверить последние транзакции в том же кабинете|Увидеть доли категорий в общих расходах",
  ],
  seveers: [
    "See income, expenses and balance in one view|Follow financial changes over time in charts|Look up individual transactions in the table",
    "Бачити доходи, витрати й баланс в одному огляді|Стежити за змінами на графіках|Знайти окремі операції в таблиці",
    "Видеть доходы, расходы и баланс в одном обзоре|Следить за изменениями на графиках|Находить отдельные операции в таблице",
  ],
  medlife: [
    "Pick a practice based on mood|Review the practice and start a session|Follow the session with prominent mobile controls",
    "Обрати практику за настроєм|Переглянути її та розпочати заняття|Керувати заняттям за допомогою великих кнопок",
    "Выбрать практику по настроению|Просмотреть её и начать занятие|Управлять занятием с помощью крупных кнопок",
  ],
  yumzio: [
    "Browse the menu by category|Open a dish and review the details|Continue with the selected dishes to checkout",
    "Переглядати меню за категоріями|Відкрити страву й переглянути деталі|Перейти з обраними стравами до оформлення",
    "Просматривать меню по категориям|Открыть блюдо и посмотреть детали|Перейти с выбранными блюдами к оформлению",
  ],
  "food-delivery-mobile": [
    "Start with food categories on mobile|Open a restaurant and choose a dish|Review the order in the checkout flow",
    "Почати з категорій їжі на телефоні|Відкрити ресторан і вибрати страву|Перевірити замовлення під час оформлення",
    "Начать с категорий еды на телефоне|Открыть ресторан и выбрать блюдо|Проверить заказ при оформлении",
  ],
  kickerz: [
    "Discover sneaker releases through collections|Review photography for the selected model|Choose a size and continue to the cart",
    "Знайти нові моделі кросівок через колекції|Переглянути фото обраної моделі|Обрати розмір і перейти в кошик",
    "Найти новые модели кроссовок через коллекции|Посмотреть фото выбранной модели|Выбрать размер и перейти в корзину",
  ],
  "skincare-store": [
    "Find collections by skincare need|Review the item and its ingredients|Move from the product page to cart and checkout",
    "Знайти колекцію за потребою шкіри|Переглянути засіб і його склад|Перейти з картки в кошик і до оформлення",
    "Найти коллекцию по потребности кожи|Посмотреть средство и его состав|Перейти из карточки в корзину и к оформлению",
  ],
  membo: [
    "Understand the fruit-box offer from the homepage|Explore the box selection in the catalogue|Use product cards to choose an order",
    "Зрозуміти пропозицію фруктових наборів з головної|Переглянути набори в каталозі|Обрати замовлення за картками товарів",
    "Понять предложение фруктовых наборов с главной|Посмотреть наборы в каталоге|Выбрать заказ по карточкам товаров",
  ],
} satisfies Record<string, readonly [string, string, string]>;

export function getCaseHighlights(slug: string, locale: Lang): string[] {
  const translated = highlights[slug as keyof typeof highlights];
  return translated?.[locale === "en" ? 0 : locale === "ua" ? 1 : 2].split("|") ?? [];
}
