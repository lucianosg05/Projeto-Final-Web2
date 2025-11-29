# 📊 Sistema de Gerenciamento - Frontend React

Frontend completo desenvolvido em React para o sistema de gerenciamento integrado com Node.js + MySQL.

## 🎯 Características Principais

✅ **Autenticação e Autorização**
- Registro e login de usuários
- Controle de acesso com roles (admin/user)
- Proteção de rotas privadas

✅ **Dashboard Inteligente**
- Estatísticas em tempo real
- Resumo de alunos, cursos e produtos
- Acesso rápido a funcionalidades principais

✅ **Módulo de Alunos (CRUD)**
- Listagem com busca por nome/email
- Criar, editar e excluir alunos
- Associação com cursos
- Visualização de data de inscrição

✅ **Módulo de Cursos (CRUD)**
- Gerenciamento completo de cursos
- Descrições detalhadas
- Visualização de alunos por curso
- Busca e filtros

✅ **Módulo de Produtos (CRUD)**
- Catálogo de produtos com preços
- Categorização de produtos
- Visualização em grid responsivo
- Busca e filtro por categoria

✅ **Módulo de Usuários (CRUD)**
- Gerenciamento de usuários do sistema
- Atribuição de roles (admin/user)
- Criar, editar e deletar usuários
- Busca avançada

✅ **Design Responsivo**
- Desktop, tablet e smartphone
- Layout fluid e adaptativo
- Componentes mobile-first

✅ **UX/UI Moderno**
- Cores coerentes e profissionais
- Tipografia clara e legível
- Ícones intuitivos
- Espaçamentos adequados
- Animações suaves

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.js          # Cabeçalho com info do usuário
│   │   ├── Footer.js          # Rodapé
│   │   ├── Navbar.js          # Navegação principal
│   │   ├── PrivateRoute.js    # Proteção de rotas
│   │   └── Spinner.js         # Componente de carregamento
│   ├── pages/
│   │   ├── Login.js           # Login e registro
│   │   ├── Dashboard.js       # Painel principal
│   │   ├── Students/
│   │   │   ├── StudentsList.js
│   │   │   └── StudentForm.js
│   │   ├── Courses/
│   │   │   ├── CoursesList.js
│   │   │   └── CourseForm.js
│   │   ├── Products/
│   │   │   ├── ProductsList.js
│   │   │   └── ProductForm.js
│   │   └── Users/
│   │       └── ListUsers.js
│   ├── api.js                 # Configuração do Axios
│   ├── App.js                 # Rotas principais
│   ├── index.js               # Entrada da app
│   └── styles.css             # Estilos globais
├── public/
│   └── index.html
├── package.json
└── README.md
```

## 🛠️ Tecnologias Utilizadas

- **React 18.2.0** - Biblioteca UI
- **React Router DOM 6.14.1** - Roteamento
- **Axios 1.4.0** - HTTP Client
- **CSS3** - Estilos responsivos

## 📦 Instalação

### Pré-requisitos
- Node.js (v14 ou superior)
- npm ou yarn

### Passos

1. **Navegue até o diretório frontend**
```bash
cd frontend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm start
```

A aplicação abrirá em `http://localhost:3000`

## 🔐 Autenticação

### Primeiro Acesso
1. Clique em "📝 Criar uma conta"
2. Preencha os dados (nome, email, senha)
3. Clique em "✅ Criar Conta"

### Login
1. Insira email e senha
2. Clique em "🔓 Entrar"

**Nota:** Certifique-se de que o backend está rodando em `http://localhost:4000`

## 📱 Responsividade

A aplicação é totalmente responsiva e se adapta a:
- 📺 Desktops (≥1024px)
- 📱 Tablets (768px - 1023px)
- 📲 Smartphones (< 768px)

## 🎨 Design System

### Cores
- **Primária:** #2563eb (Azul)
- **Secundária:** #f59e0b (Âmbar)
- **Sucesso:** #16a34a (Verde)
- **Perigo:** #dc2626 (Vermelho)

### Tipografia
- **Font:** Sistema padrão do SO (-apple-system, Segoe UI, etc)
- **Tamanhos:** Variável conforme contexto

### Componentes
- Cards com sombra elegante
- Tabelas com header gradiente
- Botões com estados interativos
- Alerts coloridos por tipo
- Loading spinner animado

## 🚀 Features por Módulo

### Login/Registro
- ✅ Validação de email
- ✅ Validação de senha (mín. 6 caracteres)
- ✅ Feedback visual de erros
- ✅ Toggle entre login/registro

### Dashboard
- 📊 Contadores em tempo real
- 🔗 Links rápidos para CRUD
- 👤 Informações do usuário
- 📈 Estatísticas resumidas

### Alunos
- 🔍 Busca em tempo real
- 📋 Tabela com todas as informações
- ➕ Criar novo aluno
- ✏️ Editar aluno
- 🗑️ Deletar aluno
- 🎓 Associação com cursos

### Cursos
- 📚 Listagem completa
- 🔍 Busca por título/descrição
- 📝 Descrição detalhada
- 👨‍🎓 Contador de alunos
- ➕ Criar curso
- ✏️ Editar curso
- 🗑️ Deletar curso

### Produtos
- 🛍️ Catálogo em grid
- 🏷️ Filtro por categoria
- 💰 Preços destacados
- 🔍 Busca por nome/descrição
- ➕ Criar produto
- ✏️ Editar produto
- 🗑️ Deletar produto

### Usuários
- 👥 Gerenciamento completo
- 👑 Atribuição de roles
- 🔐 Gestão de senhas
- ➕ Criar usuário
- ✏️ Editar usuário
- 🗑️ Deletar usuário
- 🔍 Filtro por perfil

## 🔗 Integração com Backend

A aplicação se conecta ao backend através da API REST:

```
Base URL: http://localhost:4000/api
```

### Endpoints Utilizados

**Auth**
- `POST /auth/register` - Criar conta
- `POST /auth/login` - Fazer login
- `POST /auth/logout` - Fazer logout
- `GET /auth/me` - Obter usuário atual

**Alunos**
- `GET /students` - Listar alunos
- `GET /students/:id` - Obter aluno
- `POST /students` - Criar aluno
- `PUT /students/:id` - Atualizar aluno
- `DELETE /students/:id` - Deletar aluno

**Cursos**
- `GET /courses` - Listar cursos
- `GET /courses/:id` - Obter curso
- `POST /courses` - Criar curso
- `PUT /courses/:id` - Atualizar curso
- `DELETE /courses/:id` - Deletar curso

**Produtos**
- `GET /products` - Listar produtos
- `GET /products/:id` - Obter produto
- `POST /products` - Criar produto
- `PUT /products/:id` - Atualizar produto
- `DELETE /products/:id` - Deletar produto

**Usuários**
- `GET /users` - Listar usuários
- `GET /users/:id` - Obter usuário
- `POST /users` - Criar usuário (requer auth)
- `PUT /users/:id` - Atualizar usuário (requer auth)
- `DELETE /users/:id` - Deletar usuário (requer auth)

## ⚙️ Configuração

### Alterar URL da API

Edite `src/api.js`:

```javascript
const api = axios.create({
  baseURL: 'http://seu-backend:porta/api',
  withCredentials: true
});
```

## 🐛 Resolução de Problemas

### "Erro de conexão com o backend"
- Verifique se o backend está rodando em `http://localhost:4000`
- Verifique a configuração de CORS no backend

### "Erro ao fazer login"
- Certifique-se de que o usuário existe no banco de dados
- Verifique as credenciais

### "Página em branco após login"
- Abra o DevTools (F12) para verificar erros
- Limpe o cache do navegador (Ctrl+Shift+Delete)

## 📝 Licença

Projeto educacional - 2025

## 👨‍💻 Desenvolvedor

Sistema completo desenvolvido com React, Node.js e MySQL.

---

**Dicas:**
- Use emojis para melhor visualização
- Valide sempre os dados no frontend e backend
- Mantenha o backend rodando para testar
- Use Ctrl+Shift+Delete para limpar cache se tiver problemas
