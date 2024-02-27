import { NextResponse } from 'next/server';
import { createInvitationServerService } from '../../../../../../services/server/invitation.server-service';

interface Params {
  params: { eventId: string };
}

const invitationService = createInvitationServerService();

export async function PATCH(req: Request, {}: Params) {
  const input = await req.json();

  await invitationService.updateGuestsConfirmation(input);
  
  return NextResponse.json({ ok: true });
}
