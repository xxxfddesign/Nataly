// Все контактные ссылки собраны здесь — их легко поменять в одном месте.
// В админ-панели их тоже можно редактировать (изменения хранятся в браузере,
// но чтобы поменять значения "по умолчанию" для всех посетителей — правьте этот файл).

export const siteConfig = {
  artistName: "Наталья Шелко",
  brandName: "Art by Natalia",
  tagline: "Искусство вдохновляет жизнь",
  whatsapp: "77018926907", // без + и пробелов
  instagram: "kalugina_shchuchinsk_burabay", // без @
  phone: "+7 701 892 69 07",
  email: "kalugina.geolog2015@mail.ru",
  address: "г. Щучинск, Бурабайский район, ул. Школьная, 35",
  stats: [
    { value: "13+", label: "лет опыта" },
    { value: "7", label: "лет педагогики" },
    { value: "300+", label: "работ создано" },
    { value: "∞", label: "вдохновения" },
  ],
};

export const links = {
  whatsapp: () => `https://wa.me/${siteConfig.whatsapp}`,
  instagram: () => `https://instagram.com/${siteConfig.instagram}`,
  phone: () => `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  email: () => `mailto:${siteConfig.email}`,
};
