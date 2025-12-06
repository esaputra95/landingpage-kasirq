"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const password = formData.get("password");

  if (password === "admin123") {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "true", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
    });
    redirect("/admin");
  } else {
    return { error: "Invalid password" };
  }
}
