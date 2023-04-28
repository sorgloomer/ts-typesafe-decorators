import * as z from "zod";

import { Extends, Super, ZodSafe } from "../src";


export interface TransferDto {
  amount: string;
  description?: string;
}

export interface TransferEntity {
  amount?: bigint;
  description?: string;
}

export const TransferSchema = z.object({
  amount: z.string().transform(BigInt).optional(),
  description: z.string().optional(),
});

ZodSafe(TransferSchema).matches<{
  input: Super<TransferDto>,
  output: Extends<TransferEntity>,
}>();

