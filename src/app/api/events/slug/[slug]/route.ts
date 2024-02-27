import { NextResponse } from 'next/server';
import { createEventServerService } from '../../../../../services/server/event.server-service';
import { ExtraIncludesInputModel } from '../../../../../models/input-models/extra-includes.input-model';

interface Params {
  params: { slug: string };
}

const eventService = createEventServerService();

export async function GET(req: Request, { params }: Params) {
  const { searchParams } = new URL(req.url);

  const extraIncludes: ExtraIncludesInputModel = {
    gifts: Boolean(searchParams.get('gifts')),
    financial: Boolean(searchParams.get('financial')),
    handbooks: Boolean(searchParams.get('handbooks'))
  };

  const event = await eventService.getBySlug(params.slug, extraIncludes);
  return NextResponse.json(event);
}
