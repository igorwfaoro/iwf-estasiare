import { NextResponse } from 'next/server';
import { createGiftServerService } from '../../../../../../services/server/gift.server-service';
import { getAuthUser } from '../../../../../../auth/auth-config';

interface Params {
  params: { eventId: string; giftId: string };
}

const giftService = createGiftServerService();

export async function GET(_: Request, { params }: Params) {
  const gift = await giftService.getById(
    Number(params.eventId),
    Number(params.giftId)
  );

  return NextResponse.json(gift);
}

export async function UPDATE(req: Request, { params }: Params) {
  const user = await getAuthUser();
  const input = await req.json();

  const gift = await giftService.update({
    eventId: Number(params.eventId),
    id: Number(params.giftId),
    input,
    user
  });

  return NextResponse.json(gift);
}

export async function DELETE(_: Request, { params }: Params) {
  const user = await getAuthUser();

  const gift = await giftService.remove({
    eventId: Number(params.eventId),
    id: Number(params.giftId),
    user
  });

  return NextResponse.json(gift);
}
