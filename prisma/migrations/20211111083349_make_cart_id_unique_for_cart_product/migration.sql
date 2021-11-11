/*
  Warnings:

  - A unique constraint covering the columns `[cartId]` on the table `CartProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CartProduct_cartId_key" ON "CartProduct"("cartId");
