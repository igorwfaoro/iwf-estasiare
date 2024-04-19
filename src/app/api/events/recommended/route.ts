import { NextResponse } from 'next/server';

import { createEventServerService } from '../../../../services/server/event.server-service';

interface Params {}

const eventService = createEventServerService();

export async function GET(req: Request, {}: Params) {
  const { searchParams } = new URL(req.url);

  const response = await eventService.recommended(
    searchParams.has('limit') ? Number(searchParams.get('limit')) : undefined
  );

  return NextResponse.json(response);
}
