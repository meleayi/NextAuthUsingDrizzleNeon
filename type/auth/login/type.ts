import { string, z } from "zod";

export const loginUserFormSchama = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(3, "The password filed must be greater than 3 charactor")
    .nonempty(),
});

export type loginUserFormSchamaValues = z.infer<typeof loginUserFormSchama>