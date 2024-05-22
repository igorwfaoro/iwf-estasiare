import { NextResponse } from 'next/server';

import { withErrorHandler } from '../../../../../errors/error-handler';
import { createHandbookServerService } from '../../../../../services/server/handbook.server-service';

interface Params {
  params: { eventId: string };
}

const handbookService = createHandbookServerService();

export const GET = withErrorHandler(async (_: Request, { params }: Params) => {
  const gifts = await handbookService.getAllByEvent(Number(params.eventId));
  return NextResponse.json(gifts);
});

export const POST = withErrorHandler(
  async (req: Request, { params }: Params) => {
    const input = await req.json();
    const response = await handbookService.create(
      Number(params.eventId),
      input
    );
    return NextResponse.json(response);
  }
);
