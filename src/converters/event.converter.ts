import {
  Event,
  EventContactInfo,
  EventFinancial,
  EventGiftRegistry,
  EventHandbook,
  EventType,
  EventWeddingDetail,
  Gift,
  GiftRegistry
} from '@prisma/client';
import dayjs from 'dayjs';

import { EventDetailViewModel } from '../models/view-models/event-detail.view-model';
import { EventViewModel } from '../models/view-models/event.view-model';
import { eventTitleDescription } from '../util/helpers/event-title-description.helper';
import { eventTypeLabel } from '../util/helpers/event-type.helper';
import { eventContactInfoConverter } from './event-contact-info.converter';
import {
  EventContentConverterModel,
  eventContentConverter
} from './event-content.converter';
import { eventFinancialConverter } from './event-financial.converter';
import { eventHandbookConverter } from './event-handbook.converter';
import { eventWeddingDetailConverter } from './event-wedding-detail.converter';
import { giftRegistryConverter } from './gift-registry.converter';
import { giftConverter } from './gift.converter';

export type EventConverterModel = Event & {
  content?: EventContentConverterModel;
  financial?: EventFinancial;
  gifts?: Gift[];
  handbooks?: EventHandbook[] | null;
  contactInfo?: EventContactInfo;
  weddingDetail?: EventWeddingDetail | null;
  eventGiftRegistries?:
    | (EventGiftRegistry & { giftRegistry?: GiftRegistry | null })[]
    | null;
};

interface EventDetailInclude {
  hasGifts: boolean;
  hasInvitations: boolean;
  hasHandbooks: boolean;
}

export const eventConverter = {
  modelDetailViewModel: (
    model: EventConverterModel,
    { hasGifts, hasInvitations, hasHandbooks }: EventDetailInclude
  ): EventDetailViewModel => ({
    id: Number(model.id),
    eventType: model.eventType,
    date: dayjs(model.date).toISOString(),
    address: model.address,
    slug: model.slug,

    content: model.content
      ? eventContentConverter.modelToViewModel(model.content)
      : undefined,

    financial: model.financial
      ? eventFinancialConverter.modelToViewModel(model.financial)
      : undefined,

    gifts: model.gifts?.map(giftConverter.modelToViewModel),

    handbooks: model.handbooks?.map(eventHandbookConverter.modelToViewModel),

    contactInfo: model.contactInfo
      ? eventContactInfoConverter.modelToViewModel(model.contactInfo)
      : undefined,

    createdAt: dayjs(model.createdAt).toISOString(),

    weddingDetail: model.weddingDetail
      ? eventWeddingDetailConverter.modelToViewModel(model.weddingDetail)
      : undefined,

    titleDescription: eventTitleDescription(model),

    hasGifts,
    hasInvitations,
    hasHandbooks,

    giftRegistries: model.eventGiftRegistries?.map((gr) =>
      giftRegistryConverter.modelToViewModel(gr.giftRegistry!)
    )
  }),

  modelViewModel: (model: EventConverterModel): EventViewModel => ({
    id: Number(model.id),
    eventType: model.eventType,
    date: dayjs(model.date).toISOString(),
    address: model.address,
    slug: model.slug,

    content: model.content
      ? eventContentConverter.modelToViewModel(model.content)
      : undefined,

    financial: model.financial
      ? eventFinancialConverter.modelToViewModel(model.financial)
      : undefined,

    weddingDetail: model.weddingDetail
      ? eventWeddingDetailConverter.modelToViewModel(model.weddingDetail)
      : undefined,

    createdAt: dayjs(model.createdAt).toISOString(),

    titleDescription: {
      [EventType.WEDDING]: `${eventTypeLabel[EventType.WEDDING]} ${
        model.weddingDetail?.groomName
      } & ${model.weddingDetail?.brideName}`
    }[model.eventType]
  })
};
