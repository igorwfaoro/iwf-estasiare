import {
  EventWeddingDetail,
  EventWeddingDetailGiftRegistry,
  GiftRegistry
} from '@prisma/client';

import { EventWeddingDetailViewModel } from '../models/view-models/event-wedding-detail.view-model';
import { giftRegisterConverter } from './gift-registry.converter';

export type EventWeddingDetailConverterModel = EventWeddingDetail & {
  giftRegistries?:
    | (EventWeddingDetailGiftRegistry & { giftRegistry: GiftRegistry })[]
    | null;
};

export const eventWeddingDetailConverter = {
  modelToViewModel: (
    model: EventWeddingDetailConverterModel
  ): EventWeddingDetailViewModel => ({
    id: Number(model.id),
    brideName: model.brideName,
    groomName: model.groomName,
    giftRegistries: model.giftRegistries?.map((gr) =>
      giftRegisterConverter.modelToViewModel(gr.giftRegistry)
    )
  })
};
