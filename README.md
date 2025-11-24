# Projeto-Final-Web2

Este projeto é uma aplicação web completa desenvolvida com **Node.js**, **Express**, **React**, **MySQL** e arquitetura **MVC**, oferecendo um sistema de cadastro e gerenciamento para **Usuários, Alunos, Cursos e Produtos**.  
Implementa autenticação, CRUD completo, rotas protegidas, responsividade e relacionamento entre tabelas.

---

## Participantes do Projeto

- **Alice Santos Monteiro de Barros**
- **Luciano**
- **João**

---

# Descrição Geral

O sistema foi criado como um projeto fullstack completo para atender requisitos acadêmicos, incluindo:

- Backend estruturado em **arquitetura MVC**
- Frontend responsivo feito com **React**
- Banco de dados relacional com **MySQL**
- Autenticação com **JWT** ou possibilidade de sessão
- CRUD completo com relacionamentos e operações com chave estrangeira
- Tratamento de erros, rotas organizadas e código modular

A aplicação permite gerenciar:

- Usuários (com login e senha)
- Alunos
- Cursos (relacionados a alunos)
- Produtos

Com isso, atende aos requisitos de CRUD, autenticação, relacionamentos e consultas avançadas.

---

# Funcionalidades do Sistema

## **Autenticação**
- Login com e-mail e senha
- Senhas criptografadas com **bcrypt**
- Armazenamento do token no **localStorage**
- Rotas protegidas no backend
- Rotas privadas no frontend via `PrivateRoute`

---

## **CRUD de Usuários**
- Criar conta
- Listar usuários
- Atualizar informações
- Excluir usuários
- Exibir usuário logado

---

## **CRUD de Estudantes**
- Cadastro de estudantes
- Listagem completa com nome do curso (JOIN)
- Edição dos dados
- Exclusão com verificação de relacionamento
- Associação via chave estrangeira com a tabela Cursos

---

## **CRUD de Cursos**
- Criar cursos
- Listar todos
- Editar e excluir
- Relacionamento 1:N com Alunos

---

## **CRUD de Produtos**
- Criar produto
- Listar produtos
- Editar produtos
- Excluir produtos
- Consulta por categoria (opcional)

---

# Requisitos Atendidos

| Requisito | Status |
|----------|--------|
| Aplicação Web Completa | ok |
| Arquitetura MVC | ok |
| Frontend Responsivo | ok |
| CRUD (Create, Read, Update, Delete) | ok |
| 3+ entidades com CRUD completo | ok (Users, Students, Courses, Products) |
| Relacionamentos com chave estrangeira | ok (Student → Course) |
| Consultas com JOIN | ok |
| Autenticação | ok (JWT) |
| Criptografia de senha | ok (bcrypt) |
| Banco de Dados Relacional | ok (MySQL) |
| Documentação README | ok |

---

# **Como Rodar o Projeto Completo**

## Clonar o repositório.

git clone https://github.com/lucianosg05/Projeto-Final-Web2
cd Projeto-Final-Web2

### Backend:

- Instalar dependências
No terminal:

cd backend
npm install

- Configurar o arquivo .env
- Criar o banco de dados

- Rodar o servidor backend
Execute:

npm run dev

### Frontend:

- Instalar dependências
  
cd frontend
npm install

- Iniciar o frontend
  
npm start

---

# Conclusão

Este projeto entrega uma aplicação web fullstack completa, responsiva e funcional, com integração total entre backend e frontend.
Atende completamente aos requisitos acadêmicos: MVC, CRUD com relacionamentos, autenticação segura, banco relacional e documentação estruturada.

---

# Tecnologias Utilizadas

### **Backend**
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- Bcrypt
- JWT
- Nodemon

---

### **Frontend**
- React.js
- React Router
- Fetch API
- Componentização
- CSS responsivo

---

### **Outras Tecnologias**
- Git + GitHub
- MVC Pattern
- RESTful Routing

---
