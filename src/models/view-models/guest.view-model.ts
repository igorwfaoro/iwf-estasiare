import { GuestStatus } from '@prisma/client';

import { InvitationViewModel } from './invitation.view-model';

export interface GuestViewModel {
  id: number;
  name: string;
  status: GuestStatus;

  invitation?: InvitationViewModel;
}
