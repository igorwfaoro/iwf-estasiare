import { EventContent, EventContentImage } from '@prisma/client';
import { EventContentViewModel } from '../models/view-models/event-content.view-model';
import { eventContentImageConverter } from './event-content-image.converter';
import { getFileApiUrlOrNull } from '../util/helpers/file.helper';

export type EventContentConverterModel = EventContent & {
  images?: EventContentImage[];
};

export const eventContentConverter = {
  modelToViewModel: (
    model: EventContentConverterModel
  ): EventContentViewModel => ({
    id: Number(model.id),
    primaryColor: model.primaryColor,
    logoImage: getFileApiUrlOrNull(model.logoImage),
    spotifyPlaylistUrl: model.spotifyPlaylistUrl,
    bannerImage: getFileApiUrlOrNull(model.bannerImage),
    images: model.images?.map(eventContentImageConverter.modelToViewModel)
  })
};
