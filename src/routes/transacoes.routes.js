import { Router } from "express";
import TransacoesController from "../controllers/TransacoesController.js";

const transactionRoutes = Router();

transactionRoutes.get("/", TransacoesController.listTransactions);
transactionRoutes.post("/", TransacoesController.createTransaction);
transactionRoutes.delete(
  "/:transactionId",
  TransacoesController.deleteTransaction,
);

export default transactionRoutes;
