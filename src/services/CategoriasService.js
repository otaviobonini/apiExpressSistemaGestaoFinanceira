import { prisma } from "../database/prisma.js";

export default class CategoriasService {
  async createCategory({ userId, nome, orcamento }) {
    if (!userId || !nome || !orcamento) {
      throw new Error("missing data");
    }

    const existing = await prisma.categoria.findFirst({
      where: {
        nome,
        userId,
      },
    });

    if (existing) {
      throw new Error("Category already exists");
    }

    const newCategory = await prisma.categoria.create({
      data: {
        userId,
        nome,
        orcamento,
      },
    });

    return newCategory;
  }

  async deleteCategory({ userId, categoryId }) {
    if (!userId || !categoryId) {
      throw new Error("missing data");
    }

    const deletedCategory = await prisma.categoria.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!deletedCategory) {
      throw new Error("Category doesn't exist");
    }

    const deleted = await prisma.categoria.delete({
      where: { id: categoryId },
    });

    return deleted;
  }

  async getCategories({ userId }) {
    if (!userId) {
      throw new Error("missing data");
    }

    const categories = await prisma.categoria.findMany({
      where: { userId },
    });

    return categories;
  }
}
