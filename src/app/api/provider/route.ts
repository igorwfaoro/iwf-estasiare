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

// export async function PUT(req: Request, { params }: Params) {
//   const formData = await req.formData();

//   const inputParams: CreateUpdateGiftParams<Partial<GiftInputModel>> = {
//     inputData: JSON.parse(formData.get('data') as string),
//     inputFiles: {
//       fileImage: formData.get('fileImage') as File
//     }
//   };

//   const gift = await giftService.update({
//     eventId: Number(params.eventId),
//     id: Number(params.giftId),
//     inputParams
//   });

//   return NextResponse.json(gift);
// }
