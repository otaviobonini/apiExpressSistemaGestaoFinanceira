import express from "express";
import authRoutes from "../routes/auth.routes.js";
import categoriesRoutes from "../routes/categorias.routes.js";
import transactionRoutes from "../routes/transacoes.routes.js";
import authMiddleware from "../middleware/authMiddleware.js";
import metasRoutes from "../routes/metas.routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

app.use(authMiddleware);
app.use("/transactions", transactionRoutes);
app.use("/categories", categoriesRoutes);
app.use("/metas", metasRoutes);

export default app;
