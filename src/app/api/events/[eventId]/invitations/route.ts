import { NextResponse } from 'next/server';

import { withErrorHandler } from '../../../../../errors/error-handler';
import { createInvitationServerService } from '../../../../../services/server/invitation.server-service';

interface Params {
  params: { eventId: string };
}

const invitationService = createInvitationServerService();

export const GET = withErrorHandler(async (_: Request, { params }: Params) => {
  const gifts = await invitationService.getAllByEvent(Number(params.eventId));
  return NextResponse.json(gifts);
});

export const POST = withErrorHandler(
  async (req: Request, { params }: Params) => {
    const input = await req.json();

    const response = await invitationService.create(
      Number(params.eventId),
      input
    );

    return NextResponse.json(response);
  }
);
