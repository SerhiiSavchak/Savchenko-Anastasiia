import type { Product, VIPItem, Slot } from "@/types";

export const placeholderProducts: Product[] = [
  {
    id: 1,
    title: "Ранкова практика дихання",
    slug: "morning-breathwork",
    type: "online_practice",
    shortDescription:
      "Щоденна практика для пробудження тіла та свідомості. Онлайн у Zoom.",
    durationMinutes: 60,
    price: 600,
    currency: "UAH",
    coverImage: "/images/placeholder-1.jpg",
    isFeatured: true,
    directionTag: "Дихальні практики",
    bookingRequired: true,
  },
  {
    id: 2,
    title: "Вечірня медитація",
    slug: "evening-meditation",
    type: "online_practice",
    shortDescription:
      "Глибока розслаблююча медитація для завершення дня. Онлайн формат.",
    durationMinutes: 45,
    price: 500,
    currency: "UAH",
    coverImage: "/images/placeholder-2.jpg",
    isFeatured: false,
    directionTag: "Медитація",
    bookingRequired: true,
  },
  {
    id: 3,
    title: "Тілесна практика",
    slug: "body-practice",
    type: "offline_practice",
    shortDescription:
      "Робота з тілом через рух, дихання та усвідомленість. Очний формат у Києві.",
    durationMinutes: 90,
    price: 900,
    currency: "UAH",
    coverImage: "/images/placeholder-3.jpg",
    isFeatured: true,
    directionTag: "Тілесні практики",
    bookingRequired: true,
  },
  {
    id: 4,
    title: "Основи усвідомленого дихання",
    slug: "breathwork-basics",
    type: "video_lesson",
    shortDescription:
      "Відеокурс із 5 уроків для самостійного проходження. Доступ через Telegram-бот.",
    durationMinutes: 120,
    price: 1200,
    currency: "UAH",
    coverImage: "/images/placeholder-4.jpg",
    isFeatured: false,
    directionTag: "Дихальні практики",
    bookingRequired: false,
    telegramBotUrl: "https://t.me/example_bot",
  },
  {
    id: 5,
    title: "Жіноча енергетична практика",
    slug: "womens-energy",
    type: "offline_practice",
    shortDescription:
      "Групова практика для відновлення жіночої енергії. Офлайн у Києві.",
    durationMinutes: 120,
    price: 1100,
    currency: "UAH",
    coverImage: "/images/placeholder-5.jpg",
    isFeatured: false,
    directionTag: "Жіночі практики",
    bookingRequired: true,
  },
  {
    id: 6,
    title: "Медитація для початківців",
    slug: "meditation-beginners",
    type: "video_lesson",
    shortDescription:
      "Серія відеоуроків для тих, хто тільки починає практику медитації.",
    durationMinutes: 90,
    price: 800,
    currency: "UAH",
    coverImage: "/images/placeholder-6.jpg",
    isFeatured: false,
    directionTag: "Медитація",
    bookingRequired: false,
    telegramBotUrl: "https://t.me/example_bot",
  },
  {
    id: 7,
    title: "Дихальна практика офлайн",
    slug: "offline-breathwork",
    type: "offline_practice",
    shortDescription:
      "Очна дихальна практика у групі. Київ, затишний простір для роботи з тілом.",
    durationMinutes: 75,
    price: 700,
    currency: "UAH",
    coverImage: "/images/placeholder-1.jpg",
    isFeatured: false,
    directionTag: "Дихальні практики",
    bookingRequired: true,
  },
  {
    id: 8,
    title: "Групова медитація офлайн",
    slug: "offline-group-meditation",
    type: "offline_practice",
    shortDescription:
      "Спільна медитація в очному форматі. Тиша, присутність, підтримка групи.",
    durationMinutes: 60,
    price: 550,
    currency: "UAH",
    coverImage: "/images/placeholder-2.jpg",
    isFeatured: false,
    directionTag: "Медитація",
    bookingRequired: true,
  },
  {
    id: 9,
    title: "Тілесна практика онлайн",
    slug: "online-body-practice",
    type: "online_practice",
    shortDescription:
      "Робота з тілом через Zoom. Рух, розслаблення та усвідомленість у домашніх умовах.",
    durationMinutes: 75,
    price: 650,
    currency: "UAH",
    coverImage: "/images/placeholder-3.jpg",
    isFeatured: false,
    directionTag: "Тілесні практики",
    bookingRequired: true,
  },
  {
    id: 10,
    title: "Жіноча практика онлайн",
    slug: "online-womens-practice",
    type: "online_practice",
    shortDescription:
      "Онлайн-сесія для відновлення жіночої енергії. Zoom, індивідуальний підхід.",
    durationMinutes: 90,
    price: 850,
    currency: "UAH",
    coverImage: "/images/placeholder-5.jpg",
    isFeatured: false,
    directionTag: "Жіночі практики",
    bookingRequired: true,
  },
  {
    id: 11,
    title: "Тілесні практики: відеокурс",
    slug: "body-practice-video",
    type: "video_lesson",
    shortDescription:
      "Відеоуроки з тілесними практиками для самостійного виконання вдома.",
    durationMinutes: 100,
    price: 950,
    currency: "UAH",
    coverImage: "/images/placeholder-3.jpg",
    isFeatured: false,
    directionTag: "Тілесні практики",
    bookingRequired: false,
    telegramBotUrl: "https://t.me/example_bot",
  },
  {
    id: 12,
    title: "Жіноча енергія: відеоуроки",
    slug: "womens-energy-video",
    type: "video_lesson",
    shortDescription:
      "Серія відеоуроків для жіночої практики. Доступ через Telegram-бот.",
    durationMinutes: 90,
    price: 750,
    currency: "UAH",
    coverImage: "/images/placeholder-5.jpg",
    isFeatured: false,
    directionTag: "Жіночі практики",
    bookingRequired: false,
    telegramBotUrl: "https://t.me/example_bot",
  },
];

export const placeholderVIPItems: VIPItem[] = [
  {
    id: 1,
    title: "Ретрит «Тиша всередині»",
    slug: "silence-within-retreat",
    type: "retreat",
    shortDescription:
      "Триденний ретрит у Карпатах. Практики, тиша, природа та глибока робота з собою.",
    price: "від 12 000",
    format: "offline",
    coverImage: "/images/placeholder-vip-1.jpg",
    details:
      "Триденний ретрит із повним зануренням у практику. Включає проживання, харчування, дихальні та медитативні практики, тілесну роботу та індивідуальні консультації.",
    callToActionLabel: "Обговорити участь",
  },
  {
    id: 2,
    title: "Персональний менторинг",
    slug: "personal-mentoring",
    type: "mentoring",
    shortDescription:
      "Індивідуальна підтримка протягом 3 місяців. Онлайн-зустрічі, практики та супровід.",
    price: "від 8 000",
    format: "online",
    coverImage: "/images/placeholder-vip-2.jpg",
    details:
      "Персональна програма трансформації: регулярні онлайн-сесії, індивідуальний план практик, підтримка між зустрічами та доступ до ексклюзивних матеріалів.",
    callToActionLabel: "Обговорити",
  },
  {
    id: 3,
    title: "Інтенсив «Пробудження»",
    slug: "awakening-intensive",
    type: "retreat",
    shortDescription:
      "Дводенний інтенсив: онлайн-підготовка та очна практика. Гібридний формат.",
    price: "від 6 500",
    format: "hybrid",
    coverImage: "/images/placeholder-vip-1.jpg",
    details:
      "Комбінований формат: вступна онлайн-сесія для підготовки, потім очна дводенна практика у Києві. Ідеально для тих, хто хоче глибоку роботу без виїзду.",
    callToActionLabel: "Обговорити участь",
  },
];

/* ── Placeholder slots for booking demo ── */
const now = new Date();

function makeSlot(
  id: string,
  productId: number,
  daysFromNow: number,
  hour: number
): Slot {
  const start = new Date(now);
  start.setDate(start.getDate() + daysFromNow);
  start.setHours(hour, 0, 0, 0);
  const end = new Date(start);
  end.setHours(hour + 1);
  return {
    id,
    productId,
    startAt: start.toISOString(),
    endAt: end.toISOString(),
    isAvailable: true,
  };
}

export const placeholderSlots: Slot[] = [
  makeSlot("s1", 1, 2, 9),
  makeSlot("s2", 1, 3, 9),
  makeSlot("s3", 1, 5, 10),
  makeSlot("s4", 2, 2, 19),
  makeSlot("s5", 2, 4, 19),
  makeSlot("s6", 3, 3, 11),
  makeSlot("s7", 3, 6, 11),
  makeSlot("s8", 5, 4, 17),
  makeSlot("s9", 5, 7, 17),
  makeSlot("s10", 7, 2, 10),
  makeSlot("s11", 7, 4, 10),
  makeSlot("s12", 8, 3, 18),
  makeSlot("s13", 8, 5, 18),
  makeSlot("s14", 9, 2, 11),
  makeSlot("s15", 9, 4, 11),
  makeSlot("s16", 10, 3, 17),
  makeSlot("s17", 10, 6, 17),
];
