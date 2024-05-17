import { EventWeddingDetail } from '@prisma/client';

import { EventWeddingDetailViewModel } from '../models/view-models/event-wedding-detail.view-model';

export type EventWeddingDetailConverterModel = EventWeddingDetail & {};

export const eventWeddingDetailConverter = {
  modelToViewModel: (
    model: EventWeddingDetailConverterModel
  ): EventWeddingDetailViewModel => ({
    id: Number(model.id),
    brideName: model.brideName,
    groomName: model.groomName
  })
};
