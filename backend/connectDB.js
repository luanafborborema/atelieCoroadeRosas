const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/atelie-coroa-de-rosas';
    await mongoose.connect(mongoUri);
    console.log('MongoDB conectado com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar com MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
