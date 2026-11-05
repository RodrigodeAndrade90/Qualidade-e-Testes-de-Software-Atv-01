import { Pool, type QueryResultRow } from "pg";

// Define a conexão com PostgreSQL usando as variáveis de ambiente.
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.on("error", (error) => {
  console.error("Erro na conexão com o PostgreSQL:", error);
});

// O Pool implementa esta interface; nos testes, query() pode ser simulada.
export interface Database {
  query<T extends QueryResultRow>(sql: string, values?: unknown[]): Promise<{ rows: T[] }>;
}
