export interface UpdateGuestsConfirmationInputModel {
  invitationId: number;
  guests: { id: number; isConfirmed: boolean }[];
}
