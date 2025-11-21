# 🧪 TESTES DA API - EXEMPLOS COM CURL

Este arquivo contém exemplos de como testar todos os endpoints da API usando curl no PowerShell.

## 1️⃣ AUTENTICAÇÃO

### Criar Nova Conta (Register)
```powershell
$body = @{
    name = "João Silva"
    email = "joao@email.com"
    username = "joaosilva"
    password = "senha123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

### Fazer Login
```powershell
$body = @{
    username = "joaosilva"
    password = "senha123"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body

$token = ($response.Content | ConvertFrom-Json).token
Write-Host "Token: $token"
```

### Validar Token
```powershell
$token = "seu-token-aqui"

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/validate" `
  -Method GET `
  -Headers @{"Authorization" = "Bearer $token"}
```

### Listar Todos os Usuários
```powershell
$token = "seu-token-aqui"

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/list" `
  -Method GET `
  -Headers @{"Authorization" = "Bearer $token"}
```

### Obter Perfil do Usuário Logado
```powershell
$token = "seu-token-aqui"

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/profile" `
  -Method GET `
  -Headers @{"Authorization" = "Bearer $token"}
```

### Atualizar Perfil
```powershell
$token = "seu-token-aqui"

$body = @{
    name = "João Silva Atualizado"
    email = "joao.novo@email.com"
    username = "joaosilva"
    currentPassword = "senha123"
    newPassword = "nova_senha123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/update" `
  -Method PUT `
  -ContentType "application/json" `
  -Headers @{"Authorization" = "Bearer $token"} `
  -Body $body
```

### Aprovar Usuário
```powershell
$token = "seu-token-aqui"
$userId = "id-do-usuario"

$body = @{
    id = $userId
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/approve" `
  -Method POST `
  -ContentType "application/json" `
  -Headers @{"Authorization" = "Bearer $token"} `
  -Body $body
```

### Deletar Usuário
```powershell
$token = "seu-token-aqui"
$userId = "id-do-usuario"

$body = @{
    id = $userId
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/delete" `
  -Method DELETE `
  -ContentType "application/json" `
  -Headers @{"Authorization" = "Bearer $token"} `
  -Body $body
```

---

## 2️⃣ PRODUTOS

### Criar Produto
```powershell
$token = "seu-token-aqui"

$body = @{
    nome = "Terço Cristal"
    categoria = "tercos"
    preco = 45.90
    descricao = "Terço de cristal branco com acabamento dourado"
    imagens = @("https://exemplo.com/img1.jpg", "https://exemplo.com/img2.jpg")
    pedrasAveMaria = "Cristal branco"
    pedrasPaiNosso = "Cristal espelhado"
    detalhesCrucifixo = "Crucifixo dourado"
    divisao = "Divisões douradas"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/products/create" `
  -Method POST `
  -ContentType "application/json" `
  -Headers @{"Authorization" = "Bearer $token"} `
  -Body $body
```

### Listar Todos os Produtos
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/products/list" `
  -Method GET
```

### Obter Produto Específico
```powershell
$productId = "id-do-produto"

Invoke-WebRequest -Uri "http://localhost:5000/api/products/$productId" `
  -Method GET
```

### Atualizar Produto
```powershell
$token = "seu-token-aqui"

$body = @{
    id = "id-do-produto"
    nome = "Terço Cristal Premium"
    categoria = "tercos"
    preco = 55.90
    descricao = "Terço de cristal premium com acabamento dourado"
    imagens = @("https://exemplo.com/img1_novo.jpg")
    pedrasAveMaria = "Cristal branco premium"
    pedrasPaiNosso = "Cristal espelhado premium"
    detalhesCrucifixo = "Crucifixo dourado premium"
    divisao = "Divisões douradas premium"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/products/update" `
  -Method PUT `
  -ContentType "application/json" `
  -Headers @{"Authorization" = "Bearer $token"} `
  -Body $body
```

### Deletar Produto
```powershell
$token = "seu-token-aqui"

$body = @{
    id = "id-do-produto"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/products/delete" `
  -Method DELETE `
  -ContentType "application/json" `
  -Headers @{"Authorization" = "Bearer $token"} `
  -Body $body
```

---

## 3️⃣ CONTATOS

### Obter Dados de Contato
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/contacts/get" `
  -Method GET
```

### Atualizar Dados de Contato
```powershell
$token = "seu-token-aqui"

$body = @{
    whatsapp = "(44) 99166-2198"
    instagramLoja = "@atelie.coroaderosas"
    instagramPessoal = "@luanafborborema"
    email = "contato@atelie.com"
    endereco = "Rua das Flores, 123 - Cidade, Estado"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/contacts/update" `
  -Method PUT `
  -ContentType "application/json" `
  -Headers @{"Authorization" = "Bearer $token"} `
  -Body $body
```

---

## 🔐 COMO OBTER E USAR O TOKEN

### 1. Fazer Login para Obter o Token
```powershell
$loginBody = @{
    username = "seu-usuario"
    password = "sua-senha"
} | ConvertTo-Json

$loginResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body $loginBody

$token = ($loginResponse.Content | ConvertFrom-Json).token
Write-Host "Token obtido: $token"
```

### 2. Usar o Token em Requisições Protegidas
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

Invoke-WebRequest -Uri "http://localhost:5000/api/auth/profile" `
  -Method GET `
  -Headers $headers
```

---

## 📝 TESTE COMPLETO DO FLUXO

Copie e execute este script completo no PowerShell:

```powershell
# 1. Criar conta
Write-Host "1. Criando nova conta..." -ForegroundColor Green
$registerBody = @{
    name = "Teste Admin"
    email = "teste@email.com"
    username = "testeadmin"
    password = "senha123"
} | ConvertTo-Json

$registerResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" `
  -Method POST `
  -ContentType "application/json" `
  -Body $registerBody

Write-Host ($registerResponse.Content | ConvertFrom-Json).message

# 2. Fazer login
Write-Host "`n2. Fazendo login..." -ForegroundColor Green
$loginBody = @{
    username = "testeadmin"
    password = "senha123"
} | ConvertTo-Json

$loginResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body $loginBody -ErrorAction SilentlyContinue

if ($loginResponse.StatusCode -eq 200) {
    $token = ($loginResponse.Content | ConvertFrom-Json).token
    Write-Host "Login bem-sucedido!"
    Write-Host "Token: $token"
} else {
    Write-Host "Erro: Conta ainda não foi aprovada" -ForegroundColor Red
    Write-Host "Aprovar manualmente no MongoDB Compass"
    exit
}

# 3. Listar produtos
Write-Host "`n3. Listando produtos..." -ForegroundColor Green
$productsResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/products/list" `
  -Method GET

$products = $productsResponse.Content | ConvertFrom-Json
Write-Host "Total de produtos: $($products.Count)"

# 4. Criar produto
Write-Host "`n4. Criando novo produto..." -ForegroundColor Green
$productBody = @{
    nome = "Terço Teste"
    categoria = "tercos"
    preco = 29.90
    descricao = "Produto de teste"
    imagens = @("https://exemplo.com/img.jpg")
} | ConvertTo-Json

$productResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/products/create" `
  -Method POST `
  -ContentType "application/json" `
  -Headers @{"Authorization" = "Bearer $token"} `
  -Body $productBody

Write-Host "Produto criado com ID: $(($productResponse.Content | ConvertFrom-Json).produto._id)"

# 5. Obter dados de contato
Write-Host "`n5. Obtendo dados de contato..." -ForegroundColor Green
$contactResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/contacts/get" `
  -Method GET

Write-Host ($contactResponse.Content | ConvertFrom-Json) | ConvertTo-Json

Write-Host "`n✅ Teste completo realizado com sucesso!" -ForegroundColor Green
```

---

## 🛠️ DICAS ÚTEIS

### Converter resposta JSON
```powershell
$response = Invoke-WebRequest -Uri "..." -Method GET
$data = $response.Content | ConvertFrom-Json
Write-Host $data.campo
```

### Ver todos os detalhes da resposta
```powershell
$response = Invoke-WebRequest -Uri "..." -Method GET
Write-Host $response | ConvertTo-Json -Depth 10
```

### Salvar resposta em arquivo
```powershell
$response = Invoke-WebRequest -Uri "..." -Method GET
$response.Content | Out-File "resultado.json"
```

### Fazer requisição com timeout
```powershell
Invoke-WebRequest -Uri "..." -Method GET -TimeoutSec 30
```

---

## 🔍 STATUS CODES

- `200` - OK (Sucesso)
- `201` - Created (Criado com sucesso)
- `400` - Bad Request (Dados inválidos)
- `401` - Unauthorized (Token inválido/faltando)
- `404` - Not Found (Recurso não encontrado)
- `500` - Server Error (Erro do servidor)

---

## 📚 REFERÊNCIAS

- [Documentação Express.js](https://expressjs.com/)
- [Documentação MongoDB](https://docs.mongodb.com/)
- [Documentação JWT](https://jwt.io/)
- [Documentação bcryptjs](https://www.npmjs.com/package/bcryptjs)

---

Bom teste! 🧪
