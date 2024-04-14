import { GuestViewModel } from './guest.view-model';

export interface InvitationDetailViewModel {
  id: number;
  description: string;
  guests: GuestViewModel[];
}
