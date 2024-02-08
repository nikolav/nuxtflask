import { z } from "zod";

export const schemaAuthData = z.object({
  email: z.string().email(),
  id: z.coerce.number(),
});
