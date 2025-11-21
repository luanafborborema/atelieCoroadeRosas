const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    enum: ['tercos', 'chaveiros', 'pulseiras'],
    required: true
  },
  descricao: {
    type: String,
    default: ''
  },
  preco: {
    type: Number,
    required: true
  },
  imagens: {
    type: [String],
    default: []
  },
  pedrasAveMaria: {
    type: String,
    default: ''
  },
  pedrasPaiNosso: {
    type: String,
    default: ''
  },
  detalhesCrucifixo: {
    type: String,
    default: ''
  },
  divisao: {
    type: String,
    default: ''
  },
  visualizacoes: {
    type: Number,
    default: 0
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
