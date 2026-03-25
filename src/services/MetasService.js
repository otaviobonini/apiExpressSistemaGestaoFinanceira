import { prisma } from "../database/prisma.js";

export default class MetasService {
  async createMeta({ userId, nome, dataConclusao, descMeta, objetivo }) {
    if (!userId) throw new Error("userId is required");
    if (!nome) throw new Error("nome is required");
    if (!dataConclusao) throw new Error("dataConclusao is required");
    if (!descMeta) throw new Error("descMeta is required");
    if (!objetivo) throw new Error("objetivo is required");
    if (!userId || !nome || !dataConclusao || !descMeta || !objetivo) {
      throw new Error("missing data");
    }
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
    if (!userId || !id) {
      throw new Error("missing data");
    }

    const meta = await prisma.metas.findFirst({
      where: { userId, id: Number(id) },
    });
    if (!meta) {
      throw new Error("meta not found");
    }
    const deleted = await prisma.metas.delete({ where: { id: Number(id) } });
    return deleted;
  }
  async adicionarValorMeta({ userId, id, valor }) {
    if (!userId || !id) {
      throw new Error("missing data");
    }
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
    if (!userId) {
      throw new Error("missing data");
    }

    const metas = await prisma.metas.findMany({
      where: { userId },
    });

    return metas;
  }
}
