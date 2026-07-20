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

// Реальные работы Натальи. Новые работы и фото добавляются через админ-панель —
// эти три уже с настоящими фотографиями и описаниями.
export const seedArtworks: Artwork[] = [
  {
    id: "shepot-belyh-loshadey",
    title: "Шёпот белых лошадей",
    category: "Картины",
    description:
      "Две белые лошади застыли на опушке, будто на миг остановив время, чтобы обменяться безмолвным доверием. Золотая трава колышется вокруг тропинки, ведущей вглубь тенистой аллеи, а полевые цветы у края холста напоминают: тишина иногда красноречивее любых слов. Тёплый свет позднего лета ложится на их гривы, превращая обычный луг в место, где хочется остаться подольше.",
    size: "50 × 50 см",
    weight: "2 кг",
    material: "Холст, масло",
    price: null,
    status: "В наличии",
    year: 2020,
    images: ["/images/works/shepot-belyh-loshadey.png"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "ditya-lesa",
    title: "Дитя леса",
    category: "Скульптуры",
    description:
      "Маленький олененок свернулся клубочком, ещё не зная страха — только любопытство в тёмных глазах и пятнистая шёрстка, слитая с солнечными бликами леса. Эта работа о хрупкости и доверии: о том самом коротком моменте детства, который есть у каждого живого существа, и который так важно сохранить бережно, как в памяти, так и в природе.",
    size: "70 × 30 см",
    weight: "3 кг",
    material: "Гипсовая штукатурка",
    price: null,
    status: "В наличии",
    year: 2025,
    images: ["/images/works/ditya-lesa.png"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "uyut-istorii-velikoy-stepi",
    title: "Уют истории великой степи",
    category: "Скульптуры",
    description:
      "Барельеф, оживающий в тёплой подсветке: акын с домброй сидит у камня, встречая всадников на горизонте, а вздыбленный конь рвётся вперёд — как сама степь, что помнит каждую песню, каждый род и каждую дорогу. Эта работа создавалась как дань традиции устного слова и коня — двух вещей, без которых немыслима история великой степи. Свет внутри рамы делает камень будто дышащим по вечерам.",
    size: "100 × 30 см",
    weight: "5 кг",
    material: "Гипсовый барельеф, встроенная подсветка",
    price: null,
    status: "В наличии",
    year: 2024,
    images: ["/images/works/uyut-istorii-velikoy-stepi.png"],
    createdAt: new Date().toISOString(),
  },
];
