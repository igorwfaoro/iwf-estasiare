import { GuestViewModel } from './guest.view-model';

export interface InvitationViewModel {
  id: number;
  code: string;
  description: string | null;
  guests?: GuestViewModel[];
}
