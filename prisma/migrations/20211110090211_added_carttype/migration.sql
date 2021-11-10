-- CreateEnum
CREATE TYPE "CartType" AS ENUM ('CART', 'WISHLIST');

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "type" "CartType" NOT NULL DEFAULT E'CART';
