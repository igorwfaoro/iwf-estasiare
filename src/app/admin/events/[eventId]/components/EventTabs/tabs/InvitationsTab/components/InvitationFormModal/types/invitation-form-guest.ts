import { GuestStatus } from '@prisma/client';

export interface InvitationFormGuest {
  id?: number;
  name: string;
  status: GuestStatus;
}
