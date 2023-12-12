/*
  Warnings:

  - You are about to drop the column `clientsId` on the `Schedules` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Schedules` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "weekDay" TEXT NOT NULL,
    "editedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" TEXT NOT NULL,
    CONSTRAINT "Schedules_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Schedules" ("editedAt", "id", "weekDay") SELECT "editedAt", "id", "weekDay" FROM "Schedules";
DROP TABLE "Schedules";
ALTER TABLE "new_Schedules" RENAME TO "Schedules";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
