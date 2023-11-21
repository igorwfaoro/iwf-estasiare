import { Gift } from '@prisma/client';
import { GiftViewModel } from '../models/view-models/gift.view-model';

export type GiftConverterModel = Gift & {};

export const giftConverter = {
  modelToViewModel: (model: GiftConverterModel): GiftViewModel => ({
    id: Number(model.id),
    description: model.description,
    image: model.image,
    price: model.price.toNumber(),
  }),
};
