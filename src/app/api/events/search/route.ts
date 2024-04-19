import { NextResponse } from 'next/server';

import { createEventServerService } from '../../../../services/server/event.server-service';

interface Params {}

const eventService = createEventServerService();

export async function GET(req: Request, {}: Params) {
  const { searchParams } = new URL(req.url);

  const response = await eventService.search({
    query: searchParams.has('q') ? String(searchParams.get('q')) : undefined,
    index: searchParams.has('index')
      ? Number(searchParams.get('index'))
      : undefined,
    limit: searchParams.has('limit')
      ? Number(searchParams.get('limit'))
      : undefined
  });

  return NextResponse.json(response);
}
