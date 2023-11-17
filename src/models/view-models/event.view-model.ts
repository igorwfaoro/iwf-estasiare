import { EventType } from '@prisma/client';
import { EventDesignDetailViewModel } from './event-design-detail.view-model';
import { EventFinancialDetailViewModel } from './event-financial-detail.view-model';
import { EventWeddingDetailViewModel } from './event-wedding-detail.view-model';
import { GiftViewModel } from './gift.view-model';

export interface EventViewModel {
  id: number;
  eventType: EventType;
  date: Date;
  slug: string;
  address: string;
  designDetail: EventDesignDetailViewModel;
  financialDetail: EventFinancialDetailViewModel | null;
  weddingDetail: EventWeddingDetailViewModel | null;
  gifts: GiftViewModel[] | undefined;
  createdAt: Date;

  titleDescription: string;
}
