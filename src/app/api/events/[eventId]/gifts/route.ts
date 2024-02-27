import { createGiftServerService } from '../../../../../services/server/gift.server-service';
import { getAuthUser } from '../../../../../auth/auth-config';
import { NextResponse } from 'next/server';

const giftService = createGiftServerService();

export async function GET(
  _: Request,
  { params }: { params: { eventId: number } }
) {
  const user = await getAuthUser();
  const gifts = await giftService.getAllByEvent(user, params.eventId);

  return NextResponse.json(gifts)
}
