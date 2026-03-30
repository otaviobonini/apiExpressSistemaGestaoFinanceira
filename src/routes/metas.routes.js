import { Router } from "express";
import MetasController from "../controllers/MetasController.js";

const metasRoutes = Router();

metasRoutes.post("/", MetasController.createMeta);
metasRoutes.delete("/:id", MetasController.deleteMeta);
metasRoutes.patch("/add-value/:id", MetasController.addValueMeta);
metasRoutes.patch("/remove-value/:id", MetasController.removeValueMeta);
metasRoutes.get("/", MetasController.listMetas);

export default metasRoutes;
