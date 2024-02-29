import { NextResponse } from 'next/server';
import { createGiftServerService } from '../../../../../../services/server/gift.server-service';
import { createHandbookServerService } from '../../../../../../services/server/handbook.server-service';

interface Params {
  params: { eventId: string; handbookId: string };
}

const handbookService = createHandbookServerService();

export async function GET(_: Request, { params }: Params) {
  const gift = await handbookService.getById(Number(params.handbookId));

  return NextResponse.json(gift);
}

export async function PUT(req: Request, { params }: Params) {
  const input = await req.json();

  const gift = await handbookService.update({
    eventId: Number(params.eventId),
    id: Number(params.handbookId),
    input
  });

  return NextResponse.json(gift);
}

export async function DELETE(_: Request, { params }: Params) {
  await handbookService.remove(
    Number(params.eventId),
    Number(params.handbookId)
  );

  return NextResponse.json({ ok: true });
}
