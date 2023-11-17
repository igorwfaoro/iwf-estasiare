import { EventFinancialDetail } from '@prisma/client';
import { EventFinancialDetailViewModel } from '../models/view-models/event-financial-detail.view-model';

export const eventFinancialDetailConverter = {
  modelToViewModel: (
    model: EventFinancialDetail
  ): EventFinancialDetailViewModel => ({
    id: Number(model.id),
    paypalBusinessCode: model.paypalBusinessCode,
  }),
};
