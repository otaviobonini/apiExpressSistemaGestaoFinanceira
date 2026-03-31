import { z } from "zod";
export const createCategoriasSchema = z.object({
  nome: z.coerce.string().trim().min(2, "Nome muito curto"),
  orcamento: z.coerce.number().positive(),
});

export const deleteCategoriasSchema = z.object({
  categoryId: z.coerce.number().int(),
});
