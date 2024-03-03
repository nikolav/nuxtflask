import { z } from "zod";
import { DOC_ID_ADMIN, DOC_ID_USER_DEFAULT } from "@/config";

const userIdReserved = [DOC_ID_ADMIN, DOC_ID_USER_DEFAULT];

export const schemaUsersNotReserved = z.coerce
  .number()
  .refine((num) => !userIdReserved.includes(num));
