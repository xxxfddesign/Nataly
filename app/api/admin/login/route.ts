import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_MAX_AGE, ADMIN_COOKIE_NAME, createSessionToken } from "@/lib/admin-session";

// Логин и пароль администратора живут только в переменных окружения (.env.local),
// а не в коде — их можно поменять в любой момент без правки самого сайта.
export async function POST(req: NextRequest) {
  const { login, password } = await req.json();

  const validLogin = process.env.ADMIN_LOGIN || "N1A6T0A7";
  const validPassword = process.env.ADMIN_PASSWORD || "admin";

  if (login !== validLogin || password !== validPassword) {
    return NextResponse.json(
      { error: "Неверный логин или пароль" },
      { status: 401 }
    );
  }

  const token = await createSessionToken(login);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  return res;
}
