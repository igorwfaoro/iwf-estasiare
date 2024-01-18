import { EventContentImage } from '@prisma/client';
import { EventContentImageViewModel } from '../models/view-models/event-content-image.view-model';

export type EventContentImageConverterModel = EventContentImage & {};

export const eventContentImageConverter = {
  modelToViewModel: (
    model: EventContentImageConverterModel
  ): EventContentImageViewModel => ({
    id: Number(model.id),
    image: model.image
  })
};
