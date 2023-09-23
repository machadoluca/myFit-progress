/*
  Warnings:

  - Added the required column `CPF` to the `Professional` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Professional" (
    "proId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "professionTime" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Professional" ("createdAt", "email", "name", "password", "proId", "professionTime") SELECT "createdAt", "email", "name", "password", "proId", "professionTime" FROM "Professional";
DROP TABLE "Professional";
ALTER TABLE "new_Professional" RENAME TO "Professional";
CREATE UNIQUE INDEX "Professional_email_key" ON "Professional"("email");
CREATE UNIQUE INDEX "Professional_CPF_key" ON "Professional"("CPF");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
