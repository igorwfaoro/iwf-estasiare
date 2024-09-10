import { PixKeyType } from '@prisma/client';
import VMasker from 'vanilla-masker';

export const eventFinancialPixType = (type: PixKeyType): string => {
  const types: { [key in PixKeyType]: string } = {
    CNPJ: 'CNPJ',
    CPF: 'CPF',
    EMAIL: 'E-mail',
    PHONE: 'Telefone',
    RANDOM: 'Chave aleatória'
  };

  return types[type];
};

export const eventFinancialPixMask = (
  keyType: PixKeyType,
  keyValue: string
): string => {
  const masks: { [key in PixKeyType]: string } = {
    CNPJ: '99.999.999/9999-99',
    CPF: '999.999.999-99',
    EMAIL: '',
    PHONE: '(99) 99999-9999',
    RANDOM: ''
  };

  const mask = masks[keyType];

  if (!mask) return keyValue;

  return VMasker.toPattern(keyValue, mask);
};
