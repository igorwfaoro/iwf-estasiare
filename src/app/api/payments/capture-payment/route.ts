import { NextResponse } from 'next/server';
import { createPaymentService } from '../../../../app-services/payment.service';

const paymentService = createPaymentService();

export async function POST(request: Request) {
  const { orderId } = await request.json();
  const response = await paymentService.capturePayment(orderId);

  return NextResponse.json(response);
}
