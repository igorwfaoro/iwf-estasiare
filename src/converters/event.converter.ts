import {
  Event,
  EventAddress,
  EventContent,
  EventContentImage,
  EventFinancial,
  EventType,
  EventWeddingDetail,
  Gift,
} from '@prisma/client';
import { EventViewModel } from '../models/view-models/event.view-model';
import { eventWeddingDetailConverter } from './event-wedding-detail.converter';
import { eventTypeLabel } from '../util/helpers/event-type.helper';
import { giftConverter } from './gift.converter';
import { eventAddressConverter } from './event-address.converter';
import {
  EventContentConverterModel,
  eventContentConverter,
} from './event-content.converter';
import { eventFinancialConverter } from './event-financial.converter';

export type EventConverterModel = Event & {
  content: EventContentConverterModel | undefined;
  address: EventAddress | undefined;
  financial: EventFinancial | null;
  weddingDetail: EventWeddingDetail | null;
  gifts: Gift[] | undefined;
};

export const eventConverter = {
  modelToViewModel: (model: EventConverterModel): EventViewModel => ({
    id: Number(model.id),
    eventType: model.eventType,
    date: model.date,
    slug: model.slug,
    address: model.address
      ? eventAddressConverter.modelToViewModel(model.address)
      : undefined,

    content: model.content
      ? eventContentConverter.modelToViewModel(model.content)
      : undefined,

    financial: model.financial
      ? eventFinancialConverter.modelToViewModel(model.financial)
      : null,

    weddingDetail: model.weddingDetail
      ? eventWeddingDetailConverter.modelToViewModel(model.weddingDetail)
      : null,

    gifts: model.gifts?.map(giftConverter.modelToViewModel),

    createdAt: model.createdAt,

    titleDescription: {
      [EventType.WEDDING]: `${eventTypeLabel[EventType.WEDDING]} ${
        model.weddingDetail?.groomName
      } & ${model.weddingDetail?.brideName}`,
    }[model.eventType],
  }),
};
