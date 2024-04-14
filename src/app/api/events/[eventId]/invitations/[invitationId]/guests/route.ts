import { NextResponse } from 'next/server';
import { createInvitationServerService } from '../../../../../../../services/server/invitation.server-service';

interface Params {
  params: { eventId: string; invitationId: string };
}

const invitationService = createInvitationServerService();

export async function POST(req: Request, { params }: Params) {
  const input = await req.json();

  const response = await invitationService.addGuest({
    eventId: Number(params.eventId),
    invitationId: Number(params.invitationId),
    input
  });

  return NextResponse.json(response);
}
