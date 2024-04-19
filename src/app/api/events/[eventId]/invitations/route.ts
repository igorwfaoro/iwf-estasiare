import { NextResponse } from 'next/server';

import { createInvitationServerService } from '../../../../../services/server/invitation.server-service';

interface Params {
  params: { eventId: string };
}

const invitationService = createInvitationServerService();

export async function GET(_: Request, { params }: Params) {
  const gifts = await invitationService.getAllByEvent(Number(params.eventId));

  return NextResponse.json(gifts);
}

export async function POST(req: Request, { params }: Params) {
  const input = await req.json();

  const response = await invitationService.create(
    Number(params.eventId),
    input
  );

  return NextResponse.json(response);
}
