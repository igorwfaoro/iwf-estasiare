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
