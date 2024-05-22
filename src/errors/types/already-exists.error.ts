import { CustomError } from './abstraction/custom.error';

export class AlreadyExistsError extends CustomError {
  constructor(message = 'Já existe', statusCode = 409) {
    super(statusCode, message);
  }
}
