import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic = path === "/login" || path === "/register";
  const token = request.cookies.get("token")?.value || "";

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const { payload } = await jwtVerify(token, secret);

      if (path === "/admin" && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/login", "/register", "/admin"],
};
