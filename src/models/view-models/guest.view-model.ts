import { InvitationViewModel } from './invitation.view-model';

export interface GuestViewModel {
  id: number;
  name: string;
  isConfirmed: boolean;
  confirmationDate: Date | null;
  invitation?: InvitationViewModel;
}
