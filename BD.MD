# Banco de Dados — Sistema de Cursos e Produtos

Este banco de dados foi desenvolvido para gerenciar usuários, categorias, produtos, cursos e alunos. O modelo utiliza relacionamentos simples, chaves estrangeiras e organização relacional.

## Tabelas Criadas

### 1. users
Armazena os dados dos usuários do sistema (administradores e usuários comuns).

Campos principais:
- name
- email (único)
- password  
- role (admin / user)
- createdAt
- updatedAt

### 2. categories
Armazena categorias usadas para organizar produtos.

Campos principais:
- name
- createdAt
- updatedAt

### 3. courses
Registra os cursos disponíveis na plataforma.

Campos principais:
- title
- description
- createdAt
- updatedAt

### 4. products
Armazena produtos associados a categorias.

Campos principais:
- name
- description
- price (DECIMAL 10,2)
- categoryId
- createdAt
- updatedAt

Relacionamentos:
- categoryId → categories.id (N:1)

### 5. students
Registra informações dos alunos.

Campos principais:
- name
- email (único)
- courseId
- enrollmentDate (data de matrícula)
- createdAt
- updatedAt

Relacionamentos:
- courseId → courses.id (N:1)

## Relacionamentos Principais

- products → categories: muitos produtos pertencem a uma categoria (1:N)
- students → courses: muitos alunos podem estar associados a um curso (1:N)

## Estrutura Técnica

O banco inclui índices para otimização de consultas:
- idx_users_email - busca por email de usuários
- idx_products_categoryId - busca de produtos por categoria
- idx_students_courseId - busca de alunos por curso
- idx_students_email - busca por email de alunos

## Script Disponível

banco.sql — contém a criação das tabelas, índices, chaves estrangeiras e regras de integridade referencial.
