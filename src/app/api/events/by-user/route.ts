import { NextResponse } from 'next/server';
import { createEventServerService } from '../../../../services/server/event.server-service';

interface Params {}

const eventService = createEventServerService();

export async function GET(_: Request, {}: Params) {
  const response = await eventService.getByUser();
  return NextResponse.json(response);
}
