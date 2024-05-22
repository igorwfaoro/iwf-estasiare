import { NextResponse } from 'next/server';

import { createProviderCategoryServerService } from '../../../../services/server/provider-category.server-service';
import { withErrorHandler } from '../../../../errors/error-handler';

interface Params {}

const providerCategoryService = createProviderCategoryServerService();

export const GET = withErrorHandler(async (req: Request, {}: Params) => {
  const response = await providerCategoryService.getAll();
  return NextResponse.json(response);
});
