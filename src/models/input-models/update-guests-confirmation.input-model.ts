import { GuestStatus } from '@prisma/client';

export interface UpdateGuestsConfirmationInputModel {
  guests: { id: number; status: GuestStatus }[];
}
