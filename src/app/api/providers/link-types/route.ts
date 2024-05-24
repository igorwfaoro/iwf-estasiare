import { NextResponse } from 'next/server';

import { withErrorHandler } from '../../../../errors/error-handler';
import { createProviderLinkTypeServerService } from '../../../../services/server/provider-link-type.server-service';

interface Params {
  params: {};
}

const providerLinkTypeService = createProviderLinkTypeServerService();

export const GET = withErrorHandler(async (_: Request, {}: Params) => {
  const types = await providerLinkTypeService.getAll();
  return NextResponse.json(types);
});
