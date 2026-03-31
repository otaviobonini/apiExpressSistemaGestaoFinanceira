import AuthService from "../services/AuthService.js";

const service = new AuthService();

class AuthController {
  async register(req, res) {
    try {
      const user = await service.executeRegister(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  async login(req, res) {
    try {
      const data = await service.executeLogin(req.body);
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new AuthController();
