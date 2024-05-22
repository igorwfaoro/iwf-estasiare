import { CustomError } from './abstraction/custom.error';

export class AuthError extends CustomError {
  constructor(message = 'Erro de autenticação', statusCode = 401) {
    super(statusCode, message);
  }
}
