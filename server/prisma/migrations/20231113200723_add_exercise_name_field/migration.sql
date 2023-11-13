/*
  Warnings:

  - Added the required column `name` to the `Exercises` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercises" (
    "workoutId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "intensity" TEXT NOT NULL,
    "video" BLOB NOT NULL
);
INSERT INTO "new_Exercises" ("description", "group", "intensity", "video", "workoutId") SELECT "description", "group", "intensity", "video", "workoutId" FROM "Exercises";
DROP TABLE "Exercises";
ALTER TABLE "new_Exercises" RENAME TO "Exercises";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
