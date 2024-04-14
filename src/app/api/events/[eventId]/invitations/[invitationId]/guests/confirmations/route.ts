import { NextResponse } from 'next/server';
import { createInvitationServerService } from '../../../../../../../../services/server/invitation.server-service';

interface Params {
  params: { eventId: string; invitationId: string };
}

const invitationService = createInvitationServerService();

export async function PATCH(req: Request, { params }: Params) {
  const input = await req.json();

  await invitationService.updateGuestsConfirmation(
    Number(params.invitationId),
    input
  );

  return NextResponse.json({ ok: true });
}
