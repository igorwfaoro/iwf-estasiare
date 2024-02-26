import { NextResponse } from 'next/server';
import { createEventServerService } from '../../../services/server/event.server-service';
import { getAuthUser } from '../../../auth/auth-config';

const eventService = createEventServerService();

export async function POST(req: Request) {
  const user = await getAuthUser();
  const input = await req.json();

  const response = await eventService.create(user, input);

  return NextResponse.json(response);
}
