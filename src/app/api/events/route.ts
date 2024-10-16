import { NextResponse } from 'next/server';

import { withErrorHandler } from '../../../errors/error-handler';
import { EventCreateInputModel } from '../../../models/input-models/event-create.input-model';
import {
  CreateUpdateEventParams,
  createEventServerService
} from '../../../services/server/event.server-service';

interface Params {}

const eventService = createEventServerService();

export const POST = withErrorHandler(async (req: Request, {}: Params) => {
  const formData = await req.formData();

  const params: CreateUpdateEventParams<EventCreateInputModel> = {
    inputData: JSON.parse(formData.get('data') as string),
    inputFiles: {
      fileBannerImage: formData.get('fileBannerImage') as File | undefined,
      fileLogoImage: formData.get('fileLogoImage') as File | undefined
    }
  };

  const response = await eventService.create(params);

  return NextResponse.json(response);
});
