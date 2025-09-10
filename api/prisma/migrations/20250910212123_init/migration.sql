/*
  Warnings:

  - You are about to drop the column `summary` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserCategoryBudget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."UserCategoryBudget" DROP CONSTRAINT "UserCategoryBudget_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserCategoryBudget" DROP CONSTRAINT "UserCategoryBudget_userId_fkey";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "summary",
ALTER COLUMN "fullName" DROP NOT NULL;

-- DropTable
DROP TABLE "public"."UserCategoryBudget";
