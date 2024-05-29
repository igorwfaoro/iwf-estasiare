import { NextResponse } from 'next/server';
import { headerUserPublicIpv4 } from '../../../constants/headers';
import { withErrorHandler } from '../../../errors/error-handler';
import { ProviderInputModel } from '../../../models/input-models/provider.input-model';
import {
  CreateUpdateProviderParams,
  createProviderServerService
} from '../../../services/server/provider.server-service';
import { getSearchParamValue } from '../../../util/helpers/http.helper';

interface Params {}

const providerService = createProviderServerService();

export const POST = withErrorHandler(async (req: Request, {}: Params) => {
  const formData = await req.formData();

  const inputParams: CreateUpdateProviderParams<ProviderInputModel> = {
    inputData: JSON.parse(formData.get('data') as string),
    inputFiles: {
      profileImage: formData.get('profileImage') as File
    }
  };

  const response = await providerService.create(inputParams);

  return NextResponse.json(response);
});

export const PUT = withErrorHandler(async (req: Request, {}: Params) => {
  const formData = await req.formData();

  const inputParams: CreateUpdateProviderParams<Partial<ProviderInputModel>> = {
    inputData: JSON.parse(formData.get('data') as string),
    inputFiles: {
      profileImage: formData.get('profileImage') as File
    }
  };

  const response = await providerService.update(inputParams);

  return NextResponse.json(response);
});

export const GET = withErrorHandler(async (req: Request, {}: Params) => {
  const { searchParams } = new URL(req.url);

  const userPublicIpv4 = req.headers.get(headerUserPublicIpv4);

  const response = await providerService.search(
    {
      query: getSearchParamValue('q', 'string', searchParams),
      index: getSearchParamValue('index', 'number', searchParams),
      limit: getSearchParamValue('limit', 'number', searchParams),
      city: getSearchParamValue('city', 'string', searchParams),
      providerCategories: getSearchParamValue(
        'providerCategories',
        'arrayOfNumbers',
        searchParams
      )
    },
    userPublicIpv4 || undefined
  );

  return NextResponse.json(response);
});
