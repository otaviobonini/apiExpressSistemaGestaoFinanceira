import { Router } from "express";
import CategoriasController from "../controllers/CategoriasController.js";
import { validate } from "../middleware/validate.js";
import {
  createCategoriasSchema,
  deleteCategoriasSchema,
} from "../schemas/categorias.schema.js";
const categoriesRoutes = Router();

categoriesRoutes.get("/", CategoriasController.listCategories);
categoriesRoutes.post(
  "/",
  validate(createCategoriasSchema),
  CategoriasController.createCategory,
);
categoriesRoutes.delete(
  "/:categoryId",
  validate(deleteCategoriasSchema, "params"),
  CategoriasController.deleteCategory,
);

export default categoriesRoutes;
