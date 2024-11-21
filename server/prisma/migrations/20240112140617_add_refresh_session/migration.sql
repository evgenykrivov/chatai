/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `users` table. All the data in the column will be lost.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MODER', 'USER');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "refreshToken",
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "refresh_sessions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,

    CONSTRAINT "refresh_sessions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "refresh_sessions" ADD CONSTRAINT "refresh_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
