/*
  Warnings:

  - You are about to drop the column `careerTime` on the `Treiners` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Treiners" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Treiners" ("CPF", "createdAt", "email", "id", "name", "password") SELECT "CPF", "createdAt", "email", "id", "name", "password" FROM "Treiners";
DROP TABLE "Treiners";
ALTER TABLE "new_Treiners" RENAME TO "Treiners";
CREATE UNIQUE INDEX "Treiners_email_key" ON "Treiners"("email");
CREATE UNIQUE INDEX "Treiners_CPF_key" ON "Treiners"("CPF");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
