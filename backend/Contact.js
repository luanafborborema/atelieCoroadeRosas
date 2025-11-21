const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  whatsapp: {
    type: String,
    default: ''
  },
  instagramLoja: {
    type: String,
    default: ''
  },
  instagramPessoal: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  endereco: {
    type: String,
    default: ''
  },
  dataAtualizacao: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', contactSchema);
