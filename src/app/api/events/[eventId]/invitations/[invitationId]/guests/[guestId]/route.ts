import { NextResponse } from 'next/server';
import { createInvitationServerService } from '../../../../../../../../services/server/invitation.server-service';

interface Params {
  params: { eventId: string; invitationId: string; guestId: string };
}

const invitationService = createInvitationServerService();

export async function PUT(req: Request, { params }: Params) {
  const input = await req.json();

  const gift = await invitationService.updateGuest({
    eventId: Number(params.eventId),
    invitationId: Number(params.invitationId),
    guestId: Number(params.guestId),
    input
  });

  return NextResponse.json(gift);
}

export async function DELETE(_: Request, { params }: Params) {
  await invitationService.removeGuest({
    eventId: Number(params.eventId),
    invitationId: Number(params.invitationId),
    guestId: Number(params.guestId)
  });

  return NextResponse.json({ ok: true });
}
