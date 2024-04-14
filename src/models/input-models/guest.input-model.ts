import { GuestStatus } from '@prisma/client';

export interface GuestInputModel {
  name: string;
  status: GuestStatus;
}
