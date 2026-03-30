import MetasService from "../services/MetasService.js";

const service = new MetasService();

class MetasController {
  async createMeta(req, res) {
    try {
      const userId = req.userId;
      const { nome, dataConclusao, descMeta, objetivo } = req.body;
      const dataFormatada = new Date(dataConclusao);
      const meta = await service.createMeta({
        userId,
        nome,
        dataConclusao: dataFormatada,
        descMeta,
        objetivo: Number(objetivo),
      });
      return res.status(201).json(meta);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  async deleteMeta(req, res) {
    try {
      const userId = req.userId;
      const { id } = req.params;
      const meta = await service.deleteMeta({ userId, id });
      return res.status(200).json(meta);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  async addValueMeta(req, res) {
    try {
      const userId = req.userId;
      const { id } = req.params;
      const { valor } = req.body;
      const meta = await service.adicionarValorMeta({
        userId,
        valor,
        id,
      });
      return res.status(200).json(meta);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  async removeValueMeta(req, res) {
    try {
      const userId = req.userId;
      const { id } = req.params;
      const { valor } = req.body;
      const meta = await service.removerValorMeta({
        userId,
        valor,
        id,
      });
      return res.status(200).json(meta);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  async listMetas(req, res) {
    try {
      const userId = req.userId;

      const metas = await service.getMetas({
        userId,
      });

      return res.json(metas);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new MetasController();
