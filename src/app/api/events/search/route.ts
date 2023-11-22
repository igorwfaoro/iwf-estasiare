import { NextResponse } from 'next/server';
import { createEventService } from '../../../../app-services/event.service';

const eventService = createEventService();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const response = await eventService.search({
    query: searchParams.has('q') ? String(searchParams.get('q')) : undefined,
    index: searchParams.has('index')
      ? Number(searchParams.get('index'))
      : undefined,
    limit: searchParams.has('limit')
      ? Number(searchParams.get('limit'))
      : undefined,
  });
  
  return NextResponse.json(response);
}
