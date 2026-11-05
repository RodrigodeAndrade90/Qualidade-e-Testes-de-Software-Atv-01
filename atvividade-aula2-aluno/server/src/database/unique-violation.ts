// No PostgreSQL, SQLSTATE 23505 indica conflito com uma restrição de unicidade.
export function isUniqueViolation(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  return 'code' in error && error.code === '23505';
}
