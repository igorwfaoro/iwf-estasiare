import { NextResponse } from 'next/server';
import { createPaymentService } from '../../../../app-services/payment.service';

const paymentService = createPaymentService();

export async function POST(req: Request) {
  const response = await paymentService.createOrder(await req.json());
  return NextResponse.json(response);
}
