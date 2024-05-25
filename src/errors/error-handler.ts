import { NextResponse } from 'next/server';
import { CustomError } from './types/abstraction/custom.error';

export const withErrorHandler = (fn: Function) => {
  return async function (request: Request, ...args: any) {
    try {
      return await fn(request, ...args);
    } catch (error: any) {
      const { message, statusCode: status } = mapErrorType(error);

      return NextResponse.json({ message }, { status });
    }
  };
};

const mapErrorType = (error: Error) => {
  let message: string = 'Algo errado...';
  let statusCode: number = 500;

  if (error instanceof CustomError) {
    message = error.message;
    statusCode = error.statusCode;
  }

  console.error(error);

  return { message, statusCode };
};
