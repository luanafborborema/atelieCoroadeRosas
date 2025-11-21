const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./connectDB');
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const contactRoutes = require('./contactRoutes');
const path = require('path');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/contacts', contactRoutes);

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rota para o admin.html (frontend)
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'admin.html'));
});

// Qualquer outra rota que não seja da API, redireciona para o index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));