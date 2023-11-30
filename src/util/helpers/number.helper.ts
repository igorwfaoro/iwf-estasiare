import { locale } from '../locale';

const numberFormat = new Intl.NumberFormat(locale.id, {
  style: 'currency',
  currency: locale.currency
});

export const toCurrency = (n: number) => {
  return numberFormat.format(n);
};
