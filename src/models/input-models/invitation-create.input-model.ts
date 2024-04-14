import { GuestStatus } from "@prisma/client";

export interface InvitationInputModel {
  description: string;
  guests?: Guest[];
}

interface Guest {
  name: string;
  status?: GuestStatus;
}
