# 📦 Guia para Importar Produtos

Se você tem um arquivo JSON com seus produtos anteriores, siga estas instruções:

## Opção 1: Importar via Script SQL/MongoDB

Se você tem acesso ao MongoDB anterior, você pode:

1. Exportar os documentos da coleção `products`
2. Importar para o novo MongoDB

**Comando para exportar:**
```bash
mongoexport --db seu_banco_antigo --collection products --out produtos.json
```

**Comando para importar:**
```bash
mongoimport --db atelie_db --collection products --file produtos.json
```

## Opção 2: Importar via API

Você pode fazer uma requisição POST para cada produto:

```javascript
const produtos = [
  {
    nome: "Terço de Cristal",
    descricao: "Terço confeccionado com cristal de vidro",
    categoria: "tercos",
    preco: 45.00,
    imagens: ["url-da-imagem-1", "url-da-imagem-2"],
    pedrasAveMaria: "Cristal de vidro 8mm",
    pedrasPaiNosso: "Cristal de vidro 10mm",
    detalhesCrucifixo: "Crucifixo dourado",
    divisao: "Contas divisoras em ouro"
  }
];

async function importarProdutos() {
  const token = localStorage.getItem('adminToken');
  
  for (const produto of produtos) {
    const response = await fetch('http://localhost:5000/api/products/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(produto)
    });
    console.log(await response.json());
  }
}
```

## Opção 3: Fornecer os produtos

Se você compartilhar o arquivo JSON ou a lista de produtos com o desenvolvedor,
ele pode importar diretamente no banco de dados.

---

**Campos obrigatórios para cada produto:**
- `nome`: Nome do produto
- `descricao`: Descrição do produto
- `categoria`: "tercos", "chaveiros" ou "pulseiras"
- `preco`: Preço em reais (número)
- `imagens`: Array com URLs das imagens

**Campos opcionais:**
- `pedrasAveMaria`: Especificação de contas
- `pedrasPaiNosso`: Especificação de contas
- `detalhesCrucifixo`: Detalhes do crucifixo
- `divisao`: Informação de divisões
