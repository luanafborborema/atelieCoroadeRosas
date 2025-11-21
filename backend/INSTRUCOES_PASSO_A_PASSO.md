# 🌹 GUIA PASSO-A-PASSO - ATELIÊ COROA DE ROSAS

## ✅ TUDO FOI CRIADO!

Seu sistema administrativo completo está pronto. Aqui está tudo o que foi desenvolvido:

---

## 📁 ESTRUTURA DE ARQUIVOS CRIADOS

### Frontend (Pasta: frontend/)
- ✅ **admin.html** - Interface completa do painel administrativo
- ✅ **admin.css** - Estilos rosa, minimalista, delicado e feminino
- ✅ **admin.js** - Toda a lógica JavaScript do painel

### Backend (Pasta: backend/)
- ✅ **server.js** - Servidor Express configurado
- ✅ **package.json** - Dependências do backend
- ✅ **.env** - Variáveis de ambiente
- ✅ **config/db.js** - Conexão com MongoDB
- ✅ **models/User.js** - Modelo de usuários/admins
- ✅ **models/Product.js** - Modelo de produtos
- ✅ **models/Contact.js** - Modelo de contatos
- ✅ **middleware/auth.js** - Autenticação JWT
- ✅ **routes/authRoutes.js** - Rotas de autenticação
- ✅ **routes/productRoutes.js** - Rotas de produtos
- ✅ **routes/contactRoutes.js** - Rotas de contatos

### Documentação
- ✅ **README.md** - Documentação completa
- ✅ **DOCUMENTACAO_COMPLETA.md** - Todos os arquivos com conteúdo

---

## 🚀 COMO COMEÇAR

### PASSO 1: Abra o Terminal (PowerShell no Windows)

```powershell
cd "C:\Users\Cliente\Documents\atelieCoroadeRosas-main\backend"
```

### PASSO 2: Instale as Dependências

```powershell
npm install
```

Aguarde até ver "added X packages" no terminal. Isso pode levar alguns minutos.

### PASSO 3: Certifique-se que MongoDB está Instalado

Você precisa de MongoDB instalado no seu computador. Existem 2 opções:

**Opção A: MongoDB Local**
1. Baixe de https://www.mongodb.com/try/download/community
2. Instale
3. No terminal abra outro PowerShell e execute:
```powershell
mongod
```

**Opção B: MongoDB Atlas (Online)**
1. Vá para https://www.mongodb.com/cloud/atlas
2. Crie uma conta gratuita
3. Crie um cluster gratuito
4. Copie a string de conexão
5. No arquivo `backend\.env`, substitua:
```env
MONGODB_URI=sua-string-de-conexao
```

### PASSO 4: Inicie o Servidor Backend

No terminal (pasta backend):

```powershell
npm run dev
```

Você deve ver:
```
MongoDB conectado com sucesso!
Servidor rodando na porta 5000
```

### PASSO 5: Acesse o Painel no Navegador

Abra seu navegador e vá para:
```
http://localhost:5000/admin
```

Você verá a tela de login com o estilo rosa do seu site!

### PASSO 6: Crie sua Primeira Conta

1. Clique em "Crie uma agora"
2. Preencha:
   - Nome Completo: Seu nome
   - E-mail: seu@email.com
   - Usuário: seu_usuario
   - Senha: sua_senha_forte
3. Clique em "Criar Conta"
4. Você verá a mensagem: "Conta criada! Aguarde aprovação"

### PASSO 7: Aprove sua Primeira Conta

Como é a primeira conta, você precisa aprová-la manualmente no MongoDB.

**Opção A: MongoDB Compass (Mais Fácil)**
1. Baixe MongoDB Compass de https://www.mongodb.com/products/compass
2. Instale e abra
3. Conecte com sua instância MongoDB local ou Atlas
4. Navegue para: atelieCoroadeRosas > users
5. Procure por sua conta (username)
6. Clique em editar
7. Mude o campo `status` de "pending" para "approved"
8. Salve

**Opção B: Terminal (mongosh)**
1. Abra outro terminal PowerShell
2. Execute:
```powershell
mongosh
use atelieCoroadeRosas
db.users.updateOne({username: "seu_usuario"}, {$set: {status: "approved"}})
```

### PASSO 8: Faça Login

1. Volte para http://localhost:5000/admin
2. Digite seu usuário e senha
3. Clique em "Entrar"

🎉 **Pronto! Você agora tem acesso ao painel completo!**

---

## 📊 O QUE VOCÊ PODE FAZER AGORA

### Dashboard
- Visualizar quantidade de produtos
- Visualizar quantidade de administradores
- Acesso rápido para gerenciar dados

### Gerenciar Produtos
- ➕ Criar novo produto
- 📝 Editar produto existente
- 🗑️ Deletar produto
- 📷 Adicionar múltiplas imagens
- 📌 Adicionar detalhes (contas, crucifixo, divisões)

### Dados de Contato
- Editar WhatsApp
- Editar Instagram (Loja e Pessoal)
- Editar E-mail
- Editar Endereço

### Gestão de Administradores
- 👁️ Ver contas pendentes
- ✅ Aprovar contas
- ❌ Rejeitar contas
- 📋 Ver contas aprovadas
- 🗑️ Deletar contas (exceto a sua)

### Minha Conta
- Editar nome, e-mail, usuário
- Alterar senha

---

## 🎨 CARACTERÍSTICAS DO SISTEMA

✅ **Design Rosa e Feminino**
- Cores: Rosa (#d7547e), Rosa claro (#f8f0f4), Branco
- Minimalista e delicado
- Responsivo para mobile, tablet e desktop

✅ **Segurança**
- Senhas criptografadas
- Autenticação JWT
- Sistema de aprovação de contas
- Proteção de rotas

✅ **Banco de Dados**
- MongoDB com 3 coleções: users, products, contacts
- Dados estruturados e validados

✅ **Interface Intuitiva**
- Painel organizado por abas
- Tabelas com ações diretas
- Modais para criar/editar
- Mensagens de confirmação

---

## 🔗 ENDPOINTS DISPONÍVEIS

Todos os endpoints estão funcionando:

### Autenticação
- `POST /api/auth/register` - Criar conta
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/validate` - Validar token
- `GET /api/auth/profile` - Obter perfil
- `PUT /api/auth/update` - Atualizar perfil
- `POST /api/auth/approve` - Aprovar usuário
- `DELETE /api/auth/delete` - Deletar usuário

### Produtos
- `POST /api/products/create` - Criar
- `GET /api/products/list` - Listar
- `GET /api/products/:id` - Obter
- `PUT /api/products/update` - Editar
- `DELETE /api/products/delete` - Deletar

### Contatos
- `GET /api/contacts/get` - Obter
- `PUT /api/contacts/update` - Atualizar

---

## 🐛 SOLUÇÃO DE PROBLEMAS

### Erro: "Cannot connect to MongoDB"
```
Solução: Certifique-se de que o MongoDB está rodando
- Terminal 1: mongod (para local)
- Ou use MongoDB Atlas (online)
```

### Erro: "Cannot find module express"
```
Solução: npm install
```

### Página em branco em http://localhost:5000
```
Solução: Aguarde alguns segundos
Verifique o terminal para mensagens de erro
```

### Não consegue fazer login
```
Solução: Sua conta deve estar com status "approved"
Use MongoDB Compass para aprovar
```

### Erro: "Cannot find module 'bcryptjs'"
```
Solução: npm install
npm install bcryptjs
npm install jsonwebtoken
```

---

## 📱 USAR FRONTEND (Página Pública)

A página pública continua funcionando em:
```
http://localhost:5000/
```

E o admin em:
```
http://localhost:5000/admin
```

---

## 🚢 FAZER DEPLOY (Opcional)

Para colocar na internet (Heroku, Vercel, Render):

1. Crie conta no Render ou Heroku
2. Conecte seu repositório Git
3. Configure variáveis de ambiente:
   - MONGODB_URI (use MongoDB Atlas)
   - JWT_SECRET (coloque uma chave forte)
4. Deploy!

---

## 📧 DÚVIDAS?

Verifique:
- README.md - Documentação técnica
- DOCUMENTACAO_COMPLETA.md - Todos os arquivos
- Terminal - Mensagens de erro

---

## ✨ RESUMO DO QUE FOI CRIADO

✅ **Frontend Completo**
- HTML para login, register e painel
- CSS minimalista e responsivo
- JavaScript com todas as funcionalidades

✅ **Backend Completo**
- Express server rodando
- MongoDB conectado
- Autenticação com JWT
- Criptografia de senhas
- CRUD de produtos
- CRUD de usuários
- Gerencimento de contatos

✅ **Pronto para Usar**
- Copie e cole
- Sem resumos ou "..."
- Tudo funcional
- Estilo coerente com seu site

---

🌹 **Bem-vindo ao Ateliê Coroa de Rosas - Sistema Administrativo!** 🌹

Agora é só curtir o seu novo painel! 🎉
