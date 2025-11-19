import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';
import initialAdmin from './initialAdmin.json' with { type: 'json' };

export async function openDb() {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
}

export async function createTables() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT,
      profile_photo TEXT,
      is_admin INTEGER DEFAULT 0
    )
  `);

  // Verifica se já existe admin
  const adminExists = await db.get(`SELECT * FROM users WHERE is_admin = 1 LIMIT 1`);
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash(initialAdmin.password, 10);
    await db.run(
      `INSERT INTO users (email, password, name, is_admin) VALUES (?, ?, ?, ?)`,
      initialAdmin.email,
      hashedPassword,
      initialAdmin.name,
      initialAdmin.isAdmin ? 1 : 0
    );
    console.log('Admin inicial criado no banco.');
  }
}
