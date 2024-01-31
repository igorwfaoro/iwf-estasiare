import { NextResponse } from 'next/server';
import { createInvitationServerService } from '../../../../services/server/invitation.server-service';

const invitationService = createInvitationServerService();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const response = await invitationService.getByDescription(
    Number(searchParams.get('eventId')),
    String(searchParams.get('description'))
  );
  return NextResponse.json(response);
}
