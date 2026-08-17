import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const lang = pathname === "/ua" || pathname.startsWith("/ua/")
    ? "uk"
    : pathname === "/ru" || pathname.startsWith("/ru/")
      ? "ru"
      : "en";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-site-lang", lang);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
