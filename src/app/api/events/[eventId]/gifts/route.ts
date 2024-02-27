import { createGiftServerService } from '../../../../../services/server/gift.server-service';
import { getAuthUser } from '../../../../../auth/auth-config';
import { NextResponse } from 'next/server';

interface Params {
  params: { eventId: string };
}

const giftService = createGiftServerService();

export async function GET(_: Request, { params }: Params) {
  const gifts = await giftService.getAllByEvent(Number(params.eventId));

  return NextResponse.json(gifts);
}

export async function POST(req: Request, { params }: Params) {
  const user = await getAuthUser();
  const input = await req.json();

  const response = await giftService.create({
    eventId: Number(params.eventId),
    input,
    user
  });

  return NextResponse.json(response);
}
