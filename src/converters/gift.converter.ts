import { Gift } from '@prisma/client';
import { GiftViewModel } from '../models/view-models/gift.view-model';
import { getFileApiUrl } from '../util/helpers/file.helper';

export type GiftConverterModel = Gift & {};

export const giftConverter = {
  modelToViewModel: (model: GiftConverterModel): GiftViewModel => ({
    id: Number(model.id),
    description: model.description,
    image: getFileApiUrl(model.image),
    price: model.price.toNumber()
  })
};
