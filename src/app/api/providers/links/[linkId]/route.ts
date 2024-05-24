import { NextResponse } from 'next/server';
import { withErrorHandler } from '../../../../../errors/error-handler';
import { createProviderLinkServerService } from '../../../../../services/server/provider-link.server-service';

interface Params {
  params: { linkId: string };
}

const providerLinkService = createProviderLinkServerService();

export const PUT = withErrorHandler(
  async (req: Request, { params }: Params) => {
    const input = await req.json();

    const link = await providerLinkService.update(Number(params.linkId), input);

    return NextResponse.json(link);
  }
);

export const DELETE = withErrorHandler(
  async (_: Request, { params }: Params) => {
    await providerLinkService.remove(Number(params.linkId));

    return NextResponse.json({ ok: true });
  }
);
