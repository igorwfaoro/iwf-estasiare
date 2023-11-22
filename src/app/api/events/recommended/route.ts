import { NextResponse } from 'next/server';
import { createEventService } from '../../../../app-services/event.service';

const eventService = createEventService();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const response = await eventService.recommended(
    searchParams.has('limit') ? Number(searchParams.get('limit')) : undefined
  );

  return NextResponse.json(response);
}
