# ⚡ RESOLVER ERRO EM 3 PASSOS

## ❌ Você está vendo este erro:
```
Failed to load resource: net::ERR_CONNECTION_REFUSED
localhost:5000/api/auth/register
```

## ✅ SOLUÇÃO RÁPIDA

### PASSO 1: Clique 2 vezes em INICIAR_MONGODB.bat

Arquivo localizado em:
```
C:\Users\Cliente\Documents\atelieCoroadeRosas-main\INICIAR_MONGODB.bat
```

Você verá algo como:
```
waiting for connections on port 27017
```

✅ **DEIXE ABERTO** - Não feche esta janela!

---

### PASSO 2: Clique 2 vezes em INICIAR_SERVIDOR.bat

Arquivo localizado em:
```
C:\Users\Cliente\Documents\atelieCoroadeRosas-main\INICIAR_SERVIDOR.bat
```

Você verá algo como:
```
MongoDB conectado com sucesso!
Servidor rodando na porta 5000
```

✅ **DEIXE ABERTO** - Não feche esta janela!

---

### PASSO 3: Recarregue a página

No navegador, vá para:
```
http://localhost:5000/admin
```

Pressione: `Ctrl + R` ou `F5`

🎉 **PRONTO! Erro resolvido!**

---

## 📌 IMPORTANTE

- ✅ As 2 janelas devem estar **SEMPRE ABERTAS** enquanto usar o sistema
- ✅ Se fechar alguma, o erro volta
- ✅ Se der erro, deixe as janelas abertas e tente novamente

---

## 🆘 SE AINDA DER ERRO

### Cenário 1: "MongoDB não foi encontrado"
→ Instale MongoDB: https://www.mongodb.com/try/download/community

### Cenário 2: "Port 5000 already in use"
→ Feche outras abas com localhost:5000 aberto
→ Ou altere PORT no arquivo `backend\.env`

### Cenário 3: Continua erro de conexão
→ Feche tudo
→ Execute novamente os 2 scripts
→ Recarregue a página

---

**Pronto! Agora deveria funcionar! 🌹**
