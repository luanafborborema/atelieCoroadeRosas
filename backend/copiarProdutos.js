const mongoose = require('mongoose');
require('dotenv').config();

// Script para copiar produtos da coleção 'produtos' para 'products'

async function copiarProdutos() {
  try {
    console.log('🔄 Iniciando cópia de produtos...\n');

    // Conectar ao MongoDB
    console.log('Conectando ao MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado\n');

    // Obter a coleção antiga
    const db = mongoose.connection.db;
    const colecaoAntiga = db.collection('produtos');
    const colecaoNova = db.collection('products');

    // Contar produtos na coleção antiga
    console.log('📦 Buscando produtos na coleção antiga...');
    const produtosAntigos = await colecaoAntiga.find({}).toArray();
    console.log(`✅ Encontrados ${produtosAntigos.length} produtos\n`);

    if (produtosAntigos.length === 0) {
      console.log('⚠️  Nenhum produto encontrado na coleção antiga');
      process.exit(0);
    }

    // Limpar a coleção nova
    console.log('🗑️  Limpando coleção de destino...');
    await colecaoNova.deleteMany({});
    console.log('✅ Coleção limpa\n');

    // Copiar produtos
    console.log('📤 Copiando produtos...');
    await colecaoNova.insertMany(produtosAntigos);
    console.log(`✅ ${produtosAntigos.length} produtos copiados com sucesso\n`);

    // Verificar resultado
    console.log('=' .repeat(50));
    console.log('📊 RESUMO');
    console.log('=' .repeat(50));
    
    const tercos = await colecaoNova.countDocuments({ categoria: 'tercos' });
    const chaveiros = await colecaoNova.countDocuments({ categoria: 'chaveiros' });
    const pulseiras = await colecaoNova.countDocuments({ categoria: 'pulseiras' });
    const total = await colecaoNova.countDocuments();
    
    console.log(`Total de produtos: ${total}`);
    console.log(`  - Terços: ${tercos}`);
    console.log(`  - Chaveiros: ${chaveiros}`);
    console.log(`  - Pulseiras: ${pulseiras}`);
    console.log(`  - Outros: ${total - tercos - chaveiros - pulseiras}\n`);

    console.log('✨ Cópia concluída com sucesso!');
    console.log('\n🎉 Próximos passos:');
    console.log('  1. Reinicie o servidor: npm start');
    console.log('  2. Acesse: http://localhost:5000/admin.html');
    console.log('  3. Veja todos os seus produtos já lá!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

copiarProdutos();
