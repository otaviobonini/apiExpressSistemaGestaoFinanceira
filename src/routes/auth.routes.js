import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema), AuthController.register);
authRoutes.post("/login", validate(loginSchema), AuthController.login);

export default authRoutes;
