import { NextResponse } from 'next/server';

import { withErrorHandler } from '../../../../errors/error-handler';
import { createProviderLinkServerService } from '../../../../services/server/provider-link.server-service';

interface Params {
  params: {};
}

const providerLinkService = createProviderLinkServerService();

export const GET = withErrorHandler(async (_: Request, {}: Params) => {
  const links = await providerLinkService.getAllByProvider();
  return NextResponse.json(links);
});

export const POST = withErrorHandler(async (req: Request, {}: Params) => {
  const input = await req.json();
  const response = await providerLinkService.create(input);
  return NextResponse.json(response);
});
