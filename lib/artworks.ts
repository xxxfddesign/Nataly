export type ArtworkCategory = "Картины" | "Скульптуры" | "Сувениры";
export type ArtworkStatus = "В наличии" | "Продано" | "Под заказ";

export interface Artwork {
  id: string;
  title: string;
  category: ArtworkCategory;
  description: string;
  size: string; // например "45 x 30 x 20 см"
  weight: string; // например "3.2 кг"
  material: string;
  price: number | null; // null = "цена по запросу"
  status: ArtworkStatus;
  year: number;
  images: string[]; // пути к изображениям; пока пусто — заполнит администратор
  createdAt: string;
}

// Каталог пока пуст — Наталья добавит работы и фотографии сама через админ-панель.
// Ниже — три "черновика" карточек с описаниями, чтобы было видно, как будет выглядеть
// заполненный каталог. Фото можно загрузить в админке в любой момент.
export const seedArtworks: Artwork[] = [
  {
    id: "harmoniya-v-dvizhenii",
    title: "Гармония в движении",
    category: "Скульптуры",
    description:
      "Пластика фигуры ловит момент между вдохом и полётом — свобода, переданная через изгиб линии и подвижность формы.",
    size: "45 × 30 × 20 см",
    weight: "3.2 кг",
    material: "Гипс, тонирование под бронзу",
    price: 780000,
    status: "В наличии",
    year: 2023,
    images: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "portret-tishiny",
    title: "Портрет тишины",
    category: "Картины",
    description:
      "Работа о внутреннем покое: тёплые охры и золото проступают сквозь сдержанную палитру, как свет сквозь плотную ткань.",
    size: "60 × 80 см",
    weight: "1.1 кг",
    material: "Холст, масло, сусальное золото",
    price: null,
    status: "Под заказ",
    year: 2024,
    images: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "zolotoy-oskolok",
    title: "Золотой осколок",
    category: "Сувениры",
    description:
      "Небольшая настольная форма для дома — трещина, залитая золотом, как напоминание о ценности несовершенного.",
    size: "12 × 8 × 8 см",
    weight: "0.4 кг",
    material: "Гипс, поталь",
    price: 55000,
    status: "В наличии",
    year: 2024,
    images: [],
    createdAt: new Date().toISOString(),
  },
];
