import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../database/prisma.js";

export default class AuthService {
  async executeRegister({ email, name, password }) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new Error("Email already in use");
    }
    if (!email || !password || !name) {
      throw new Error("missing data");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const data = {
      email,
      name,
      passwordHash,
    };
    const newUser = await prisma.user.create({ data });
    return newUser;
  }

  async executeLogin({ email, password }) {
    if (!email || !password) {
      throw new Error("missing data");
    }
    const usedEmail = await prisma.user.findUnique({ where: { email } });
    if (!usedEmail) {
      throw new Error("email not found");
    }
    const passwordMatch = await bcrypt.compare(
      password,
      usedEmail.passwordHash,
    );
    if (!passwordMatch) {
      throw new Error("Invalida password");
    }
    const token = jwt.sign({ id: usedEmail.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return { usedEmail, token };
  }
}
