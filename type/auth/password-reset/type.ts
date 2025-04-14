import { z } from "zod";

//        register type
export const passwordRestFormSchema = z
  .object({
    email: z.string().email(),

  })

export type passwordRestFormSchemaValues = z.infer<typeof passwordRestFormSchema>;
