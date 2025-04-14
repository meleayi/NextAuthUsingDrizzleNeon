import { z } from "zod";

//        register type
export const registerUserformSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(3, "Password must be contain at least 5 charactor"),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Password are dont much",
      });
    }
  });

export type RegisterUserFormSchemaValues = z.infer<typeof registerUserformSchema>;
