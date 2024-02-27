import { NextResponse } from 'next/server';
import { createEventServerService } from '../../../../services/server/event.server-service';
import { getAuthUser } from '../../../../auth/auth-config';

interface Params {}

const eventService = createEventServerService();

export async function GET(_: Request, {}: Params) {
  const user = await getAuthUser();

  const response = await eventService.getByUser(user);

  return NextResponse.json(response);
}
