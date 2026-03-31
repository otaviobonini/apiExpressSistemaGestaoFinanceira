import { z } from "zod";

export const createMetasSchema = z.object({
  nome: z.string().trim().min(2, "Nome muito curto"),
  dataConclusao: z.coerce.date(),
  descMeta: z.string().trim().max(50, "Descrição muito longa"),
  objetivo: z.coerce.number().positive(),
});

export const idParamSchema = z.object({
  id: z.coerce.number().int(),
});

export const deleteMetasSchema = idParamSchema;

export const adicionarValorMetaSchema = z.object({
  valor: z.coerce.number().positive(),
});

export const removerValorMetaSchema = z.object({
  valor: z.coerce.number().positive(),
});
