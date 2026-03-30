import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const authRoutes = ["/auth/login", "/auth/register"];
const publicRoutes = ["/products"];
const adminRoutes = ["/admin"];

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function getRoleFromToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload.role as string ?? null;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  // 1. Ruta pública o auth sin token → siempre dejar pasar
  if (isPublicRoute || isAuthRoute) {
    // Pero si tiene token y va a login/register → redirigir a productos
    if (token && isAuthRoute) {
      return NextResponse.redirect(new URL("/products", request.url));
    }
    return NextResponse.next();
  }

  // 2. Ruta privada sin token → login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 3. Ruta de admin → verificar rol
  if (isAdminRoute) {
    const role = await getRoleFromToken(token);
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)",],
};