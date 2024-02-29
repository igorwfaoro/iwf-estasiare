import { NextResponse } from 'next/server';
import { createHandbookServerService } from '../../../../../services/server/handbook.server-service';

interface Params {
  params: { eventId: string };
}

const handbookService = createHandbookServerService();

export async function GET(_: Request, { params }: Params) {
  const gifts = await handbookService.getAllByEvent(Number(params.eventId));

  return NextResponse.json(gifts);
}

export async function POST(req: Request, { params }: Params) {
  const input = await req.json();

  const response = await handbookService.create(Number(params.eventId), input);

  return NextResponse.json(response);
}
