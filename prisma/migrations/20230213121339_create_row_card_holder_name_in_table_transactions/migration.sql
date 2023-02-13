/*
  Warnings:

  - Added the required column `cardHolderName` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "cardHolderName" VARCHAR(50) NOT NULL;
