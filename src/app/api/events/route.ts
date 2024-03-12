import { NextResponse } from 'next/server';
import {
  CreateUpdateEventParams,
  createEventServerService
} from '../../../services/server/event.server-service';
import { EventCreateInputModel } from '../../../models/input-models/event-create.input-model';

interface Params {}

const eventService = createEventServerService();

export async function POST(req: Request, {}: Params) {
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
}
