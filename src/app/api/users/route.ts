import { NextResponse } from 'next/server';
import { createUserServerService } from '../../../services/server/user.server-service';

interface Params {}

const userService = createUserServerService();

export async function PUT(req: Request, {}: Params) {
  const input = await req.json();

  const response = await userService.update(input);

  return NextResponse.json(response);
}
