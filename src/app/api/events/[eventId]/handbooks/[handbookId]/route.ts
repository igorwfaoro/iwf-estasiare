import { NextResponse } from 'next/server';
import { createHandbookServerService } from '../../../../../../services/server/handbook.server-service';

interface Params {
  params: { eventId: string; handbookId: string };
}

const handbookService = createHandbookServerService();

export async function GET(_: Request, { params }: Params) {
  const handbook = await handbookService.getById(Number(params.handbookId));

  return NextResponse.json(handbook);
}
