/*
  Warnings:

  - You are about to drop the column `muscularGroup` on the `Exercises` table. All the data in the column will be lost.
  - Added the required column `group` to the `Exercises` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercises" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "intensity" TEXT NOT NULL,
    "videoUrl" TEXT
);
INSERT INTO "new_Exercises" ("description", "id", "intensity", "name", "videoUrl") SELECT "description", "id", "intensity", "name", "videoUrl" FROM "Exercises";
DROP TABLE "Exercises";
ALTER TABLE "new_Exercises" RENAME TO "Exercises";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
