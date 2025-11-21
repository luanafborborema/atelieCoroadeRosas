# ❌ ERROS RESOLVIDOS!

## Erro 1: "Identifier 'API_URL' has already been declared"
✅ **RESOLVIDO** - Removi o código antigo duplicado do HTML

## Erro 2: "Failed to load resource: net::ERR_CONNECTION_REFUSED"
⚠️ **MOTIVO**: O servidor backend NÃO está rodando

---

## 🚀 COMO RESOLVER - PASSO A PASSO

### PASSO 1: Abra PowerShell ou Terminal
```powershell
cd C:\Users\Cliente\Documents\atelieCoroadeRosas-main\backend
```

### PASSO 2: Inicie o MongoDB (em um terminal separado)

**Se tem MongoDB Local instalado:**
```powershell
mongod
```

**Se usa MongoDB Atlas (online):**
- Certifique-se que a URL no `.env` está correta:
```env
MONGODB_URI=mongodb+srv://usuario:senha@seu-cluster.mongodb.net/atelie-coroa-de-rosas
```

### PASSO 3: Instale as dependências (se não fez ainda)
```powershell
npm install
```

### PASSO 4: Inicie o servidor backend
```powershell
npm run dev
```

**Você deve ver:**
```
MongoDB conectado com sucesso!
Servidor rodando na porta 5000
```

### PASSO 5: Teste o painel novamente
Volte para `http://localhost:5000/admin` e recarregue a página

---

## ✅ SE AINDA NÃO FUNCIONAR

### Verifique a porta 5000
```powershell
# Windows
netstat -ano | findstr ":5000"
```

Se houver algo ocupando a porta 5000, altere no `.env`:
```env
PORT=5001
```

E acesse em: `http://localhost:5001/admin`

### Verifique MongoDB
```powershell
# Teste a conexão
mongosh
```

Se der erro, o MongoDB não está rodando. Inicie com `mongod` em outro terminal.

### Verifique o arquivo .env
O arquivo `backend\.env` deve ter:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/atelie-coroa-de-rosas
JWT_SECRET=sua-chave-secreta-super-segura
NODE_ENV=development
```

---

## 📋 CHECKLIST

- [ ] MongoDB está rodando (`mongod` ou MongoDB Atlas conectado)
- [ ] Dependências instaladas (`npm install`)
- [ ] Servidor está rodando (`npm run dev`)
- [ ] Vê a mensagem "Servidor rodando na porta 5000"
- [ ] Arquivo `.env` está configurado corretamente
- [ ] Não há erro de conexão recusada no console do navegador

---

## 🧪 TESTE RÁPIDO

Execute isto no terminal (em nova janela PowerShell):

```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/contacts/get" -Method GET
```

Se funcionar, o servidor está OK!

---

Se ainda tiver problemas, copie a mensagem de erro exato do terminal PowerShell e me envie! 🚀
