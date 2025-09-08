// --- START OF FILE server.js ---

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/atelieDB";
mongoose.connect(dbURI).then(() => console.log('Conectado ao MongoDB!')).catch(err => console.error('Erro de conexão:', err));

const produtoSchema = new mongoose.Schema({
    categoria: { type: String, required: true },
    nome: { type: String, required: true },
    descricao: String,
    preco: { type: Number, required: true },
    imagem: String,     // Mantido apenas para compatibilidade temporária
    imagens: [String],
    visualizacoes: { type: Number, default: 0 },
    pedrasAveMaria: { type: String, default: '' },
    pedrasPaiNosso: { type: String, default: '' },
    detalhesCrucifixo: { type: String, default: '' },
    divisao: { type: String, default: '' }
});
const Produto = mongoose.model('Produto', produtoSchema);

// Rotas simples
app.post('/login', (req, res) => { const { senha } = req.body; const SENHA_CORRETA = process.env.ADMIN_PASSWORD || "nossasenhoradefatima"; if (senha === SENHA_CORRETA) res.json({ success: true }); else res.status(401).json({ success: false, error: 'Senha incorreta' }); });
app.post('/produtos', async (req, res) => { try { const novoProduto = new Produto(req.body); await novoProduto.save(); res.status(201).json({ success: true, produto: novoProduto }); } catch (error) { res.status(400).json({ success: false, error: 'Erro ao cadastrar: ' + error.message }); } });
app.get('/produtos', async (req, res) => { try { const produtos = await Produto.find().sort({ nome: 1 }); res.json(produtos); } catch (error) { res.status(500).json({ success: false, error: 'Erro ao buscar produtos.' }); } });
app.delete('/produtos/:id', async (req, res) => { const { id } = req.params; if (!mongoose.Types.ObjectId.isValid(id)) { return res.status(400).json({ success: false, error: 'ID inválido.' }); } try { const produtoExcluido = await Produto.findByIdAndDelete(id); if (!produtoExcluido) { return res.status(404).json({ success: false, error: 'Produto não encontrado.' }); } res.json({ success: true, message: 'Produto excluído.' }); } catch (error) { res.status(500).json({ success: false, error: 'Erro interno do servidor.' }); } });
app.get('/produtos/:id', async (req, res) => { if (!mongoose.Types.ObjectId.isValid(req.params.id)) { return res.status(400).json({ error: 'ID inválido.' }); } try { const produto = await Produto.findByIdAndUpdate(req.params.id, { $inc: { visualizacoes: 1 } }, { new: true }); if (!produto) { return res.status(404).json({ error: 'Produto não encontrado.' }); } res.json(produto); } catch (error) { res.status(500).json({ error: 'Erro ao buscar o produto.' }); } });

// ROTA DE ATUALIZAÇÃO (EDITAR) COM LÓGICA DE APAGAR O CAMPO ANTIGO
app.put('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: 'ID inválido.' });
    }
    
    const dadosAtualizados = req.body;
    
    // Cria a operação base para atualizar os campos
    const operacaoDeUpdate = {
        $set: dadosAtualizados
    };
    
    // Se o frontend mandar a instrução 'imagem: undefined', nós instruímos o MongoDB a
    // REMOVER completamente o campo 'imagem' do documento.
    if ('imagem' in dadosAtualizados && dadosAtualizados.imagem === undefined) {
        operacaoDeUpdate.$unset = { imagem: 1 };
        delete dadosAtualizados.imagem; // Remove para não conflitar com $set
    }
    
    try {
        const produtoAtualizado = await Produto.findByIdAndUpdate(id, operacaoDeUpdate, { new: true });
        if (!produtoAtualizado) {
            return res.status(404).json({ success: false, error: 'Produto não encontrado para atualização.' });
        }
        res.json({ success: true, produto: produtoAtualizado });
    } catch (error) {
        console.error("ERRO AO ATUALIZAR:", error);
        res.status(500).json({ success: false, error: 'Erro interno do servidor ao atualizar.' });
    }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));