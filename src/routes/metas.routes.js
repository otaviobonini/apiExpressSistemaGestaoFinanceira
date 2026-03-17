import { Router } from "express";
import MetasController from "../controllers/MetasController.js";

const metasRoutes = Router();

metasRoutes.post("/", MetasController.createMeta);
metasRoutes.delete("/:id", MetasController.deleteMeta);
metasRoutes.patch("/:id", MetasController.addValueMeta);
metasRoutes.get("/", MetasController.listMetas);

export default metasRoutes;
