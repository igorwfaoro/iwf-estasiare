import { NextResponse } from 'next/server';
import { createEventServerService } from '../../../services/server/event.server-service';

interface Params {}

const eventService = createEventServerService();

export async function POST(req: Request, {}: Params) {
  const input = await req.json();

  const response = await eventService.create(input);

  return NextResponse.json(response);
}
