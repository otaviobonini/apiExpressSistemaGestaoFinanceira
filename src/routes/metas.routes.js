import { Router } from "express";
import MetasController from "../controllers/MetasController.js";
import { validate } from "../middleware/validate.js";
import {
  adicionarValorMetaSchema,
  idParamSchema,
  createMetasSchema,
  deleteMetasSchema,
  removerValorMetaSchema,
} from "../schemas/metas.schema.js";
const metasRoutes = Router();

metasRoutes.get("/", MetasController.listMetas);

metasRoutes.post("/", validate(createMetasSchema), MetasController.createMeta);

metasRoutes.delete(
  "/:id",
  validate(deleteMetasSchema, "params"),
  MetasController.deleteMeta,
);

metasRoutes.patch(
  "/add-value/:id",
  validate(idParamSchema, "params"),
  validate(adicionarValorMetaSchema),
  MetasController.addValueMeta,
);

metasRoutes.patch(
  "/remove-value/:id",
  validate(idParamSchema, "params"),
  validate(removerValorMetaSchema),
  MetasController.removeValueMeta,
);

export default metasRoutes;
