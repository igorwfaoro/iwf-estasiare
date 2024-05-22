import { CustomError } from './abstraction/custom.error';

export class BadError extends CustomError {
  constructor(
    message = 'Erro na na comunicação com o serviço',
    statusCode = 400
  ) {
    super(statusCode, message);
  }
}
