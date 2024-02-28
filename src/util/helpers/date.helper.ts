import dayjs from 'dayjs';

export const dateStringToInput = (date: string) =>
  dayjs(date).format('YYYY-MM-DDTHH:mm');
