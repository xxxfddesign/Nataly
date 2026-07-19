import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";
import { seedArtworks } from "@/lib/artworks";
import { formatPrice } from "@/lib/format";
import { aboutContent } from "@/lib/about-content";

// Прокси к Groq (groq.com — быстрый инференс открытых моделей, например Llama).
// Ключ хранится только на сервере в переменной окружения GROQ_API_KEY —
// заменить его можно в любой момент в .env.local или в настройках проекта
// на Vercel, без изменения кода.
export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        reply:
          "Чат-помощник пока не подключён: администратору нужно добавить ключ GROQ_API_KEY в настройках проекта.",
      },
      { status: 200 }
    );
  }

  const { messages } = await req.json();

  const catalogSummary = seedArtworks
    .map(
      (a) =>
        `- ${a.title} (${a.category}, ${a.year}): материал ${a.material}, размер ${a.size}, вес ${a.weight}, статус ${a.status}, цена ${formatPrice(
          a.price
        )}`
    )
    .join("\n");

  const systemPrompt = `Ты — вежливый и элегантный ассистент художественной галереи "${siteConfig.brandName}" художника и скульптора ${siteConfig.artistName}.
Отвечай кратко, дружелюбно и со вкусом, в тон премиальной арт-галерее. Отвечай на языке вопроса пользователя (обычно русский).

О художнике:
${aboutContent.paragraphs.join(" ")}

Каталог работ (актуальный список поддерживает администратор в разделе "Каталог" — этот список является примером структуры):
${catalogSummary}

Контакты:
WhatsApp: ${siteConfig.whatsapp}
Instagram: @${siteConfig.instagram}
Телефон: ${siteConfig.phone}
Email: ${siteConfig.email}

Если не знаешь точного ответа про наличие, цену или доставку конкретной работы — вежливо предложи написать в WhatsApp или Instagram для уточнения у художника напрямую. Не придумывай цены и наличие, если их нет в данных.`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: systemPrompt }, ...(messages || [])],
        temperature: 0.6,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { reply: "Не удалось получить ответ от помощника. Попробуйте позже.", debug: errText },
        { status: 200 }
      );
    }

    const data = await response.json();
    const reply =
      data?.choices?.[0]?.message?.content ||
      "Извините, не получилось сформировать ответ.";
    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json(
      { reply: "Произошла ошибка соединения с помощником. Попробуйте позже." },
      { status: 200 }
    );
  }
}
