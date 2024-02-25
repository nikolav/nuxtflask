import { z } from "zod";
import { DOC_ID_ADMIN } from "@/config";

export const schemaAuthDataAdmin = z.object({
  email: z.string().email(),
  id: z.literal(DOC_ID_ADMIN),
});
