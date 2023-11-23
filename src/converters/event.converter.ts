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
import { EventBySlugViewModel } from '../models/view-models/event-by-slug.view-model';
import { eventWeddingDetailConverter } from './event-wedding-detail.converter';
import { eventTypeLabel } from '../util/helpers/event-type.helper';
import { giftConverter } from './gift.converter';
import { eventAddressConverter } from './event-address.converter';
import {
  EventContentConverterModel,
  eventContentConverter,
} from './event-content.converter';
import { eventFinancialConverter } from './event-financial.converter';
import { EventViewModel } from '../models/view-models/event.view-model';

export type EventConverterModel = Event & {
  content?: EventContentConverterModel;
  address?: EventAddress;
  financial?: EventFinancial | null;
  weddingDetail?: EventWeddingDetail | null;
  gifts?: Gift[];
};

export const eventConverter = {
  modelToSlugViewModel: (
    model: EventConverterModel,
    { hasGifts, hasInvitations }: { hasGifts: boolean; hasInvitations: boolean }
  ): EventBySlugViewModel => ({
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
      : undefined,

    weddingDetail: model.weddingDetail
      ? eventWeddingDetailConverter.modelToViewModel(model.weddingDetail)
      : undefined,

    gifts: model.gifts?.map(giftConverter.modelToViewModel),

    createdAt: model.createdAt,

    titleDescription: {
      [EventType.WEDDING]: `${eventTypeLabel[EventType.WEDDING]} ${
        model.weddingDetail?.groomName
      } & ${model.weddingDetail?.brideName}`,
    }[model.eventType],

    hasGifts,
    hasInvitations,
  }),

  modelViewModel: (model: EventConverterModel): EventViewModel => ({
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
      : undefined,

    weddingDetail: model.weddingDetail
      ? eventWeddingDetailConverter.modelToViewModel(model.weddingDetail)
      : undefined,

    createdAt: model.createdAt,

    titleDescription: {
      [EventType.WEDDING]: `${eventTypeLabel[EventType.WEDDING]} ${
        model.weddingDetail?.groomName
      } & ${model.weddingDetail?.brideName}`,
    }[model.eventType],
  }),
};
