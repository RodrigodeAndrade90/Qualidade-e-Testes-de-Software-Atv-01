// Falha prevista pela aplicação, como entrada inválida ou registro ausente.
export class HttpError extends Error {
  constructor(public readonly statusCode: number, message: string) {
    super(message);
  }
}
