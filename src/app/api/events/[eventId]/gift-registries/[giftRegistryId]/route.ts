import { NextResponse } from 'next/server';

import { createGiftRegistryServerService } from '../../../../../../services/server/gift-registry.server-service';

interface Params {
  params: { eventId: string; giftRegistryId: string };
}

const giftRegistryService = createGiftRegistryServerService();

export async function GET(_: Request, { params }: Params) {
  const giftRegistry = await giftRegistryService.getById(
    Number(params.giftRegistryId)
  );

  return NextResponse.json(giftRegistry);
}

export async function PUT(req: Request, { params }: Params) {
  const input = await req.json();

  const gift = await giftRegistryService.update({
    eventId: Number(params.eventId),
    id: Number(params.giftRegistryId),
    input
  });

  return NextResponse.json(gift);
}

export async function DELETE(_: Request, { params }: Params) {
  await giftRegistryService.remove(
    Number(params.eventId),
    Number(params.giftRegistryId)
  );

  return NextResponse.json({ ok: true });
}
