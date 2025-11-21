#!/bin/bash

echo "Ateliê Coroa de Rosas - Setup do Projeto"
echo "=========================================="
echo ""

echo "1. Instalando dependências do backend..."
cd backend
npm install

echo ""
echo "2. Dependências instaladas com sucesso!"
echo ""

echo "3. Certifique-se de que MongoDB está rodando:"
echo "   - Windows: mongod"
echo "   - Linux/Mac: brew services start mongodb-community"
echo ""

echo "4. Para iniciar o servidor em desenvolvimento:"
echo "   npm run dev"
echo ""

echo "5. Acesse em http://localhost:5000/admin"
echo ""

echo "6. IMPORTANTE: Após criar a primeira conta:"
echo "   - A conta será criada com status 'pendente'"
echo "   - Use MongoDB Compass ou mongosh para aprovar:"
echo "   db.users.updateOne({username: 'seu-usuario'}, {\$set: {status: 'approved'}})"
echo ""

echo "Setup concluído!"
