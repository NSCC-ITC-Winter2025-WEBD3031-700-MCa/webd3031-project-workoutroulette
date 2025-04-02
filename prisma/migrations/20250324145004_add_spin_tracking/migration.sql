-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isPremium" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "monthlySpins" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "premiumExpiry" TIMESTAMP(3),
ADD COLUMN     "spinResetDate" TIMESTAMP(3);
