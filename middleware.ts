import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  console.log("Middleware token:", token); // <--- Check this
  console.log("✅ Middleware is running");
  // Unauthenticated
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // Admin route protection
  if (
    req.nextUrl.pathname.startsWith("/dashboard-system-panel") &&
    !token.isAdmin
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard-system-panel/:path*"],
};
