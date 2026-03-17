import AuthService from "../services/authService.js";

class AuthController {
  async register(req, res) {
    try {
      const service = new AuthService();
      const user = await service.executeRegister(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  async login(req, res) {
    try {
      const service = new AuthService();
      const data = await service.executeLogin(req.body);
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new AuthController();
