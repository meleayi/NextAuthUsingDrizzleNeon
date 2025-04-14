"use server";

import { signIn } from "@/auth";
import { loginUserFormSchama } from "@/type/auth/login/type";
import { loginUserPros } from "@/type/auth/login/typeProps";
import { AuthError } from "next-auth";

export const loginUser = async ({ email, password }: loginUserPros) => {
  // Input validation
  const loginValidation = loginUserFormSchama.safeParse({ email, password });
  if (!loginValidation.success) {
    return {
      error: true,
      message: loginValidation.error.issues[0]?.message ?? "Validation failed",
    };
  }

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // im use false because i want to do this the client side, if you want to true the uncomment the next line
      // redirectTo: "/dashboard",
    });

    return {
      error: true,
      message: "Login failed for unknown reason",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: true,
            message: "Invalid credentials",
          };
        default:
          return { error: true, message: "Something went wrong" };
      }
    }
    throw error;
  }
};
