"use server";

import { db } from "@/db/drizzle";
import { hash, compare } from "bcryptjs";
import { users } from "@/db/usersSchema";
import { and, eq } from "drizzle-orm";
import { changePasswordProps } from "@/type/auth/change-password/typeProps";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const ChangePassword = async ({
  oldPassword,
  password,
  confirmPassword,
}: changePasswordProps) => {
  const session = await auth();

  try {
    // 3. Verify old password (with null check)
    if (password !== confirmPassword) {
      return {
        error: true,
        message: "password not much",
      };
    }

    const email = session?.user?.email || "";

    // 1. Get user from database
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return {
        error: true,
        message: "User not found",
      };
    }
    if (oldPassword === password) {
      return {
        error: true,
        message: "Password are the same",
      };
    }

    // 4. Verify old password
    const isPasswordValid = await compare(oldPassword, user.password!);
    if (!isPasswordValid) {
      return {
        error: true,
        message: "Incorrect old password",
      };
    }

    // 5. Hash and update new password
    const newHashedPassword = await hash(password, 10);
    await db
      .update(users)
      .set({ password: newHashedPassword })
      .where(eq(users.email, email));
    return {
      error: false,
      message: "Password updated successfully",
    };
  } catch (err: any) {
    console.error("Password change error:", err);
    return {
      error: true,
      message: "An error occurred while updating password",
    };
  }
};
