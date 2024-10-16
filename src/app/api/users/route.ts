import { NextResponse } from 'next/server';
import { withErrorHandler } from '../../../errors/error-handler';
import { createUserServerService } from '../../../services/server/user.server-service';

interface Params {}

const userService = createUserServerService();

export const POST = withErrorHandler(async (req: Request, {}: Params) => {
  const input = await req.json();

  const response = await userService.register(input);

  return NextResponse.json(response);
});

export const PUT = withErrorHandler(async (req: Request, {}: Params) => {
  const input = await req.json();

  const response = await userService.update(input);

  return NextResponse.json(response);
});
