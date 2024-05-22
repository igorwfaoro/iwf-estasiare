import { CustomError } from './abstraction/custom.error';

export class NotFoundError extends CustomError {
  constructor(message = 'Não encontrado', statusCode = 404) {
    super(statusCode, message);
  }
}
