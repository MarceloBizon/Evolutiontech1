import nodemailer from 'nodemailer'
import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors'

const app = express();
app.use(cors())

// Inicializando o SQLite
const db = new sqlite3.Database('./database.db');

app.use(express.json());

// Criando tabela de usuarios (caso nao tenha sido criada ainda)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      cpf TEXT,
      email TEXT,
      message TEXT
    )
  `);
});

// Rota para visualizar todos os usuarios
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Rota para adicionar um novo usuario
app.post('/users', (req, res) => {
  console.log('🚀 ~ app.post ~ req:', req);
  const { name, cpf, email, message } = req.body;
  db.run('INSERT INTO users (name, cpf, email, message) VALUES (?, ?, ?, ?)', [name, cpf, email, message], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID });
    }
  });
});

// Configurações do nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'evolution.tech.requisicoes@gmail.com',
    pass: 'sgcc xdii puxy oghx'
  }
});

// Rota para enviar email
app.post('/send-email', async (req, res) => {
  const { name, to } = req.body;

  const subject = 'Recebemos sua solicitação de orçamento!'
  const text = `Olá, ${name}. Obrigado por entrar em contato conosco! Em breve retornaremos com mais informações.\n\nAtenciosamente, Evolution Tech.`

  const mailOptions = {
    from: 'evolution.tech.requisicoes@gmail.com', // email do remetente
    to,                          // email do destinatário
    subject,                     // Assunto do email
    text                         // Conteúdo do email
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email enviado com sucesso!', info });
  } catch (error) {
    res.status(500).json({ error: 'Falha ao enviar email', details: error.message });
  }
});

const PORT = 3000;

// Inicializando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} -> http://localhost:${PORT}`);
});