import { EventWeddingDetail } from '@prisma/client';
import { EventWeddingDetailViewModel } from '../models/view-models/event-wedding-detail.view-model';

export const eventWeddingDetailConverter = {
  modelToViewModel: (
    model: EventWeddingDetail
  ): EventWeddingDetailViewModel => ({
    id: Number(model.id),
    brideName: model.brideName,
    groomName: model.groomName,
  }),
};
