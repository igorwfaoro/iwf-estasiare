import { NextResponse } from 'next/server';

import { createProviderCategoryServerService } from '../../../../services/server/provider-category.server-service';

interface Params {}

const providerCategoryService = createProviderCategoryServerService();

export async function GET(req: Request, {}: Params) {
  const response = await providerCategoryService.getAll();
  return NextResponse.json(response);
}
