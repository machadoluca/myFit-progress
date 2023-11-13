/*
  Warnings:

  - You are about to drop the column `video` on the `Exercises` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercises" (
    "workoutId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "intensity" TEXT NOT NULL
);
INSERT INTO "new_Exercises" ("description", "group", "intensity", "name", "workoutId") SELECT "description", "group", "intensity", "name", "workoutId" FROM "Exercises";
DROP TABLE "Exercises";
ALTER TABLE "new_Exercises" RENAME TO "Exercises";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
