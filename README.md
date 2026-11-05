# 🧪 Atividade 1 — Mocks e Injeção de Dependência

Projeto desenvolvido para a disciplina, com a implementação de testes unitários no diretório `server/test/`.

---

## 📌 Visão geral

A atividade reúne testes voltados às validações, aos serviços e aos repositórios da aplicação. Para isolar os componentes durante os testes, são utilizadas técnicas de **stub**, **mock** e **spy**, além de dependências simuladas.

## 🗂️ Estrutura dos testes

Os nove arquivos de teste estão organizados da seguinte maneira:

```text
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
```

## 🎯 Cobertura dos cenários

| Categoria | Cenários contemplados |
|:--|:--|
| **Validações — 52 testes** | `positiveInteger`, `parseId`, `validateName`, `validateBody`, `isUniqueViolation` e `isForeignKeyViolation`. |
| **Serviços — 54 testes** | `CoursesService`, `StudentsService` e `EnrollmentsService`, utilizando repositórios simulados (`jest.Mocked<...>`) e as técnicas de **stub**, **mock** e **spy**. |
| **Repositórios — 24 testes** | `PgCourseRepository`, `PgStudentRepository` e `PgEnrollmentRepository`, com uma instância simulada de `Database`: `{ query: jest.fn<Database["query"]>() }`. |

## 📊 Resultados

| Comando | Resultado |
|:--|:--|
| `npm test` | **9 suites e 106 testes**, todos passando. |
| `npm run test:coverage` | **100%** nos 10 arquivos de escopo. |
| `npm run test:typecheck` | Concluído sem erros. |
| `npm run build` | Concluído sem erros. |

## ⚙️ Como executar

No terminal, acesse a pasta do servidor e instale as dependências:

```bash
cd atvividade-aula2-aluno/atvividade-aula2-aluno/server
npm ci
```

Em seguida, execute os testes:

```bash
npm test
```

---

<p align="center">
  <sub>Atividade acadêmica — Mocks e Injeção de Dependência</sub>
</p>
