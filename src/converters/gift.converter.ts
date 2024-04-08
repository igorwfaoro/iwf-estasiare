import { Gift } from '@prisma/client';
import { GiftViewModel } from '../models/view-models/gift.view-model';
import { getFilePublicUrl } from '../util/helpers/file.helper';

export type GiftConverterModel = Gift & {};

export const giftConverter = {
  modelToViewModel: (model: GiftConverterModel): GiftViewModel => ({
    id: Number(model.id),
    description: model.description,
    image: getFilePublicUrl(model.image),
    price: model.price.toNumber()
  })
};
