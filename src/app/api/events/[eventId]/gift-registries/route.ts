import { NextResponse } from 'next/server';

import { withErrorHandler } from '../../../../../errors/error-handler';
import { createGiftRegistryServerService } from '../../../../../services/server/gift-registry.server-service';

interface Params {
  params: { eventId: string };
}

const giftRegistryService = createGiftRegistryServerService();

export const GET = withErrorHandler(async (_: Request, { params }: Params) => {
  const giftRegistries = await giftRegistryService.getAllByEvent(
    Number(params.eventId)
  );
  return NextResponse.json(giftRegistries);
});

export const POST = withErrorHandler(
  async (req: Request, { params }: Params) => {
    const input = await req.json();
    const response = await giftRegistryService.create(
      Number(params.eventId),
      input
    );
    return NextResponse.json(response);
  }
);
