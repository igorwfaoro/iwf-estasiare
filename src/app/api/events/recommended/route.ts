import { NextResponse } from 'next/server';

import { withErrorHandler } from '../../../../errors/error-handler';
import { createEventServerService } from '../../../../services/server/event.server-service';

interface Params {}

const eventService = createEventServerService();

export const GET = withErrorHandler(async (req: Request, {}: Params) => {
  const { searchParams } = new URL(req.url);

  const response = await eventService.recommended(
    searchParams.has('limit') ? Number(searchParams.get('limit')) : undefined
  );

  return NextResponse.json(response);
});
