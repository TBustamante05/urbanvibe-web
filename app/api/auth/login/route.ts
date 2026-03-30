import api from "@/lib/axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const { data } = await api.post("/api/auth/login", body);

    const response = NextResponse.json({ success: true });
    response.cookies.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = error?.response?.status ?? 500;
    const message = error?.response?.data?.message ?? "Error inesperado";
    return NextResponse.json({ success: false, message }, { status });
  }
}