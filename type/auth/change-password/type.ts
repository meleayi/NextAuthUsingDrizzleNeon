import { z } from "zod";

//        register type
export const changePasswordformSchema = z
  .object({
    oldPassword: z.string().min(3),
    newPassword: z
      .string()
      .min(3, "Password must be contain at least 5 charactor"),
    confirmPassword: z
      .string()
      .min(3, "Password must be contain at least 5 charactor"),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Password are dont much",
      });
    }
  });

export type changePasswordformSchemaValues = z.infer<
  typeof changePasswordformSchema
>;
