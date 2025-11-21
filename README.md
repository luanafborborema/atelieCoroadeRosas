# Ateliê Coroa de Rosas - Sistema Administrativo

## Visão Geral

Sistema administrativo completo para gerenciar produtos, contatos e usuários administrativos do Ateliê Coroa de Rosas.

## Estrutura do Projeto

```
atelieCoroadeRosas/
├── frontend/
│   ├── admin.html
│   ├── admin.css
│   ├── admin.js
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── imagens/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── contactRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
└── README.md
```

## Requisitos

- Node.js (v14+)
- MongoDB (v4.4+)
- npm ou yarn

## Instalação

### 1. Clone ou extraia o projeto

```bash
cd atelieCoroadeRosas/backend
```

### 2. Instale as dependências do backend

```bash
npm install
```

### 3. Configure o MongoDB

Certifique-se de que o MongoDB está rodando:

```bash
# No Windows
mongod

# No Linux/Mac
brew services start mongodb-community
```

### 4. Configure as variáveis de ambiente

Edite o arquivo `.env` na pasta backend:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/atelie-coroa-de-rosas
JWT_SECRET=sua-chave-secreta-super-segura
NODE_ENV=development
```

### 5. Inicie o servidor

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:5000`

## Como Usar

### Acessar o Painel Administrativo

1. Navegue até `http://localhost:5000/admin`
2. Você verá a tela de login

### Criar a Primeira Conta de Administrador

1. Clique em "Crie uma agora" na página de login
2. Preencha os dados:
   - Nome Completo
   - E-mail
   - Usuário
   - Senha
3. A conta será criada com status "pendente"

**Importante**: A primeira conta criada deve ser aprovada manualmente no banco de dados:

```bash
# Acesse o MongoDB
mongosh
use atelie-coroa-de-rosas
db.users.updateOne({username: "seu-usuario"}, {$set: {status: "approved"}})
```

Ou use MongoDB Compass para atualizar o status para "approved".

Após isso, você poderá fazer login e acessar o painel completo.

### Funcionalidades do Painel

#### Dashboard
- Visão geral com contagem de produtos e administradores

#### Produtos
- Criar novo produto
- Listar todos os produtos
- Editar produto existente
- Deletar produto
- Adicionar múltiplas imagens (URLs)
- Adicionar detalhes específicos (contas, crucifixo, divisões)

#### Dados de Contato
- Editar WhatsApp
- Editar Instagram (Loja e Pessoal)
- Editar E-mail
- Editar Endereço

#### Gestão de Administradores
- Visualizar contas pendentes
- Aprovar contas pendentes
- Visualizar contas aprovadas
- Deletar contas aprovadas (exceto a sua)

#### Minha Conta
- Editar nome, e-mail e usuário
- Alterar senha (requer senha atual)

## Endpoints da API

### Autenticação

- `POST /api/auth/register` - Criar nova conta
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/validate` - Validar token JWT
- `GET /api/auth/list` - Listar todos os usuários (requer autenticação)
- `GET /api/auth/profile` - Obter perfil do usuário logado (requer autenticação)
- `PUT /api/auth/update` - Atualizar perfil (requer autenticação)
- `POST /api/auth/approve` - Aprovar usuário (requer autenticação)
- `POST /api/auth/reject` - Rejeitar usuário (requer autenticação)
- `DELETE /api/auth/delete` - Deletar usuário (requer autenticação)

### Produtos

- `POST /api/products/create` - Criar produto (requer autenticação)
- `GET /api/products/list` - Listar todos os produtos
- `GET /api/products/:id` - Obter detalhes do produto
- `PUT /api/products/update` - Atualizar produto (requer autenticação)
- `DELETE /api/products/delete` - Deletar produto (requer autenticação)

### Contatos

- `GET /api/contacts/get` - Obter dados de contato
- `PUT /api/contacts/update` - Atualizar dados de contato (requer autenticação)

## Modelo de Dados

### User
```javascript
{
  name: String,
  email: String (único),
  username: String (único),
  password: String (criptografada),
  status: 'pending' ou 'approved',
  dataCriacao: Date
}
```

### Product
```javascript
{
  nome: String,
  categoria: 'tercos', 'chaveiros' ou 'pulseiras',
  descricao: String,
  preco: Number,
  imagens: [String],
  pedrasAveMaria: String,
  pedrasPaiNosso: String,
  detalhesCrucifixo: String,
  divisao: String,
  visualizacoes: Number,
  dataCriacao: Date
}
```

### Contact
```javascript
{
  whatsapp: String,
  instagramLoja: String,
  instagramPessoal: String,
  email: String,
  endereco: String,
  dataAtualizacao: Date
}
```

## Segurança

- Senhas são criptografadas com bcryptjs
- Autenticação via JWT (JSON Web Tokens)
- Token expira em 7 dias
- Todos os endpoints protegidos requerem token válido
- CORS habilitado para requisições seguras

## Deploy

### Para Heroku/Render:

1. Crie uma conta no MongoDB Atlas e obtenha a string de conexão
2. Atualize `.env`:
   ```env
   MONGODB_URI=mongodb+srv://usuario:senha@seu-cluster.mongodb.net/atelie-coroa-de-rosas
   JWT_SECRET=chave-secreta-muito-segura
   ```

3. Faça deploy:
   ```bash
   git push heroku main
   ```

## Solução de Problemas

### Erro: "Cannot find module 'express'"
```bash
npm install
```

### Erro: "MongoDB connection refused"
Verifique se o MongoDB está rodando e se a string de conexão está correta no `.env`

### Erro: "CORS policy"
CORS já está configurado no backend. Se ainda tiver problemas, verifique a URL do frontend.

### Erro: "Token inválido"
Faça login novamente para obter um novo token.

## Licença

MIT

## Autor

Desenvolvido para Ateliê Coroa de Rosas
