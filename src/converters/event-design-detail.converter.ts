import { EventDesignDetail } from '@prisma/client';
import { EventDesignDetailViewModel } from '../models/view-models/event-design-detail.view-model';

export const eventDesignDetailConverter = {
  modelToViewModel: (
    model: EventDesignDetail
  ): EventDesignDetailViewModel => ({
    id: Number(model.id),
    primaryColor: model.primaryColor,
    secondaryColor: model.secondaryColor,
    bannerImage: model.bannerImage
  }),
};
