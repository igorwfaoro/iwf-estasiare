import {
  Event,
  EventDesignDetail,
  EventFinancialDetail,
  EventType,
  EventWeddingDetail,
  Gift,
} from '@prisma/client';
import { EventViewModel } from '../models/view-models/event.view-model';
import { eventDesignDetailConverter } from './event-design-detail.converter';
import { eventFinancialDetailConverter } from './event-financial-detail.converter';
import { eventWeddingDetailConverter } from './event-wedding-detail.converter';
import { eventTypeLabel } from '../util/helpers/event-type.helper';
import { giftConverter } from './gift.converter';

export type EventConverterModel = Event & {
  financialDetail: EventFinancialDetail | null;
  designDetail: EventDesignDetail;
  weddingDetail: EventWeddingDetail | null;
  gifts: Gift[] | undefined;
};

export const eventConverter = {
  modelToViewModel: (model: EventConverterModel): EventViewModel => ({
    id: Number(model.id),
    eventType: model.eventType,
    date: model.date,
    slug: model.slug,
    address: model.address,

    designDetail: eventDesignDetailConverter.modelToViewModel(
      model.designDetail
    ),

    financialDetail: model.financialDetail
      ? eventFinancialDetailConverter.modelToViewModel(model.financialDetail)
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
