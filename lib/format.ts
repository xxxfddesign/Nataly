// Единое форматирование цены в тенге по всему сайту.
// Меняется в одном месте — при необходимости легко переключить на другую валюту.
export function formatPrice(price: number | null): string {
  if (price === null) return "Цена по запросу";
  return `${new Intl.NumberFormat("ru-RU").format(price)} ₸`;
}
