import { NextResponse } from 'next/server';
import { createInvitationServerService } from '../../../../../../services/server/invitation.server-service';

interface Params {
  params: { eventId: string };
}

const invitationService = createInvitationServerService();

export async function GET(req: Request, {}: Params) {
  const { searchParams } = new URL(req.url);

  const response = await invitationService.getByDescription(
    Number(searchParams.get('eventId')),
    String(searchParams.get('description'))
  );
  return NextResponse.json(response);
}
