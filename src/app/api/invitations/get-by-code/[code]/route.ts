import { NextResponse } from 'next/server';
import { createInvitationService } from '../../../../../app-services/invitation.service';

const invitationService = createInvitationService();

export async function GET(
  _: Request,
  { params }: { params: { code: string } }
) {
  const response = await invitationService.getByCode(params.code);
  return NextResponse.json(response);
}
