# 🚀 Guia Completo - Frontend React

## 📋 Índice

1. [Instalação e Setup](#instalação-e-setup)
2. [Executar o Projeto](#executar-o-projeto)
3. [Estrutura de Código](#estrutura-de-código)
4. [Componentes](#componentes)
5. [Páginas e Funcionalidades](#páginas-e-funcionalidades)
6. [API Integration](#api-integration)
7. [Styling e Design](#styling-e-design)
8. [Deploy](#deploy)
9. [Troubleshooting](#troubleshooting)

---

## 🔧 Instalação e Setup

### Requisitos
- Node.js v14+ ([Download](https://nodejs.org/))
- npm ou yarn
- Backend rodando em `http://localhost:4000`

### Passos

1. **Clone o repositório** (se não tiver feito)
```bash
cd projeto-final-web2
```

2. **Navegue até o frontend**
```bash
cd frontend
```

3. **Instale as dependências**
```bash
npm install
```

Se preferir usar yarn:
```bash
yarn install
```

---

## 🎯 Executar o Projeto

### Desenvolvimento
```bash
npm start
```

A aplicação abrirá automaticamente em `http://localhost:3000`

### Build para Produção
```bash
npm run build
```

Cria uma pasta `build` otimizada para deploy.

### Testes
```bash
npm test
```

---

## 📁 Estrutura de Código

```
src/
├── api.js                    # Configuração do Axios
├── App.js                    # Componente raiz com rotas
├── index.js                  # Ponto de entrada
├── styles.css                # Estilos globais
├── components/               # Componentes reutilizáveis
│   ├── Header.js            # Cabeçalho
│   ├── Footer.js            # Rodapé
│   ├── Navbar.js            # Navegação
│   ├── PrivateRoute.js      # HOC para rotas protegidas
│   └── Spinner.js           # Indicador de carregamento
└── pages/                    # Páginas (containers)
    ├── Login.js             # Login/Registro
    ├── Dashboard.js         # Painel principal
    ├── Students/
    │   ├── StudentsList.js
    │   └── StudentForm.js
    ├── Courses/
    │   ├── CoursesList.js
    │   └── CourseForm.js
    ├── Products/
    │   ├── ProductsList.js
    │   └── ProductForm.js
    └── Users/
        └── ListUsers.js
```

---

## 🧩 Componentes

### Header.js
**Responsabilidades:**
- Exibir título da aplicação
- Mostrar nome do usuário logado
- Mostrar role/perfil do usuário

**Props:** Nenhuma

**Exemplo:**
```jsx
import Header from './components/Header';
<Header />
```

### Navbar.js
**Responsabilidades:**
- Navegação entre páginas
- Botão de logout

**Props:** Nenhuma

**Exemplo:**
```jsx
import Navbar from './components/Navbar';
<Navbar />
```

### PrivateRoute.js
**Responsabilidades:**
- Verificar autenticação
- Redirecionar para login se não autenticado
- Mostrar loading enquanto verifica

**Props:**
- `children` (ReactNode) - Componente a proteger

**Exemplo:**
```jsx
<PrivateRoute>
  <Dashboard />
</PrivateRoute>
```

### Spinner.js
**Responsabilidades:**
- Mostrar indicador de carregamento

**Props:**
- `message` (string) - Mensagem de carregamento (padrão: "Carregando...")

**Exemplo:**
```jsx
<Spinner message="Carregando dados..." />
```

### Footer.js
**Responsabilidades:**
- Exibir copyright e informações

**Props:** Nenhuma

**Exemplo:**
```jsx
<Footer />
```

---

## 📄 Páginas e Funcionalidades

### 🔐 Login.js
**Funcionalidades:**
- Login com email/senha
- Registro de novo usuário
- Validação de formulário
- Mensagens de erro/sucesso

**Fluxo:**
1. Usuário escolhe entre Login ou Registro
2. Preenche os dados
3. Valida no cliente
4. Envia para backend
5. Redireciona para Dashboard se sucesso

---

### 📊 Dashboard.js
**Funcionalidades:**
- Exibir estatísticas (alunos, cursos, produtos, usuários)
- Links rápidos para CRUD
- Informações do usuário logado

**Dados Carregados:**
- Contagem de alunos
- Contagem de cursos
- Contagem de produtos
- Contagem de usuários
- Informações do usuário

---

### 👨‍🎓 Módulo Students

#### StudentsList.js
**Funcionalidades:**
- Listar todos os alunos
- Buscar por nome/email
- Editar aluno
- Deletar aluno
- Criar novo aluno

**Estados:**
- `students` - Array de alunos
- `loading` - Indicador de carregamento
- `error` - Mensagem de erro
- `success` - Mensagem de sucesso
- `searchTerm` - Termo de busca

#### StudentForm.js
**Funcionalidades:**
- Criar novo aluno
- Editar aluno existente
- Validação de formulário
- Seleção de curso

**Campos:**
- Nome (obrigatório)
- Email (obrigatório, validado)
- Curso (opcional)

---

### 📚 Módulo Courses

#### CoursesList.js
**Funcionalidades:**
- Listar todos os cursos
- Buscar por título/descrição
- Deletar curso
- Criar novo curso
- Editar curso

**Exibições:**
- Título do curso
- Descrição (resumida)
- Contador de alunos
- Ações (editar, deletar)

#### CourseForm.js
**Funcionalidades:**
- Criar novo curso
- Editar curso existente
- Validação de formulário

**Campos:**
- Título (obrigatório, mín. 3 caracteres)
- Descrição (opcional)

---

### 🛍️ Módulo Products

#### ProductsList.js
**Funcionalidades:**
- Listar produtos em grid
- Buscar por nome/descrição
- Filtrar por categoria
- Deletar produto
- Criar novo produto
- Editar produto

**Exibições:**
- Nome do produto
- Preço destacado
- Descrição resumida
- Categoria
- Ações (editar, deletar)

#### ProductForm.js
**Funcionalidades:**
- Criar novo produto
- Editar produto existente
- Validação de formulário
- Seleção de categoria

**Campos:**
- Nome (obrigatório)
- Preço (obrigatório, > 0)
- Descrição (opcional)
- Categoria (opcional)

---

### 👥 Módulo Users

#### ListUsers.js
**Funcionalidades:**
- Listar todos os usuários
- Buscar por nome/email
- Filtrar por role
- Criar novo usuário
- Editar usuário
- Deletar usuário
- Atribuir roles (admin/user)

**Campos de Criação/Edição:**
- Nome (obrigatório)
- Email (obrigatório, validado)
- Senha (obrigatória para novo, opcional para edição)
- Role (admin ou user)

---

## 🌐 API Integration

### Configuração do Axios

Arquivo: `src/api.js`

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true  // Permite envio de cookies
});

export default api;
```

### Como Usar

```javascript
import api from '../api';

// GET
const res = await api.get('/students');

// POST
await api.post('/students', { name: 'João', email: 'joao@email.com' });

// PUT
await api.put(`/students/${id}`, { name: 'João Silva' });

// DELETE
await api.delete(`/students/${id}`);
```

### Tratamento de Erros

```javascript
try {
  const res = await api.post('/auth/login', { email, password });
  console.log('Sucesso:', res.data);
} catch (err) {
  const message = err.response?.data?.message || 'Erro desconhecido';
  console.error(message);
}
```

---

## 🎨 Styling e Design

### Sistema de Cores

Variáveis CSS definidas em `styles.css`:

```css
:root {
  --primary-color: #2563eb;      /* Azul */
  --primary-dark: #1e40af;
  --secondary-color: #f59e0b;    /* Âmbar */
  --danger-color: #dc2626;       /* Vermelho */
  --success-color: #16a34a;      /* Verde */
  --warning-color: #f59e0b;      /* Âmbar */
  --light-bg: #f8fafc;           /* Cinza claro */
  --card-bg: #ffffff;            /* Branco */
  --border-color: #e2e8f0;       /* Cinza bordas */
  --text-dark: #1e293b;          /* Texto escuro */
  --text-light: #64748b;         /* Texto claro */
}
```

### Classes Principais

#### Cards
```html
<div class="card">
  <h2>Título</h2>
  <p>Conteúdo</p>
</div>
```

#### Botões
```html
<button class="btn-primary">Primário</button>
<button class="btn-secondary">Secundário</button>
<button class="btn-success">Sucesso</button>
<button class="btn-danger">Perigo</button>
```

#### Alerts
```html
<div class="alert alert-success">Sucesso!</div>
<div class="alert alert-error">Erro!</div>
<div class="alert alert-warning">Aviso!</div>
<div class="alert alert-info">Informação!</div>
```

#### Grid
```html
<div class="grid">
  <div class="grid-item">Item 1</div>
  <div class="grid-item">Item 2</div>
</div>
```

#### Utilities
```html
<p class="mt-2">Margem top</p>
<p class="mb-2">Margem bottom</p>
<p class="p-2">Padding</p>
<div class="gap-2">Gap</div>
```

---

## 📦 Deploy

### Build para Produção

```bash
npm run build
```

Cria uma pasta `build` otimizada.

### Deploy no Vercel

1. Instale Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Siga as instruções

### Deploy no GitHub Pages

1. Adicione ao `package.json`:
```json
"homepage": "https://seu-usuario.github.io/seu-repo"
```

2. Build:
```bash
npm run build
```

3. Deploy:
```bash
npm install -g gh-pages
gh-pages -d build
```

---

## 🐛 Troubleshooting

### "Erro de conexão com backend"
**Solução:**
1. Verifique se backend está rodando: `http://localhost:4000`
2. Edite `src/api.js` com a URL correta
3. Verifique CORS no backend

### "Está em loop de login"
**Solução:**
1. Abra DevTools (F12)
2. Vá para Application > Cookies
3. Delete cookies de session
4. Limpe localStorage
5. Recarregue a página

### "Página em branco"
**Solução:**
1. Abra DevTools (F12)
2. Vá para Console
3. Verifique se há erros
4. Ctrl+Shift+Delete para limpar cache
5. Recarregue (Ctrl+F5)

### "Erro ao enviar formulário"
**Solução:**
1. Verifique os dados enviados (Console)
2. Verifique resposta da API (Network tab)
3. Valide os campos obrigatórios
4. Verifique formato dos dados

---

## 💡 Dicas e Boas Práticas

✅ **Sempre valide dados no frontend e no backend**
✅ **Use try-catch para tratamento de erros**
✅ **Mostre feedback visual ao usuário**
✅ **Trate estados de carregamento**
✅ **Use PrivateRoute para proteger rotas**
✅ **Limpe dados sensíveis ao logout**
✅ **Use componentização para reutilização**
✅ **Mantenha CSS organizado e responsivo**

---

## 📚 Recursos Adicionais

- [React Docs](https://react.dev/)
- [React Router Docs](https://reactrouter.com/)
- [Axios Docs](https://axios-http.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Desenvolvido com ❤️ em React**
