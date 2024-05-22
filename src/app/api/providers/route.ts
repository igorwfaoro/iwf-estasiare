import { NextResponse } from 'next/server';
import { withErrorHandler } from '../../../errors/error-handler';
import { ProviderInputModel } from '../../../models/input-models/provider.input-model';
import {
  CreateUpdateProviderParams,
  createProviderServerService
} from '../../../services/server/provider.server-service';

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
