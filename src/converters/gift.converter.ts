import { Gift } from '@prisma/client';
import { GiftViewModel } from '../models/view-models/gift.view-model';

export const giftConverter = {
  modelToViewModel: (model: Gift): GiftViewModel => ({
    id: Number(model.id),
    description: model.description,
    image: model.image,
    price: model.price.toNumber(),
  }),
};
