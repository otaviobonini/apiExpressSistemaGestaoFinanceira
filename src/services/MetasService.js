import { prisma } from "../database/prisma.js";

export default class MetasService {
  async createMeta({ userId, nome, dataConclusao, descMeta, objetivo }) {
    const newMeta = await prisma.metas.create({
      data: {
        userId,
        nome,
        descMeta,
        dataConclusao,
        objetivo,
        valorGuardado: 0,
      },
    });
    return newMeta;
  }
  async deleteMeta({ userId, id }) {
    const meta = await prisma.metas.findFirst({
      where: { userId, id: Number(id) },
    });
    if (!meta) {
      throw new Error("meta not found");
    }
    const deleted = await prisma.metas.delete({ where: { id: Number(id) } });
    return deleted;
  }
  async removerValorMeta({ userId, id, valor }) {
    const meta = await prisma.metas.findFirst({
      where: { userId, id: Number(id) },
    });
    if (!meta) {
      throw new Error("meta not found");
    }
    const updatedMeta = await prisma.metas.update({
      where: { id: Number(id) },
      data: { valorGuardado: Number(meta.valorGuardado) - Number(valor) },
    });
    return updatedMeta;
  }

  async adicionarValorMeta({ userId, id, valor }) {
    const meta = await prisma.metas.findFirst({
      where: { userId, id: Number(id) },
    });
    if (!meta) {
      throw new Error("meta not found");
    }
    const updatedMeta = await prisma.metas.update({
      where: { id: Number(id) },
      data: { valorGuardado: Number(meta.valorGuardado) + Number(valor) },
    });
    return updatedMeta;
  }
  async getMetas({ userId }) {
    const metas = await prisma.metas.findMany({
      where: { userId },
    });

    return metas;
  }
}
