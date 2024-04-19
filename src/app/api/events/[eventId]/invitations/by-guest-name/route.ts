import { NextResponse } from 'next/server';

import { createInvitationServerService } from '../../../../../../services/server/invitation.server-service';

interface Params {
  params: { eventId: string };
}

const invitationService = createInvitationServerService();

export async function GET(req: Request, { params }: Params) {
  const { searchParams } = new URL(req.url);

  const response = await invitationService.searchByGuestName(
    Number(Number(params.eventId)),
    String(searchParams.get('q'))
  );

  return NextResponse.json(response);
}
