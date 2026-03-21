import { prisma } from "../database/prisma.js";

export default class TransacoesService {
  async createTransaction({ userId, valor, tipo, categoriaNome, descricao }) {
    if (!userId || valor === null || !tipo) {
      throw new Error("missing data");
    }
    let categoriaId = null;

    if (categoriaNome) {
      const categoria = await prisma.categoria.findFirst({
        where: {
          nome: categoriaNome,
          userId,
        },
      });
      if (!categoria) {
        throw new Error("Category not found");
      }

      categoriaId = categoria.id;
    }

    const newTransaction = await prisma.transacoes.create({
      data: {
        userId,
        valor: Number(valor),
        tipo,
        categoriaId,
        descricao,
      },
      include: {
        categoria: true,
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
      include: { categoria: true },
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
