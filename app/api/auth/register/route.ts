import api from "@/lib/axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const { data } = await api.post("/api/auth/register", body);

    const response = NextResponse.json({ success: true });
    response.cookies.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Status:", error?.response?.status);
    console.error("Data:", error?.response?.data);
    console.error("Message:", error?.message);

    return NextResponse.json(
      { success: false, message: error?.response?.data ?? error?.message },
      { status: error?.response?.status ?? 500 }
    );
  }
}