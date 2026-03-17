import { prisma } from "../database/prisma.js";

export default class MetasService {
  async createMeta({ userId, nome, dataConclusao }) {
    if (!userId || !nome || !dataConclusao) {
      throw new Error("missing data");
    }
    const newMeta = await prisma.metas.create({
      data: { userId, nome, dataConclusao, valorGuardado: 0 },
    });
    return newMeta;
  }
  async deleteMeta({ userId, id }) {
    if (!userId || !id) {
      throw new Error("missing data");
    }
    const meta = await prisma.metas.findFirst({ where: { userId, id } });
    if (!meta) {
      throw new Error("meta not found");
    }
    const deleted = await prisma.metas.delete({ where: { id } });
    return deleted;
  }
  async adicionarValorMeta({ userId, id, valor }) {
    if (!userId || !id) {
      throw new Error("missing data");
    }
    const meta = await prisma.metas.findFirst({ where: { userId, id } });
    if (!meta) {
      throw new Error("meta not found");
    }
    const updatedMeta = await prisma.metas.update({
      where: { id },
      data: { valorGuardado: meta.valorGuardado + Number(valor) },
    });
    return updatedMeta;
  }
  async getMetas({ userId }) {
    if (!userId) {
      throw new Error("missing data");
    }

    const metas = await prisma.metas.findMany({
      where: { userId },
    });

    return metas;
  }
}
