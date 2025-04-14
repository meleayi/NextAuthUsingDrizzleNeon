"use server";

import { db } from "@/db/drizzle";
import { hash } from "bcryptjs";
import { users } from "@/db/usersSchema";
import { eq } from "drizzle-orm";
import { RegisterUserProps } from "@/type/auth/register/typeProps";
import { registerUserformSchema } from "@/type/auth/register/type";

export const registerUser = async ({
  email,
  password,
  confirmPassword,
}: RegisterUserProps) => {
  try {
    // Validate input
    const validation = registerUserformSchema.safeParse({
      email,
      password,
      confirmPassword,
    });

    if (!validation.success) {
      return {
        error: true,
        message: validation.error.issues[0]?.message ?? "Validation failed",
      };
    }

    // Check if user already exists
    // const existingUser = await db
    //   .select()
    //   .from(users)
    //   .where(eq(users.email, email));

    // if (existingUser.length > 0) {
    //   return {
    //     error: true,
    //     message: "User already exists",
    //   };
    // }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Insert new user
    const [newUser] = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
      })
      .returning();

    return {
      error: false,
      message: "Registration successful",
      user: newUser,
    };
  } catch (err: any) {
    if (err.code === "23505") {
      return {
        error: true,
        message:
          "The Error already exist, please try again or login instade of register",
      };
    }
    return {
      error: true,
      message: "An error occurred during registration",
    };
  }
};
