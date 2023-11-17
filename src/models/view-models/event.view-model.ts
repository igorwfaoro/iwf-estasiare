import { EventType } from '@prisma/client';
import { EventDesignDetailViewModel } from './event-design-detail.view-model';
import { EventFinancialDetailViewModel } from './event-financial-detail.view-model';
import { EventWeddingDetailViewModel } from './event-wedding-detail.view-model';

export interface EventViewModel {
  id: number;
  eventType: EventType;
  date: Date;
  slug: string;
  address: string;
  designDetail: EventDesignDetailViewModel;
  financialDetail: EventFinancialDetailViewModel | null;
  weddingDetail: EventWeddingDetailViewModel | null;
  createdAt: Date;
}
