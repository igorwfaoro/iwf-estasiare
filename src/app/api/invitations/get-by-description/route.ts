import { NextResponse } from 'next/server';
import { createInvitationService } from '../../../../app-services/invitation.service';

const invitationService = createInvitationService();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const response = await invitationService.getByDescription(
    Number(searchParams.get('eventId')),
    String(searchParams.get('description'))
  );
  return NextResponse.json(response);
}
