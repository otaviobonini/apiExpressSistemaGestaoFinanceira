# Finance API

API RESTful para gerenciamento de finanças pessoais, permitindo controle de usuários, transações, categorias e metas financeiras.

## Sobre o projeto

Esta API foi desenvolvida com foco em boas práticas de arquitetura backend, incluindo:

* Separação de responsabilidades (Controller → Service → Database)
* Validação robusta com Zod
* Autenticação segura com JWT
* Persistência com Prisma ORM

## Tecnologias utilizadas

* Node.js (v18+)
* Express
* Prisma ORM
* PostgreSQL
* JWT (JSON Web Token)
* bcrypt
* Zod

## Configuração do ambiente

### 1. Clone o repositório

```bash
git clone https://github.com/otaviobonini/apiExpressSistemaGestaoFinanceira.git
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/finance_db"
JWT_SECRET="sua_chave_secreta"
PORT=3333
```

### 4. Execute as migrations

```bash
npx prisma migrate deploy
```

### 5. Inicie o servidor

```bash
npm run dev
```

Servidor disponível em:

```
http://localhost:3333
```

## Autenticação

A API utiliza JWT.

Após login, utilize o token no header:

```
Authorization: Bearer <token>
```

## Endpoints

### Auth

| Método | Rota           | Descrição |
| ------ | -------------- | --------- |
| POST   | /auth/register | Cadastro  |
| POST   | /auth/login    | Login     |

### Categorias (protegido)

| Método | Rota            | Descrição         |
| ------ | --------------- | ----------------- |
| GET    | /categories     | Listar categorias |
| POST   | /categories     | Criar categoria   |
| DELETE | /categories/:id | Deletar categoria |

### Transações (protegido)

| Método | Rota              | Descrição         |
| ------ | ----------------- | ----------------- |
| GET    | /transactions     | Listar transações |
| POST   | /transactions     | Criar transação   |
| DELETE | /transactions/:id | Deletar transação |

Tipos:

* entrada
* saida

### Metas (protegido)

| Método | Rota                    | Descrição       |
| ------ | ----------------------- | --------------- |
| GET    | /metas                  | Listar metas    |
| POST   | /metas                  | Criar meta      |
| DELETE | /metas/:id              | Deletar meta    |
| PATCH  | /metas/add-value/:id    | Adicionar valor |
| PATCH  | /metas/remove-value/:id | Remover valor   |

## Exemplos de uso

### Criar usuário

```bash
curl -X POST http://localhost:3333/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"João","email":"joao@email.com","password":"123456"}'
```

### Login

```bash
curl -X POST http://localhost:3333/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"joao@email.com","password":"123456"}'
```

### Criar categoria

```bash
curl -X POST http://localhost:3333/categories \
-H "Authorization: Bearer SEU_TOKEN" \
-H "Content-Type: application/json" \
-d '{"nome":"Alimentação","orcamento":500}'
```

### Criar transação

```bash
curl -X POST http://localhost:3333/transactions \
-H "Authorization: Bearer SEU_TOKEN" \
-H "Content-Type: application/json" \
-d '{"valor":75,"tipo":"saida","categoriaNome":"Alimentação","descricao":"Almoço"}'
```

## Scripts

```bash
npm run dev    # Desenvolvimento (nodemon)
npm start      # Produção
```

## Melhorias futuras

* Paginação nas listagens
* Documentação com Swagger (OpenAPI)
* Testes automatizados (Jest)

