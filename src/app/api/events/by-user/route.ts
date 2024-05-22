import { NextResponse } from 'next/server';

import { withErrorHandler } from '../../../../errors/error-handler';
import { createEventServerService } from '../../../../services/server/event.server-service';

interface Params {}

const eventService = createEventServerService();

export const GET = withErrorHandler(async (_: Request, {}: Params) => {
  const response = await eventService.getByUser();
  return NextResponse.json(response);
});
