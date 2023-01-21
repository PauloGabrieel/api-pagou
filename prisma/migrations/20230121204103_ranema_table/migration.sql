/*
  Warnings:

  - You are about to drop the `payavles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "payavles" DROP CONSTRAINT "payavles_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "payavles" DROP CONSTRAINT "payavles_userId_fkey";

-- DropTable
DROP TABLE "payavles";

-- CreateTable
CREATE TABLE "payables" (
    "id" SERIAL NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "userId" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,

    CONSTRAINT "payables_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payables" ADD CONSTRAINT "payables_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payables" ADD CONSTRAINT "payables_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
