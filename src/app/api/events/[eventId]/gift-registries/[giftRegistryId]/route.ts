import { NextResponse } from 'next/server';

import { withErrorHandler } from '../../../../../../errors/error-handler';
import { createGiftRegistryServerService } from '../../../../../../services/server/gift-registry.server-service';

interface Params {
  params: { eventId: string; giftRegistryId: string };
}

const giftRegistryService = createGiftRegistryServerService();

export const GET = withErrorHandler(async (_: Request, { params }: Params) => {
  const giftRegistry = await giftRegistryService.getById(
    Number(params.giftRegistryId)
  );

  return NextResponse.json(giftRegistry);
});

export const PUT = withErrorHandler(
  async (req: Request, { params }: Params) => {
    const input = await req.json();

    const gift = await giftRegistryService.update({
      eventId: Number(params.eventId),
      id: Number(params.giftRegistryId),
      input
    });

    return NextResponse.json(gift);
  }
);

export const DELETE = withErrorHandler(
  async (_: Request, { params }: Params) => {
    await giftRegistryService.remove(
      Number(params.eventId),
      Number(params.giftRegistryId)
    );

    return NextResponse.json({ ok: true });
  }
);
