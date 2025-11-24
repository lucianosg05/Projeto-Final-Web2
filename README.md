# Backend:

Este backend foi desenvolvido utilizando **Node.js**, **Express**, **Sequelize (MySQL)** e arquitetura **MVC**, oferecendo CRUD completo para **Usuários**, **Alunos**, **Cursos** e **Produtos**, além de autenticação com **JWT**.

---

## Resumo do Projeto

O backend implementa:

- Estrutura MVC organizada (models, controllers, routes, middleware)
- CRUD completo para:
  - Usuários
  - Estudantes
  - Cursos
  - Produtos
- Autenticação segura com JWT
- Middleware de proteção de rotas
- Hash de senhas com bcrypt
- Banco de dados MySQL utilizando Sequelize ORM
- Tratamento global de erros

---

## Como Rodar o Backend

### ** Pré-requisitos**
Antes de iniciar, instale:

- **Node.js 16+**
- **MySQL** em execução local
- **npm** ou **yarn**

---

### ** Instalar dependências**

No terminal, dentro da pasta `backend/`:

```bash
npm install
