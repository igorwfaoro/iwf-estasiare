import { NextResponse } from 'next/server';
import { createEventServerService } from '../../../../services/server/event.server-service';

const eventService = createEventServerService();

export async function GET(
  _: Request,
  { params }: { params: { eventId: number } }
) {
  const event = await eventService.getById(Number(params.eventId));
  return NextResponse.json(event);
}
