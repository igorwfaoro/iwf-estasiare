import { CreateOrderInputModel } from "../models/input-models/create-order.input-model";

const { CLIENT_ID, APP_SECRET } = {
  CLIENT_ID:
    'AXMtv0BlAc5hNSf9Mhfr5HvFxEcng9qpFxbDtMwzb1q6fZMIsW4_P8v2wtNsgpbTFUL-_2cgADbr-BFr',
  APP_SECRET:
    'EOeZEgPCmSsyza4jO5uHJvFCydZ5aET5WYM5atSDXTT03prKX1MzGwy0bRo4EsrtyvFt40ErdewoQOcw',
};

const baseURL = {
  sandbox: 'https://api-m.sandbox.paypal.com',
  production: 'https://api-m.paypal.com',
};

export const createPaymentService = () => {
  const createOrder = async (input: CreateOrderInputModel) => {
    const accessToken = await generateAccessToken();
    const url = `${baseURL.sandbox}/v2/checkout/orders`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: '100.00',
            },
          },
        ],
      }),
    });
    const data = await response.json();
    return data;
  };

  // use the orders api to capture payment for an order
  const capturePayment = async (orderId: any) => {
    const accessToken = await generateAccessToken();
    const url = `${baseURL.sandbox}/v2/checkout/orders/${orderId}/capture`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data;
  };

  // generate an access token using client id and app secret
  const generateAccessToken = async () => {
    const auth = Buffer.from(CLIENT_ID + ':' + APP_SECRET).toString('base64');
    const response = await fetch(`${baseURL.sandbox}/v1/oauth2/token`, {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    const data = await response.json();
    return data.access_token;
  };

  return {
    createOrder,
    capturePayment,
  };
};
