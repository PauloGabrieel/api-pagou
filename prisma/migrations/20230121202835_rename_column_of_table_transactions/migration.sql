/*
  Warnings:

  - You are about to drop the column `payday` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `transactions` table. All the data in the column will be lost.
  - You are about to alter the column `description` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `cardIssuer` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardLastDigits` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valeu` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('paid', 'waiting_funds');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('debit_card', 'credit_card');

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_userId_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "payday",
DROP COLUMN "userId",
DROP COLUMN "value",
ADD COLUMN     "cardIssuer" VARCHAR(50) NOT NULL,
ADD COLUMN     "cardLastDigits" VARCHAR(4) NOT NULL,
ADD COLUMN     "paymentMethod" "CardType" NOT NULL,
ADD COLUMN     "valeu" INTEGER NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255);

-- DropEnum
DROP TYPE "paymentStatus";
