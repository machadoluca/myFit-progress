-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercises" (
    "workoutId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "intensity" TEXT NOT NULL,
    "video" BLOB
);
INSERT INTO "new_Exercises" ("description", "group", "intensity", "name", "video", "workoutId") SELECT "description", "group", "intensity", "name", "video", "workoutId" FROM "Exercises";
DROP TABLE "Exercises";
ALTER TABLE "new_Exercises" RENAME TO "Exercises";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
