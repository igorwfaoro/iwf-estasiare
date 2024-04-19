import { EventHandbook } from '@prisma/client';

import { EventHandbookDetailViewModel } from '../models/view-models/event-handbook-detail.view-model';
import { EventHandbookViewModel } from '../models/view-models/event-handbook.view-model';

export type EventHandbookConverterModel = EventHandbook & {};

export const eventHandbookConverter = {
  modelToViewModel: (
    model: EventHandbookConverterModel
  ): EventHandbookViewModel => ({
    id: Number(model.id),
    title: model.title,
    description: model.description
  }),
  modelToDetailViewModel: (
    model: EventHandbookConverterModel
  ): EventHandbookDetailViewModel => ({
    id: Number(model.id),
    title: model.title,
    description: model.description,
    content: model.content
  })
};
