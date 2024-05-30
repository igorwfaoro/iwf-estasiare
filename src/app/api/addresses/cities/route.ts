import { NextResponse } from 'next/server';

import { withErrorHandler } from '../../../../errors/error-handler';
import { createAddressServerService } from '../../../../services/server/address.server-service';

interface Params {}

const addressService = createAddressServerService();

export const GET = withErrorHandler(async (req: Request, {}: Params) => {
  const response = await addressService.getAllCities();
  return NextResponse.json(response);
});
