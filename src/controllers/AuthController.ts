import type { Request, Response } from "express";
import { openDb } from "../database/db.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const db = await openDb();

  const user = await db.get("SELECT * FROM users WHERE email = ?", email);
  if (!user) return res.status(401).json({ message: "Usuário não encontrado" });

  const passwordOk = await bcrypt.compare(password, user.password);
  if (!passwordOk) return res.status(401).json({ message: "Senha inválida" });

  const token = jwt.sign(
    { id: user.id, email: user.email, is_admin: Boolean(user.is_admin) },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }

    );

  res.json({ token });
}
