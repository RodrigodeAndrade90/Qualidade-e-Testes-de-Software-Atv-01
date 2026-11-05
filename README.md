# Atividade 1 --- Mocks e Injeção de Dependência {#atividade-1-mocks-e-injeção-de-dependência align="center"}

Projeto desenvolvido para a disciplina, contendo a implementação dos
testes unitários localizados em `server/test/`.

## Implementações realizadas

Foram criados nove arquivos de testes unitários, seguindo as orientações
do README original do projeto (disponível em
`atvividade-aula2-aluno/atvividade-aula2-aluno/README.md`):

    server/test/
    ├── validation.test.ts
    ├── database/
    │   ├── unique-violation.test.ts
    │   └── foreign-key-violation.test.ts
    └── modules/
        ├── courses/
        │   ├── courses.service.test.ts
        │   └── courses.repository.test.ts
        ├── students/
        │   ├── students.service.test.ts
        │   └── students.repository.test.ts
        └── enrollments/
            ├── enrollments.service.test.ts
            └── enrollments.repository.test.ts

## Cenários contemplados pelos testes

-   **Validações** (52 testes): abrangem `positiveInteger`, `parseId`,
    `validateName`, `validateBody`, `isUniqueViolation` e
    `isForeignKeyViolation`.
-   **Serviços** (54 testes): incluem `CoursesService`,
    `StudentsService` e `EnrollmentsService`, utilizando repositórios
    simulados (`jest.Mocked<...>`) com as técnicas de **stub**, **mock**
    e **spy**.
-   **Repositórios** (24 testes): contemplam `PgCourseRepository`,
    `PgStudentRepository` e `PgEnrollmentRepository`, com uma instância
    simulada de `Database` (`{ query: jest.fn<Database["query"]>() }`).

## Resultados obtidos

  Comando                    Resultado
  -------------------------- ----------------------------------------------------------
  `npm test`                 **9 suites, 106 testes executados com sucesso**
  `npm run test:coverage`    100% de cobertura nos 10 arquivos considerados no escopo
  `npm run test:typecheck`   Execução concluída sem erros
  `npm run build`            Compilação concluída sem erros

## Instruções para execução

    cd atvividade-aula2-aluno/atvividade-aula2-aluno/server
    npm ci
    npm test
