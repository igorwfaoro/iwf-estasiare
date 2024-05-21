import { NextResponse } from 'next/server';
import { ProviderInputModel } from '../../../models/input-models/provider.input-model';
import {
  CreateUpdateProviderParams,
  createProviderServerService
} from '../../../services/server/provider.server-service';

interface Params {}

const providerService = createProviderServerService();

export async function POST(req: Request, {}: Params) {
  const formData = await req.formData();

  const inputParams: CreateUpdateProviderParams<ProviderInputModel> = {
    inputData: JSON.parse(formData.get('data') as string),
    inputFiles: {
      profileImage: formData.get('profileImage') as File
    }
  };

  const response = await providerService.create(inputParams);

  return NextResponse.json(response);
}

export async function PUT(req: Request, {}: Params) {
  const formData = await req.formData();

  const inputParams: CreateUpdateProviderParams<Partial<ProviderInputModel>> = {
    inputData: JSON.parse(formData.get('data') as string),
    inputFiles: {
      profileImage: formData.get('profileImage') as File
    }
  };

  const response = await providerService.update(inputParams);

  return NextResponse.json(response);
}
