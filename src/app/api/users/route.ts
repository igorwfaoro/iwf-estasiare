import { NextResponse } from 'next/server';
import { createUserServerService } from '../../../services/server/user.server-service';
import { withErrorHandler } from '../../../errors/error-handler';

interface Params {}

const userService = createUserServerService();

export const PUT = withErrorHandler(async (req: Request, {}: Params) => {
  const input = await req.json();

  const response = await userService.update(input);

  return NextResponse.json(response);
});
