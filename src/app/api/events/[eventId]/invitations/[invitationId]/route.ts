import { NextResponse } from 'next/server';
import { createInvitationServerService } from '../../../../../../services/server/invitation.server-service';

interface Params {
  params: { eventId: string; invitationId: string };
}

const invitationService = createInvitationServerService();

export async function GET(_: Request, { params }: Params) {
  const gift = await invitationService.getById(
    Number(params.eventId),
    Number(params.invitationId)
  );

  return NextResponse.json(gift);
}

export async function PUT(req: Request, { params }: Params) {
  const input = await req.json();

  const gift = await invitationService.update({
    eventId: Number(params.eventId),
    id: Number(params.invitationId),
    input
  });

  return NextResponse.json(gift);
}

export async function DELETE(_: Request, { params }: Params) {
  await invitationService.remove(
    Number(params.eventId),
    Number(params.invitationId)
  );

  return NextResponse.json({ ok: true });
}
