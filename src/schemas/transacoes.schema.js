import { z } from "zod";

export const createTransactionSchema = z.object({
  valor: z.coerce.number().positive(),
  tipo: z.enum(["entrada", "saida"]),
  categoriaNome: z.string().min(2).trim().optional(),
  descricao: z.string().max(100).optional(),
});

export const deleteTransactionSchema = z.object({
  transactionId: z.coerce.number().int(),
});
