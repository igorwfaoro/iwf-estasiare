import { NextResponse } from 'next/server';
import { createEventServerService } from '../../../../services/server/event.server-service';

interface Params {
  params: { eventId: string };
}

const eventService = createEventServerService();

export async function GET(_: Request, { params }: Params) {
  const event = await eventService.getById(Number(params.eventId));

  return NextResponse.json(event);
}

export async function PUT(req: Request, { params }: Params) {
  const input = await req.json();

  const event = await eventService.update(Number(params.eventId), input);

  return NextResponse.json(event);
}
