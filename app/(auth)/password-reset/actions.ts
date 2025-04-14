"use server";

import { auth } from "@/auth";
import { db } from "@/db/drizzle";
import { passwordResetTokens } from "@/db/passwordResetTokenSchema";
import { users } from "@/db/usersSchema";
import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";
import React from "react";

const passwordReset = async (email: string) => {
  const session = await auth();

  if (session?.user?.id) {
    return {
      error: true,
      message: "You are already logged in",
    };
  }

  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email));

  if (!user) {
    return;
  }
  const passwordResetToken = randomBytes(32).toString("hex");
  const tokenExpiry = new Date(Date.now()+3600000)

  await db.insert(passwordResetTokens).values({
    userId:user.id,
    token:passwordResetToken,
    tokenExpiry:tokenExpiry
  }).onConflictDoUpdate({target:passwordResetTokens.userId,
    set:{
      token:passwordResetToken,
      tokenExpiry
    }
  })

  console.log({ passwordResetToken });
};

export default passwordReset;
