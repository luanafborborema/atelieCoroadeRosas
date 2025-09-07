// --- START OF FILE server.js ---

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexão com MongoDB
const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/atelieDB";
mongoose.connect(dbURI).then(() => console.log('Conectado ao MongoDB!')).catch(err => console.error('Erro de conexão:', err));

// Schema do Produto (Versão final e estável)
const produtoSchema = new mongoose.Schema({
    categoria: { type: String, required: true },
    nome: { type: String, required: true },
    descricao: String,
    preco: { type: Number, required: true },
    imagem: String,     // Para produtos antigos
    imagens: [String],  // Para produtos novos
    visualizacoes: { type: Number, default: 0 },
    pedrasAveMaria: { type: String, default: '' },
    pedrasPaiNosso: { type: String, default: '' },
    detalhesCrucifixo: { type: String, default: '' },
    divisao: { type: String, default: '' }
});
const Produto = mongoose.model('Produto', produtoSchema);

// Configuração do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

// Rota de Login
app.post('/login', (req, res) => {
    const { senha } = req.body;
    const SENHA_CORRETA = process.env.ADMIN_PASSWORD || "nossasenhoradefatima";
    if (senha === SENHA_CORRETA) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, error: 'Senha incorreta' });
    }
});

// Rota de Upload de Múltiplas Imagens
app.post('/upload', upload.array('imagens', 5), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }
    const filenames = req.files.map(file => file.filename);
    res.json({ filenames });
});

// Rota para Cadastrar um Novo Produto
app.post('/produtos', async (req, res) => {
    try {
        const novoProduto = new Produto(req.body);
        await novoProduto.save();
        res.status(201).json({ success: true, produto: novoProduto });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Erro ao cadastrar: ' + error.message });
    }
});

// Rota para Listar Todos os Produtos
app.get('/produtos', async (req, res) => {
    try {
        const produtos = await Produto.find().sort({ nome: 1 });
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erro ao buscar produtos.' });
    }
});

// Rota para Buscar um Produto por ID e Contar o Clique
app.get('/produtos/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'ID inválido.' });
    }
    try {
        const produto = await Produto.findByIdAndUpdate(
            req.params.id, 
            { $inc: { visualizacoes: 1 } }, 
            { new: true }
        );
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }
        res.json(produto);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o produto.' });
    }
});

// Rota para Atualizar (Editar) um Produto
app.put('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: 'ID inválido.' });
    }
    try {
        const produtoAtualizado = await Produto.findByIdAndUpdate(id, req.body, { new: true });
        if (!produtoAtualizado) {
            return res.status(404).json({ success: false, error: 'Produto não encontrado.' });
        }
        res.json({ success: true, produto: produtoAtualizado });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erro interno do servidor.' });
    }
});

// Rota para Excluir um Produto
app.delete('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: 'ID inválido.' });
    }
    try {
        const produtoExcluido = await Produto.findByIdAndDelete(id);
        if (!produtoExcluido) {
            return res.status(404).json({ success: false, error: 'Produto não encontrado.' });
        }
        res.json({ success: true, message: 'Produto excluído.' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erro interno do servidor.' });
    }
});

// Inicia o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));