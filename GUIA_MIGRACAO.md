# 🛠️ Guia de Migração de Produtos

Você tem **3 opções** para resolver o problema dos produtos. Escolha a mais fácil para você:

---

## ✅ **OPÇÃO 1: Usar seu Banco de Dados Existente (RECOMENDADO)**

Se você já tem um MongoDB rodando com seus produtos do site anterior:

### Passo 1: Forneça as Credenciais
Você precisa enviar:
```
- URL de conexão MongoDB (MONGODB_URI)
- Nome do banco de dados anterior
- Nome da coleção de produtos (provavelmente "products")
```

### Passo 2: Executar Script de Sincronização
```bash
cd backend
node scripts/sincronizarBD.js
```

**Vantagens:**
- ✅ Mantém seus dados existentes
- ✅ Não perde histórico de visualizações
- ✅ Conserva IDs já vinculados
- ✅ Rápido e seguro

---

## 📦 **OPÇÃO 2: Criar Novo Banco de Dados (ALTERNATIVA)**

Se preferir começar do zero com um novo banco:

### Passo 1: Criar Nova Instância MongoDB Atlas (Gratuita)
1. Acesse: https://www.mongodb.com/cloud/atlas
2. Crie uma conta (é grátis)
3. Crie um novo projeto e cluster
4. Obtenha a string de conexão

### Passo 2: Atualizar .env
Edite `backend/.env`:
```
MONGODB_URI=sua_nova_string_de_conexao_aqui
```

### Passo 3: Importar Produtos Padrão
```bash
cd backend
node scripts/sincronizarBD.js
```

**Vantagens:**
- ✅ Começa limpo e organizado
- ✅ Sem dados legados
- ✅ Novo sistema de scratch

---

## 🚀 **OPÇÃO 3: Copiar Dados Entre Bancos**

Se quiser migrar dados de um MongoDB para outro:

### Passo 1: Exportar do Banco Antigo
```bash
mongoexport --uri "mongodb://user:pass@seu-servidor.mongodb.net/seu_banco_antigo" \
  --collection products \
  --out produtos.json
```

### Passo 2: Importar no Novo Banco
```bash
mongoimport --uri "sua_nova_conexao_mongodb" \
  --collection products \
  --file produtos.json \
  --jsonArray
```

---

## ⚡ **AÇÃO RECOMENDADA:**

1. **Envie-me os seguintes dados:**
   - String de conexão do seu MongoDB anterior (MONGODB_URI antigo)
   - Nome do banco de dados anterior
   - Nome da coleção de produtos

2. **Ou escolha criar novo:**
   - Abra https://www.mongodb.com/cloud/atlas
   - Crie uma conta
   - Copie a string de conexão
   - Cole no `.env`

3. **Depois execute:**
   ```bash
   node backend/scripts/sincronizarBD.js
   ```

---

## 📝 **Arquivo .env Atual**

Seu arquivo `backend/.env` provavelmente está assim:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/atelie_db
JWT_SECRET=sua-chave-secreta-super-segura
```

Se quer usar banco antigo, altere `MONGODB_URI` para sua string anterior.

---

## ✨ **Próximos Passos**

Após escolher uma opção:
1. Execute o script de sincronização
2. Acesse o painel admin
3. Crie sua conta (será aprovada automaticamente)
4. Edite os produtos conforme necessário
5. Atualize dados de contato

**Qual opção você prefere?**
