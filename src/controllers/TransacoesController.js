import TransacoesService from "../services/TransacoesService.js";

const service = new TransacoesService();

class TransacoesController {
  async createTransaction(req, res) {
    try {
      const userId = req.userId;
      const transaction = await service.createTransaction({
        userId,
        ...req.body,
      });
      return res.status(201).json(transaction);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listTransactions(req, res) {
    try {
      const userId = req.userId;
      const transactions = await service.listTransactions({ userId });
      return res.json(transactions);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteTransaction(req, res) {
    try {
      const userId = req.userId;
      const { transactionId } = req.params;

      const transaction = await service.deleteTransaction({
        userId,
        transactionId: Number(transactionId),
      });

      return res.json(transaction);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new TransacoesController();
