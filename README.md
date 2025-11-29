📘 Frontend — Gerenciamento Pro

Aplicação React moderna e responsiva para gerenciamento de cursos, alunos, produtos e usuários, utilizando tema escuro elegante (azul/preto/dourado) e animações suaves.

Este README documenta o funcionamento do frontend, requisitos, instalação, estrutura, rotas, páginas e processos de deploy.

📌 Resumo

O frontend do Gerenciamento Pro é responsável pela interface do usuário, consumindo a API Node/Express e oferecendo experiência fluida e organizada para operações de CRUD e autenticação.

Principais características:

Autenticação com sessão (withCredentials)

Dashboard com estatísticas

CRUD completo de cursos, alunos, produtos e usuários

Tema escuro moderno com gradiente azul/preto/dourado

Componentes reutilizáveis

Páginas protegidas por autenticação

Responsividade total

⚙️ Requisitos

Node.js v14+ (recomendado v16+)

npm v6+ ou yarn

Backend disponível
Padrão → http://localhost:4000/api

🚀 Como rodar localmente

No terminal, acesse o diretório do frontend:

cd "C:\Users\joaop\Downloads\projeto-final-web2 teste final\projeto-final-web2\projeto-final-web2\frontend"
npm install
npm start


A aplicação abrirá em:

http://localhost:3000


Ou usando Yarn:

yarn
yarn start

🔌 Configuração de API

Arquivo: src/api.js

baseURL: 'http://localhost:4000/api',
withCredentials: true


Para ambiente de produção, defina no .env:

REACT_APP_API_URL=https://seu-backend.com/api


E atualize api.js para usar process.env.REACT_APP_API_URL.

📁 Estrutura do Projeto
frontend/
├── public/
│   └── index.html
├── src/
│   ├── api.js
│   ├── App.js
│   ├── index.js
│   ├── styles.css
│   ├── components/
│   │   ├── Header.js
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── PrivateRoute.js
│   │   ├── Spinner.js
│   │   └── Icons.js
│   └── pages/
│       ├── Landing.js
│       ├── Login.js
│       ├── Dashboard.js
│       ├── Courses/
│       ├── Students/
│       ├── Products/
│       └── Users/
├── package.json
└── README.md

🖥️ Tema e Visual

Paleta de cores:

Azul primário → #1e90ff

Azul escuro → #0b3d91

Preto profundo → #000000

Dourado → #D4AF37

Texto claro → #f8fafc

Estilo geral:

Gradiente preto → azul escuro

Bordas arredondadas com detalhes dourados

Layout 100% responsivo

Animações suaves entre páginas

Componentes minimalistas e profissionais

📂 Funcionalidades
🔐 Autenticação

Login (/login)

Sessão persistida via cookies

Rota protegida com PrivateRoute.js

Logout no Navbar

📊 Dashboard

Mostra totais de:

Alunos

Cursos

Produtos

Usuários

Atalhos para ações rápidas.

📘 Cursos

Listar cursos

Criar/editar/excluir

Contador de alunos matriculados

Atualização automática quando alunos são criados

👥 Alunos

CRUD completo

Associação com cursos

Filtro de busca

Validações importantes (ex: email único)

📦 Produtos

CRUD de produtos

Validação de preço e categoria

Totalmente integrado com banco via API

👤 Usuários (admin)

Listar usuários

Ver roles (admin/user)

🌐 Endpoints Consumidos
Método	Endpoint	Função
POST	/auth/login	Login do usuário
POST	/auth/logout	Logout
GET	/auth/me	Sessão atual
GET	/courses	Listar cursos
POST	/courses	Criar curso
PUT	/courses/:id	Atualizar curso
DELETE	/courses/:id	Remover curso
GET	/students	Listar alunos
POST	/students	Criar aluno
PUT	/students/:id	Atualizar aluno
DELETE	/students/:id	Remover aluno
GET	/products	Listar produtos
POST	/products	Criar produto
PUT	/products/:id	Atualizar
DELETE	/products/:id	Excluir
GET	/users	Listar usuários
📦 Scripts úteis
npm start        # Inicia o frontend
npm run build    # Gera versão de produção
npm test         # Executa testes (se houver)

👤 Autor

Projeto desenvolvido por: João Paulo / Sua Equipe
