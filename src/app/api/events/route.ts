import { NextResponse } from 'next/server';
import { createEventServerService } from '../../../services/server/event.server-service';

const eventService = createEventServerService();

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);

  const response = await eventService.create();

  return NextResponse.json(response);
}
