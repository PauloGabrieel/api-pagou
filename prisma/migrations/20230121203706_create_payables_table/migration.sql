-- CreateTable
CREATE TABLE "payavles" (
    "id" SERIAL NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "userId" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,

    CONSTRAINT "payavles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payavles" ADD CONSTRAINT "payavles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payavles" ADD CONSTRAINT "payavles_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
