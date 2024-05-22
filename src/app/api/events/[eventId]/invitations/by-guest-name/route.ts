import { NextResponse } from 'next/server';

import { createInvitationServerService } from '../../../../../../services/server/invitation.server-service';
import { withErrorHandler } from '../../../../../../errors/error-handler';

interface Params {
  params: { eventId: string };
}

const invitationService = createInvitationServerService();

export const GET = withErrorHandler(
  async (req: Request, { params }: Params) => {
    const { searchParams } = new URL(req.url);

    const response = await invitationService.searchByGuestName(
      Number(params.eventId),
      String(searchParams.get('q'))
    );

    return NextResponse.json(response);
  }
);
