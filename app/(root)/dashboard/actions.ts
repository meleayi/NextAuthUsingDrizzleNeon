// app/dashboard/actions.ts
"use server";

import { auth, signOut } from "@/auth";

export async function getSession() {
  return await auth();
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}
