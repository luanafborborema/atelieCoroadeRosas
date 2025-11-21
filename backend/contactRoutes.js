const express = require('express');
const Contact = require('./Contact');
const verificarToken = require('./auth');

const router = express.Router();

// GET CONTACTS
router.get('/get', async (req, res) => {
  try {
    let contato = await Contact.findOne();

    if (!contato) {
      contato = new Contact();
      await contato.save();
    }

    res.json(contato);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter contatos: ' + error.message });
  }
});

// UPDATE CONTACTS
router.put('/update', verificarToken, async (req, res) => {
  try {
    const { whatsapp, instagramLoja, instagramPessoal, email, endereco } = req.body;

    let contato = await Contact.findOne();

    if (!contato) {
      contato = new Contact();
    }

    contato.whatsapp = whatsapp || contato.whatsapp;
    contato.instagramLoja = instagramLoja || contato.instagramLoja;
    contato.instagramPessoal = instagramPessoal || contato.instagramPessoal;
    contato.email = email || contato.email;
    contato.endereco = endereco || contato.endereco;
    contato.dataAtualizacao = new Date();

    await contato.save();

    res.json({ message: 'Contatos atualizados com sucesso', contato });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar contatos: ' + error.message });
  }
});

module.exports = router;
