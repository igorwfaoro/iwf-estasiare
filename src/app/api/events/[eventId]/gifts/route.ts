import { NextResponse } from 'next/server';

import { withErrorHandler } from '../../../../../errors/error-handler';
import {
  CreateUpdateGiftParams,
  createGiftServerService
} from '../../../../../services/server/gift.server-service';

interface Params {
  params: { eventId: string };
}

const giftService = createGiftServerService();

export const GET = withErrorHandler(async (_: Request, { params }: Params) => {
  const gifts = await giftService.getAllByEvent(Number(params.eventId));
  return NextResponse.json(gifts);
});

export const POST = withErrorHandler(
  async (req: Request, { params }: Params) => {
    const formData = await req.formData();

    const inputParams: CreateUpdateGiftParams<GiftInputModel> = {
      inputData: JSON.parse(formData.get('data') as string),
      inputFiles: {
        fileImage: formData.get('fileImage') as File
      }
    };

    const response = await giftService.create(
      Number(params.eventId),
      inputParams
    );

    return NextResponse.json(response);
  }
);
