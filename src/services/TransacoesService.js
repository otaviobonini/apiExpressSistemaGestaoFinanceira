import { prisma } from "../database/prisma.js";

export default class TransacoesService {
  async createTransaction({ userId, valor, tipo, categoriaId, descricao }) {
    if (!userId || valor === null || !tipo || !categoriaId) {
      throw new Error("missing data");
    }
    const categoria = await prisma.categoria.findFirst({
      where: {
        id: categoriaId,
        userId,
      },
    });

    if (!categoria) {
      throw new Error("Category not found");
    }

    const newTransaction = await prisma.transacoes.create({
      data: {
        userId,
        valor: Number(valor),
        tipo,
        categoriaId: categoria.id,
        descricao,
      },
    });

    return newTransaction;
  }
  async listTransactions({ userId }) {
    if (!userId) {
      throw new Error("missing data");
    }
    const transactions = await prisma.transacoes.findMany({
      where: { userId },
    });
    return transactions;
  }
  async deleteTransaction({ userId, transactionId }) {
    if (!userId || !transactionId) {
      throw new Error("missing data");
    }
    const transaction = await prisma.transacoes.findFirst({
      where: { userId, id: transactionId },
    });

    if (!transaction) {
      throw new Error("transaction not found");
    }
    const deletedTransaction = await prisma.transacoes.delete({
      where: { id: transactionId },
    });
    return deletedTransaction;
  }
}
