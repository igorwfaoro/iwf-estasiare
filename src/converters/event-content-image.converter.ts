import { EventContentImage } from '@prisma/client';
import { EventContentImageViewModel } from '../models/view-models/event-content-image.view-model';
import { getFileApiUrl } from '../util/helpers/file.helper';

export type EventContentImageConverterModel = EventContentImage & {};

export const eventContentImageConverter = {
  modelToViewModel: (
    model: EventContentImageConverterModel
  ): EventContentImageViewModel => ({
    id: Number(model.id),
    image: getFileApiUrl(model.image)
  })
};
