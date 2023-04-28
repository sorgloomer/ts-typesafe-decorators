import * as z from "zod";

import { Exactly, ZodSafe } from "../src";


export interface ContactDto {
  id: number;
  name?: string;
}

export const ContactSchema = ZodSafe(
  z.object({
    id: z.number().int(),
    name: z.string(), // Oops, we forgot .optional()!
  })
).infer<Exactly<ContactDto>>();
//      ^^^^^^^^^^^^^^^^^^^
//  Type 'Exactly<ContactDto>' does not satisfy the constraint 'Type<...>'.
//  Type 'string | undefined' is not assignable to type 'string';
