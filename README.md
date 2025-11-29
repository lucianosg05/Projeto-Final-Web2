Banco de Dados — Sistema de Cursos

Este banco de dados foi desenvolvido para gerenciar usuários, cursos, professores, alunos e matrículas dentro de um sistema acadêmico. O modelo utiliza relacionamento entre tabelas, chaves estrangeiras e estrutura relacional normalizada.

Tabelas criadas
● usuarios → dados de login (admin, professor, aluno)
● professores → dados dos professores (ligado a usuarios)
● alunos → dados dos alunos (ligado a usuarios)
● cursos → cursos e professor responsável
● matriculas → ligação entre alunos e cursos

Relacionamentos principais
● usuarios → professores (1:1 opcional)
● usuarios → alunos (1:1 opcional)
● professores → cursos (1:N)
● alunos ↔ cursos (N:N via matriculas)

A tabela usuarios armazena os dados de login e serve como base para professores e alunos. Cada professor ou aluno pode estar vinculado a um único usuário, formando um relacionamento 1:1 opcional (pois o campo id_usuario aceita NULL). A tabela cursos se relaciona com professores também em um relacionamento 1:N, onde um professor pode ministrar vários cursos. Já a tabela matriculas faz a ligação entre alunos e cursos, representando um relacionamento N:N, pois um aluno pode estar matriculado em vários cursos, e um curso pode ter vários alunos.

Script Disponível:
banco.sql - Criação das tabelas e chaves estrangeiras
