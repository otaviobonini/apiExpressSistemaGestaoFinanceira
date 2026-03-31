import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../database/prisma.js";

export default class AuthService {
  async executeRegister({ email, name, password }) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new Error("Email already in use");
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
    const usedEmail = await prisma.user.findUnique({ where: { email } });
    if (!usedEmail) {
      throw new Error("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(
      password,
      usedEmail.passwordHash,
    );
    if (!passwordMatch || !usedEmail) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ id: usedEmail.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return {
      user: {
        id: usedEmail.id,
        email: usedEmail.email,
        name: usedEmail.name,
      },
      token,
    };
  }
}
