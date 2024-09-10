import { PixKeyType } from "@prisma/client";

export interface EventFinancialViewModel {
  id: number;
  paypalBusinessCode: string | null;

  pixType: PixKeyType | null;
  pixKey: string | null;
  pixDescription: string | null;
}
