import { NextResponse } from 'next/server';

import { withErrorHandler } from '../../../../../../errors/error-handler';
import { createHandbookServerService } from '../../../../../../services/server/handbook.server-service';

interface Params {
  params: { eventId: string; handbookId: string };
}

const handbookService = createHandbookServerService();

export const GET = withErrorHandler(async (_: Request, { params }: Params) => {
  const gift = await handbookService.getById(Number(params.handbookId));
  return NextResponse.json(gift);
});

export const PUT = withErrorHandler(
  async (req: Request, { params }: Params) => {
    const input = await req.json();

    const gift = await handbookService.update({
      eventId: Number(params.eventId),
      id: Number(params.handbookId),
      input
    });

    return NextResponse.json(gift);
  }
);

export const DELETE = withErrorHandler(
  async (_: Request, { params }: Params) => {
    await handbookService.remove(
      Number(params.eventId),
      Number(params.handbookId)
    );

    return NextResponse.json({ ok: true });
  }
);
