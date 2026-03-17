import CategoriasService from "../services/CategoriasService.js";

const service = new CategoriasService();

class CategoriasController {
  async createCategory(req, res) {
    try {
      const userId = req.userId;

      const category = await service.createCategory({
        userId,
        ...req.body,
      });

      return res.status(201).json(category);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteCategory(req, res) {
    try {
      const userId = req.userId;
      const { categoryId } = req.params;

      const category = await service.deleteCategory({
        userId,
        categoryId: Number(categoryId),
      });

      return res.json(category);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listCategories(req, res) {
    try {
      const userId = req.userId;

      const categories = await service.getCategories({
        userId,
      });

      return res.json(categories);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new CategoriasController();
