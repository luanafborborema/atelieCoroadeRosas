const express = require('express');
const Product = require('./Product');
const verificarToken = require('./auth');

const router = express.Router();

// CREATE PRODUCT
router.post('/create', verificarToken, async (req, res) => {
  try {
    const { nome, categoria, preco, descricao, imagens, pedrasAveMaria, pedrasPaiNosso, detalhesCrucifixo, divisao } = req.body;

    if (!nome || !categoria || !preco) {
      return res.status(400).json({ message: 'Nome, categoria e preço são obrigatórios' });
    }

    const novoProduto = new Product({
      nome,
      categoria,
      preco,
      descricao: descricao || '',
      imagens: imagens || [],
      pedrasAveMaria: pedrasAveMaria || '',
      pedrasPaiNosso: pedrasPaiNosso || '',
      detalhesCrucifixo: detalhesCrucifixo || '',
      divisao: divisao || ''
    });

    await novoProduto.save();

    res.status(201).json({ message: 'Produto criado com sucesso', produto: novoProduto });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto: ' + error.message });
  }
});

// GET ALL PRODUCTS
router.get('/list', async (req, res) => {
  try {
    const produtos = await Product.find();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar produtos: ' + error.message });
  }
});

// GET SINGLE PRODUCT
router.get('/:id', async (req, res) => {
  try {
    const produto = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { visualizacoes: 1 } },
      { new: true }
    );

    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json(produto);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter produto: ' + error.message });
  }
});

// UPDATE PRODUCT
router.put('/update', verificarToken, async (req, res) => {
  try {
    const { id, nome, categoria, preco, descricao, imagens, pedrasAveMaria, pedrasPaiNosso, detalhesCrucifixo, divisao } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID do produto é obrigatório' });
    }

    const produtoAtualizado = await Product.findByIdAndUpdate(
      id,
      {
        nome,
        categoria,
        preco,
        descricao: descricao || '',
        imagens: imagens || [],
        pedrasAveMaria: pedrasAveMaria || '',
        pedrasPaiNosso: pedrasPaiNosso || '',
        detalhesCrucifixo: detalhesCrucifixo || '',
        divisao: divisao || ''
      },
      { new: true }
    );

    if (!produtoAtualizado) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json({ message: 'Produto atualizado com sucesso', produto: produtoAtualizado });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto: ' + error.message });
  }
});

// DELETE PRODUCT
router.delete('/delete', verificarToken, async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID do produto é obrigatório' });
    }

    const produto = await Product.findByIdAndDelete(id);

    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar produto: ' + error.message });
  }
});

module.exports = router;
