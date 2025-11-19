import express from 'express';
import cors from 'cors';
import userRoutes from './routes/UserRoutes.ts';       // Importar com extensão .js, saída compilada
import { createTables } from './database/db.ts';         // Importar com extensão .js
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.ts';         // Import com .js

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

app.use('/uploads', express.static('uploads')); // Servir uploads como arquivos estáticos

// Rotas principais
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

createTables()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err: unknown) => {
    console.error('Erro ao criar tabelas:', err);
  });
