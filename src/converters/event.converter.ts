import {
  Event,
  EventDesignDetail,
  EventFinancialDetail,
  EventWeddingDetail,
} from '@prisma/client';
import { EventViewModel } from '../models/view-models/event.view-model';
import { eventDesignDetailConverter } from './event-design-detail.converter';

export type EventConverterModel = Event & {
  financialDetail: EventFinancialDetail | null;
  designDetail: EventDesignDetail;
  weddingDetail: EventWeddingDetail | null;
};

export const eventDetailConverter = {
  modelToViewModel: (model: EventConverterModel): EventViewModel => ({
    id: Number(model.id),
    eventType: model.eventType,
    date: model.date,
    slug: model.slug,
    address: model.address,
    designDetail: model.designDetail
      ? eventDesignDetailConverter.modelToViewModel(model.designDetail)
      : null,
  }),
};
