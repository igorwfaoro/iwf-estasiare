import { EventFinancial } from '@prisma/client';
import { EventFinancialViewModel } from '../models/view-models/event-financial.view-model';

export type EventFinancialConverterModel = EventFinancial & {};

export const eventFinancialConverter = {
  modelToViewModel: (
    model: EventFinancialConverterModel
  ): EventFinancialViewModel => ({
    id: Number(model.id),
    paypalBusinessCode: model.paypalBusinessCode
  })
};
