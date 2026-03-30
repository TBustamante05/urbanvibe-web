import api from "@/lib/axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("Token encontrado:", !!token);

  if (!token) {
    return NextResponse.json({ user: null}, { status: 401});
  }

  try {
    const { data } = await api.get("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json({ user: data }, { status: 200 });
  } catch (error) {
    // El token expiró o es inválido — limpiar la cookie
    const response = NextResponse.json({ user: null }, { status: 401 });
    response.cookies.delete("token");
    return response;
  }
}