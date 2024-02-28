import { createGiftServerService } from '../../../../../services/server/gift.server-service';
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
  const input = await req.json();

  const response = await giftService.create(Number(params.eventId), input);

  return NextResponse.json(response);
}
