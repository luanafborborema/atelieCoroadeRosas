# 🌹 ATELIÊ COROA DE ROSAS - INICIALIZAÇÃO VISUAL

## ⏱️ TEMPO TOTAL: ~5 minutos

---

## 📌 PRÉ-REQUISITOS

Você precisa ter instalado:
- ✅ Node.js (www.nodejs.org)
- ✅ MongoDB (www.mongodb.com/try/download/community) OU MongoDB Atlas

Se não tiver, baixe agora antes de continuar!

---

## 🎬 COMEÇANDO

### PASSO 1️⃣: Abrir PowerShell

**Clique aqui:** C:\Users\Cliente\Documents\atelieCoroadeRosas-main

Clique com botão direito no espaço vazio → "Abrir PowerShell aqui (Administrador)"

Ou pressione: `Win + R`, digitee `powershell`, e pressione Enter

```powershell
# Você verá algo assim:
PS C:\Users\Cliente\Documents\atelieCoroadeRosas-main>
```

---

### PASSO 2️⃣: Instalar Dependências

Execute (apenas na primeira vez):

```powershell
cd backend
npm install
cd ..
```

⏳ Isso vai levar alguns minutos...

Quando terminar, você verá:
```
added XXX packages in XX.XXs
```

---

### PASSO 3️⃣: Iniciar MongoDB

**OPÇÃO A: MongoDB Local (Instalado no computador)**

Abra UM NOVO PowerShell e execute:

```powershell
mongod
```

Você verá:
```
[initandlisten] waiting for connections on port 27017
```

✅ Deixe rodando

**OPÇÃO B: MongoDB Atlas (Online)**

- Se usa MongoDB Atlas, pule para o próximo passo
- MongoDB Atlas já está conectado

---

### PASSO 4️⃣: Iniciar o Servidor

No PowerShell original (não feche!):

```powershell
cd backend
npm run dev
```

Você verá:
```
MongoDB conectado com sucesso!
Servidor rodando na porta 5000
```

✅ **DEIXE ESTE TERMINAL ABERTO!**

---

### PASSO 5️⃣: Abrir no Navegador

Abra seu navegador favorito e vá para:

```
http://localhost:5000/admin
```

Você verá a tela de login rosada! 🌹

---

## 🎯 PRIMEIRA CONTA

### Clique em "Crie uma agora"

Preencha com seus dados:

| Campo | Exemplo |
|-------|---------|
| Nome Completo | Seu Nome |
| E-mail | seu@email.com |
| Usuário | seu_usuario |
| Senha | SenhaForte123 |
| Confirmar Senha | SenhaForte123 |

### Clique em "Criar Conta"

Você verá:
```
✅ Primeira conta criada e aprovada automaticamente!
```

### Agora Clique em "Voltar para login"

Faça login com seus dados:

| Campo | Dados |
|-------|-------|
| Usuário | seu_usuario |
| Senha | SenhaForte123 |

### Clique em "Entrar"

🎉 **Pronto! Você está no painel administrativo!**

---

## 👥 ADICIONAR OUTROS ADMINS

### Como Novo Admin Requer Conta

1. Pessoa abre: http://localhost:5000/admin
2. Clica em "Crie uma agora"
3. Preenche dados
4. Clica em "Criar Conta"
5. Vê mensagem: "Aguarde aprovação de um administrador"

### Como Você Aprova

1. Você faz login no painel
2. Va para: **"Gestão de Admins"**
3. Clica na aba: **"Contas Pendentes"**
4. Clica no botão: **"Aceitar novo Admin"**
5. Digita sua senha quando pedir
6. Clica OK

✅ **Pronto! Conta aprovada!**

---

## 🗑️ COMO REJEITAR CONTA

Mesmos passos, mas clique em **"Recusar/Excluir"** em vez de "Aceitar"

Você precisará digitar sua senha para confirmar.

---

## 📊 USAR O PAINEL

Agora você tem acesso a:

### 📦 Produtos
- Criar novo produto
- Editar existente
- Deletar produto
- Adicionar múltiplas imagens

### 📱 Dados de Contato
- WhatsApp
- Instagram (Loja)
- Instagram (Pessoal)
- E-mail
- Endereço

### 👥 Gestão de Admins
- Ver contas pendentes
- Aprovar com sua senha
- Ver contas aprovadas
- Deletar com sua senha

### 👤 Minha Conta
- Editar nome, e-mail, usuário
- Alterar senha

---

## ⚠️ SE DER ERRO

### ❌ "Servidor não inicia"

Verifique se tem Node.js:
```powershell
node --version
```

Deve mostrar: `v14.x.x` ou maior

### ❌ "MongoDB: connection refused"

Inicie MongoDB:
```powershell
mongod
```

Em um novo PowerShell!

### ❌ "Porta 5000 já está em uso"

Abra `backend\.env` e altere:
```env
PORT=5001
```

Acesse: http://localhost:5001/admin

### ❌ "Não consigo criar conta"

- Verifique se servidor está rodando
- Recarregue a página (Ctrl + R)
- Tente novamente

---

## 🎓 DICAS

1. **Deixe os 2 terminais abertos:**
   - Terminal 1: MongoDB (`mongod`)
   - Terminal 2: Backend (`npm run dev`)

2. **Primeira conta é especial:**
   - Não precisa aprovação
   - Faça login imediatamente
   - Pode adicionar outros admins

3. **Sempre use senha forte:**
   - Misture maiúsculas, minúsculas, números
   - Mínimo 8 caracteres

4. **Backup dos dados:**
   - MongoDB local: pasta `data/db`
   - MongoDB Atlas: backup automático

---

## 🌐 PRÓXIMAS ETAPAS (Deploy)

Para colocar online (Heroku, Render, etc):

1. Crie conta em Render.com ou Heroku
2. Conecte seu repositório Git
3. Configure variáveis (PORT, MONGODB_URI, JWT_SECRET)
4. Deploy!

---

## 📞 SUPORTE

Se algo não funcionar:

1. Verifique se MongoDB está rodando
2. Recarregue a página
3. Feche e reabra o terminal
4. Verifique o arquivo `.env`
5. Copie a mensagem de erro e pesquise

---

**🌹 Bem-vindo ao Ateliê Coroa de Rosas! 🌹**

Seu painel administrativo está pronto para uso!
