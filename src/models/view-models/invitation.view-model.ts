import { GuestViewModel } from './guest.view-model';

export interface InvitationViewModel {
  id: number;
  description: string;
  guests?: GuestViewModel[];
}
