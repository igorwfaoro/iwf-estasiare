import { NextResponse } from 'next/server';
import {
  CreateUpdateEventParams,
  createEventServerService
} from '../../../../services/server/event.server-service';
import { EventUpdateInputModel } from '../../../../models/input-models/event-update.input-model';

interface Params {
  params: { eventId: string };
}

const eventService = createEventServerService();

export async function GET(_: Request, { params }: Params) {
  const event = await eventService.getById(Number(params.eventId));

  return NextResponse.json(event);
}

export async function PUT(req: Request, { params }: Params) {
  const formData = await req.formData();

  const inputParams: CreateUpdateEventParams<EventUpdateInputModel> = {
    inputData: JSON.parse(formData.get('data') as string),
    inputFiles: {
      fileBannerImage: formData.get('fileBannerImage') as File | undefined,
      fileLogoImage: formData.get('fileLogoImage') as File | undefined
    }
  };

  const event = await eventService.update(Number(params.eventId), inputParams);

  return NextResponse.json(event);
}
