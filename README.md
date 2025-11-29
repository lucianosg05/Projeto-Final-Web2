Banco de Dados — Sistema de Cursos e Produtos

Este banco de dados foi desenvolvido para gerenciar usuários, categorias, produtos, cursos e alunos.
O modelo utiliza relacionamentos simples, chaves estrangeiras e organização relacional.

Tabelas Criadas
1. users

Armazena os dados dos usuários do sistema (administradores e usuários comuns).
Campos principais:

name

email (único)

password

role (admin / user)

2. categories

Armazena categorias usadas para organizar produtos.

3. courses

Registra os cursos disponíveis na plataforma.

4. products

Armazena produtos associados a categorias.
Relacionamentos:

categoryId → categories.id (N:1)

5. students

Registra informações dos alunos.
Relacionamentos:

courseId → courses.id (N:1)
Cada aluno pode estar matriculado em apenas um curso.

Relacionamentos Principais

products → categories: muitos produtos pertencem a uma categoria (1:N).

students → courses: muitos alunos podem estar associados a um curso (1:N).

Script Disponível

banco.sql — contém a criação das tabelas, índices e chaves estrangeiras.
