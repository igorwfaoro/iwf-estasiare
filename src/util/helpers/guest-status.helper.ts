import { GuestStatus } from '@prisma/client';
import { COLORS } from '../colors';

export const guestStatusLabel: { [key in GuestStatus]: string } = {
  [GuestStatus.PENDING]: 'Pendente',
  [GuestStatus.CONFIRMED]: 'Confirmado',
  [GuestStatus.DECLINED]: 'Declinado'
};

export const guestStatusColor: { [key in GuestStatus]: string } = {
  [GuestStatus.PENDING]: COLORS.blue[700],
  [GuestStatus.CONFIRMED]: COLORS.green[600],
  [GuestStatus.DECLINED]: COLORS.red[700]
};

export const guestStatusList = Object.keys(guestStatusLabel);
