# Product API Test

## Objetivo

Esta API foi desenvolvida para testar a competência em estruturar projetos backend de pequeno porte, focando na clareza do código e na implementação de funcionalidades essenciais para o gerenciamento de produtos.

## Funcionalidades

A API expõe os seguintes endpoints REST para gerenciar produtos:

| Método | Rota             | Descrição                                |
|--------|------------------|-----------------------------------------|
| POST   | `/products`      | Cadastrar um novo produto                |
| GET    | `/products`      | Listar todos os produtos ordenados pelo nome |
| GET    | `/products/:id`  | Obter detalhes de um produto específico  |
| PUT    | `/products/:id`  | Atualizar dados de um produto            |
| DELETE | `/products/:id`  | Remover um produto                       |

## Regras e Validações

- Cada produto possui os campos: **nome**, **preço** e **SKU**.
- O nome não pode ser vazio.
- O preço deve ser um número positivo.
- O SKU deve ser único.
- Em qualquer retorno via GET, cada produto conterá também a **primeira letra do alfabeto ausente no nome do produto**, considerando somente as letras de `a-z`.
- Caso todas as letras estejam presentes, será retornado o caractere `_`.

## Tecnologias Utilizadas

- Node.js
- NestJS
- TypeORM
- MySQL (banco de dados para desenvolvimento)
- SQLite (banco de dados para testes)
- Class Validator (para validação dos dados)
- Swagger (para documentação da API)

## Configuração do Ambiente (.env)  
Para rodar a aplicação, você precisa criar um arquivo chamado `.env` na raiz do projeto contendo as variáveis de ambiente necessárias para a conexão com o banco de dados e outras configurações.

### Exemplo básico do arquivo `.env` para desenvolvimento com MySQL:  

```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco
```

## Como Rodar o Projeto  

1. Clone este repositório:  
    ```bash
    git clone https://github.com/larissa-pinheiro/product-api-test.git
    ```

2. Instale as dependências:  
    ```bash
    npm install
    ```

3. Execute a aplicação:  
    ```bash
    npm run start:dev
    ```

4. Acesse a documentação da API (Swagger) no endereço:

    ```
    http://localhost:3000/swagger
    ```

## Testes  
Este projeto incluir testes end-to-end (e2e) que valida o funcionamento completo do CRUD, incluindo:

- Criação de produto
- Validação de SKU duplicado
- Listagem de produtos ordenada
- Busca por ID
- Atualização
- Remoção

### Ferramentas para testes:  

- **Jest**: framework para execução de testes e asserções.
- **Supertest**: biblioteca para facilitar os testes das rotas HTTP da API.

### Como rodar os testes  

- Para executar os testes end-to-end (e2e):

```bash
npm run test:e2e
```

## Contato

Para dúvidas ou sugestões, entre em contato com:

**Larissa Pinheiro** — [Linkedin](https://www.linkedin.com/in/larissa-mpinheiro/)
