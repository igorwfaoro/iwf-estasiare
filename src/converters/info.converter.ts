import { Info } from '@prisma/client';
import { InfoViewModel } from '../models/view-models/info.view-model';
import dayjs from 'dayjs';

export const infoConverter = {
  modelToViewModel: (model: Info): InfoViewModel => ({
    id: Number(model.id),
    brideName: model.brideName,
    groomName: model.groomName,
    weddingDate: dayjs(model.weddingDate).toISOString(),
    weddingAddressDescription: model.weddingAddressDescription,
  }),
};
