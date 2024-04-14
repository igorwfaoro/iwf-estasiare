import { GuestStatus } from '@prisma/client';

export type InvitationUpdateInputModel = Partial<Invitation>;

interface Invitation {
  description: string;
  guests: Guest[];
}

export type InvitationGuestUpdateInputModel = Partial<Guest>;

interface Guest {
  id: number;
  name: string;
  status: GuestStatus;
}
