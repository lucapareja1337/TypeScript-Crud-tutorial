import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { openDb } from '../database/db.ts';
import path from 'path';

export async function createUser(req: Request, res: Response) {
  const db = await openDb();
  try {
    const { email, password, name } = req.body;
    let isAdmin = false;
    if ((req.user as any)?.is_admin) {
      isAdmin = req.body.isAdmin === true; // Admin pode criar admins
    }
    // usuário comum nunca ganha isAdmin true

    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePhoto = req.file ? req.file.filename : null;

    const result = await db.run(
      `INSERT INTO users (email, password, name, profile_photo, is_admin) VALUES (?, ?, ?, ?, ?)`,
      email, hashedPassword, name, profilePhoto, isAdmin ? 1 : 0
    );

    res.status(201).json({ id: result.lastID, email, name, profilePhoto, isAdmin });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    if ((error as any)?.code === 'SQLITE_CONSTRAINT') {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }
    res.status(500).json({ message: 'Erro interno', error });
  }
}


export async function getUsers(req: Request, res: Response) {
  const db = await openDb();
  const users = await db.all(`SELECT id, email, name, profile_photo, is_admin FROM users`);
  res.json(users);
}

export async function getUserById(req: Request, res: Response) {
  const db = await openDb();
  const user = await db.get(`SELECT id, email, name, profile_photo, is_admin FROM users WHERE id = ?`, req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.json(user);
}

export async function updateUser(req: Request, res: Response) {
  const db = await openDb();
  try {
    const { name, password, isAdmin } = req.body;
    const userId = req.params.id;
    const profilePhoto = req.file ? req.file.filename : undefined;

    let hashedPassword: string | null = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Buscar o usuário para assegurar que existe
    const user = await db.get(`SELECT * FROM users WHERE id = ?`, userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    // Atualiza os campos se forem passados
    await db.run(
      `UPDATE users SET name = COALESCE(?, name), password = COALESCE(?, password), profile_photo = COALESCE(?, profile_photo), is_admin = COALESCE(?, is_admin) WHERE id = ?`,
      name || null,
      hashedPassword,
      profilePhoto || null,
      typeof isAdmin === 'boolean' ? (isAdmin ? 1 : 0) : null,
      userId
    );

    res.json({ message: 'Usuário atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno', error });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const db = await openDb();
  const { id } = req.params;

  const user = await db.get(`SELECT * FROM users WHERE id = ?`, id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

  await db.run(`DELETE FROM users WHERE id = ?`, id);
  res.json({ message: 'Usuário deletado com sucesso' });
}
