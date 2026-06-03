/*
  Warnings:

  - A unique constraint covering the columns `[firstName,lastName]` on the table `Politician` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Politician_firstName_lastName_key" ON "Politician"("firstName", "lastName");
