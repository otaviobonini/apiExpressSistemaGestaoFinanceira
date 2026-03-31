import { Router } from "express";
import TransacoesController from "../controllers/TransacoesController.js";
import { validate } from "../middleware/validate.js";
import {
  createTransactionSchema,
  deleteTransactionSchema,
} from "../schemas/transacoes.schema.js";

const transactionRoutes = Router();

transactionRoutes.get("/", TransacoesController.listTransactions);
transactionRoutes.post(
  "/",
  validate(createTransactionSchema),
  TransacoesController.createTransaction,
);
transactionRoutes.delete(
  "/:transactionId",
  validate(deleteTransactionSchema, "params"),
  TransacoesController.deleteTransaction,
);

export default transactionRoutes;
