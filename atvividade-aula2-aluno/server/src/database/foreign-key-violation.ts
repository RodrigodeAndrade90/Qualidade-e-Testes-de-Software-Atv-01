// No PostgreSQL, SQLSTATE 23503 sinaliza uma violação de chave estrangeira.
export function isForeignKeyViolation(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  return 'code' in error && error.code === '23503';
}
