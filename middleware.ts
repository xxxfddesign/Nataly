import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/admin-session";

// Защищает /admin/dashboard: попасть туда можно только с валидной
// подписанной cookie-сессией, которая выдаётся после успешного входа
// по логину/паролю на странице /admin.
export async function middleware(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!(await verifySessionToken(token))) {
    const loginUrl = new URL("/admin", req.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
