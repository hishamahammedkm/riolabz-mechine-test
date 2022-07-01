-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_loginId_fkey";

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "password" TEXT;
