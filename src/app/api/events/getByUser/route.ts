import { NextResponse } from 'next/server';
import { createEventService } from '../../../../app-services/event.service';

const eventService = createEventService();

export async function GET() {
  const response = await eventService.getByUser();
  return NextResponse.json(response);
}
