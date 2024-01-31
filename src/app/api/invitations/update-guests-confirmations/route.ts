import { NextResponse } from 'next/server';
import { createInvitationServerService } from '../../../../services/server/invitation.server-service';

const invitationService = createInvitationServerService();

export async function PATCH(req: Request) {
  await invitationService.updateGuestsConfirmation(await req.json());
  return NextResponse.json({ ok: true });
}
