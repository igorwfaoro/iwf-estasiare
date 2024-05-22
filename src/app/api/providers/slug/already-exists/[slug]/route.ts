import { NextResponse } from 'next/server';
import { withErrorHandler } from '../../../../../../errors/error-handler';
import { createProviderServerService } from '../../../../../../services/server/provider.server-service';

interface Params {
  params: { slug: string };
}

const providerService = createProviderServerService();

export const GET = withErrorHandler(
  async (_: Request, { params }: Params) => {
    const response = await providerService.slugAlreadyExists(params.slug);
    return NextResponse.json(response);
  }
);
