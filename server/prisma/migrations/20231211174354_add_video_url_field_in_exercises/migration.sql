/*
  Warnings:

  - Added the required column `videoUrl` to the `Exercises` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercises" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "muscularGroup" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "intensity" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL
);
INSERT INTO "new_Exercises" ("description", "id", "intensity", "muscularGroup", "name") SELECT "description", "id", "intensity", "muscularGroup", "name" FROM "Exercises";
DROP TABLE "Exercises";
ALTER TABLE "new_Exercises" RENAME TO "Exercises";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
