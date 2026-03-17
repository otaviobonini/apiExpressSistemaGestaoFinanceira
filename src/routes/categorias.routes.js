import { Router } from "express";
import CategoriasController from "../controllers/CategoriasController.js";

const categoriesRoutes = Router();

categoriesRoutes.get("/", CategoriasController.listCategories);
categoriesRoutes.post("/", CategoriasController.createCategory);
categoriesRoutes.delete("/:categoryId", CategoriasController.deleteCategory);

export default categoriesRoutes;
