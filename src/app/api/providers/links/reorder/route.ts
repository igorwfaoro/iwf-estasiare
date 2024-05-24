import { NextResponse } from 'next/server';
import { withErrorHandler } from '../../../../../errors/error-handler';
import { createProviderLinkServerService } from '../../../../../services/server/provider-link.server-service';

interface Params {
  params: { linkId: string };
}

const providerLinkService = createProviderLinkServerService();

export const PATCH = withErrorHandler(async (req: Request, {}: Params) => {
  const input = await req.json();

  const result = await providerLinkService.reorder(input);

  return NextResponse.json(result);
});
