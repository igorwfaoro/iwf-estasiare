-- CreateEnum
CREATE TYPE "PixKeyType" AS ENUM ('CNPJ', 'CPF', 'PHONE', 'EMAIL', 'RANDOM');

-- AlterTable
ALTER TABLE "EventFinancial" ADD COLUMN     "pixDescription" VARCHAR(200),
ADD COLUMN     "pixKey" VARCHAR(200),
ADD COLUMN     "pixType" "PixKeyType";
