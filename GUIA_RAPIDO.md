# 🚀 COMO INICIAR O PROJETO - GUIA RÁPIDO

## ❌ ERRO RESOLVIDO!

**Erro:** `Failed to load resource: net::ERR_CONNECTION_REFUSED`

**Causa:** O servidor backend não estava rodando

**Solução:** Siga os passos abaixo

---

## ✅ INICIANDO O PROJETO

### PASSO 1: Abra PowerShell (Administrador)

Clique com botão direito na área vazia do seu computador e selecione "Abrir PowerShell aqui (Administrador)"

Ou pressione `Win + X` e escolha "Windows PowerShell (Administrador)"

### PASSO 2: Navegue até a pasta do projeto

```powershell
cd "C:\Users\Cliente\Documents\atelieCoroadeRosas-main"
```

### PASSO 3: Instale as dependências (primeira vez apenas)

```powershell
cd backend
npm install
cd ..
```

### PASSO 4: Inicie MongoDB

**OPÇÃO A: MongoDB Local**

Abra UM NOVO PowerShell (não feche o anterior!) e execute:

```powershell
mongod
```

Você verá mensagens como:
```
[initandlisten] waiting for connections on port 27017
```

**OPÇÃO B: MongoDB Atlas (Online)**

Se você usa MongoDB Atlas, continue para o próximo passo (já está configurado).

### PASSO 5: Inicie o Servidor Backend

No PowerShell original, execute:

```powershell
cd backend
npm run dev
```

Você verá:
```
MongoDB conectado com sucesso!
Servidor rodando na porta 5000
```

⏸️ **DEIXE ESTE TERMINAL ABERTO** - O servidor precisa estar rodando!

---

## 🌐 ACESSAR O PAINEL

Abra seu navegador e vá para:

```
http://localhost:5000/admin
```

---

## 📝 CRIAR PRIMEIRA CONTA

1. Clique em "Crie uma agora"
2. Preencha os dados:
   - **Nome:** Seu nome
   - **E-mail:** seu@email.com
   - **Usuário:** seu_usuario
   - **Senha:** senha_forte
3. Clique em "Criar Conta"

✅ **A primeira conta é aprovada AUTOMATICAMENTE!**

Você já pode fazer login!

---

## 🔐 CRIAR OUTRAS CONTAS

Quando outras pessoas criarem contas, elas ficarão com status **PENDENTE**.

Você (como admin aprovado) verá na aba "Gestão de Admins":
- Aba "Contas Pendentes" → mostra quem quer ser admin
- Aba "Contas Aprovadas" → mostra admins já aceitos

### Para Aprovar uma Conta:

1. Vá para "Gestão de Admins"
2. Clique em "Contas Pendentes"
3. Clique em "Aceitar novo Admin"
4. **Digite sua própria senha para confirmar**
5. Pronto! A conta foi aprovada

### Para Rejeitar uma Conta:

1. Vá para "Gestão de Admins"
2. Clique em "Contas Pendentes"
3. Clique em "Recusar/Excluir"
4. **Digite sua própria senha para confirmar**
5. Pronto! A conta foi deletada

---

## ⚙️ FICHEIRO .env

O arquivo `backend\.env` está configurado assim:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/atelie-coroa-de-rosas
JWT_SECRET=sua-chave-secreta-super-segura
NODE_ENV=development
```

**Se usar MongoDB Atlas**, substitua a linha MONGODB_URI por:

```env
MONGODB_URI=mongodb+srv://seu_usuario:sua_senha@seu-cluster.mongodb.net/atelie-coroa-de-rosas
```

---

## 🆘 ERROS COMUNS

### ❌ "Servidor não inicia"
→ Verifique se Node.js está instalado: `node --version`
→ Verifique se npm está instalado: `npm --version`

### ❌ "MongoDB: connection refused"
→ Inicie `mongod` em um novo PowerShell
→ Ou configure MongoDB Atlas

### ❌ "Porta 5000 já está em uso"
→ Altere PORT no `.env` para 5001
→ Acesse em `http://localhost:5001/admin`

### ❌ "Erro ao criar conta"
→ Verifique se o servidor está rodando (`npm run dev`)
→ Recarregue a página no navegador

---

## 📱 FUNCIONALIDADES IMPLEMENTADAS

✅ **Sistema de Aprovação de Contas:**
- Primeira conta é aprovada automaticamente
- Outras contas ficam pendentes
- Admin aprova com sua senha

✅ **Segurança:**
- Senha requerida para aprovar/rejeitar
- Senha requerida para editar/deletar

✅ **Gestão de Admins:**
- Ver contas pendentes
- Ver contas aprovadas
- Aprovar contas (com senha)
- Rejeitar contas (com senha)

---

## 🎯 PRÓXIMOS PASSOS

1. ✅ Inicie o servidor (npm run dev)
2. ✅ Acesse http://localhost:5000/admin
3. ✅ Crie sua primeira conta
4. ✅ Faça login
5. ✅ Comece a usar o painel!

---

**Tudo pronto! Divirta-se com seu novo painel administrativo! 🌹**
