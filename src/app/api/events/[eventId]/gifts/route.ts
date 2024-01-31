import { createGiftServerService } from '../../../../../services/server/gift.server-service';
import { getAuthUser } from '../../../../../auth/auth-config';

const giftService = createGiftServerService();

export async function GET(
  _: Request,
  { params }: { params: { eventId: number } }
) {
  const user = await getAuthUser();
  return await giftService.getAllByEvent(user, params.eventId);
}
