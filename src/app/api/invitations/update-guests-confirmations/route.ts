import { NextResponse } from 'next/server';
import { createInvitationService } from '../../../../app-services/invitation.service';

const invitationService = createInvitationService();

export async function PATCH(req: Request) {
  await invitationService.updateGuestsConfirmation(await req.json());
  return NextResponse.json({ ok: true });
}
