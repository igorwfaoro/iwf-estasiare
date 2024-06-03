import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { locale } from './locale';

dayjs.locale(locale.id);
dayjs.extend(utc);

export const appDayjs = dayjs;

export const dateStringToInput = (date: string) =>
  dayjs.utc(date).format('YYYY-MM-DDTHH:mm');
