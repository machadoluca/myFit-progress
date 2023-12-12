/*
  Warnings:

  - You are about to drop the `Professional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClientsToExercises` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Exercises` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `group` on the `Exercises` table. All the data in the column will be lost.
  - You are about to drop the column `workoutId` on the `Exercises` table. All the data in the column will be lost.
  - The primary key for the `Clients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clientId` on the `Clients` table. All the data in the column will be lost.
  - You are about to drop the column `professionalId` on the `Clients` table. All the data in the column will be lost.
  - The required column `id` was added to the `Exercises` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `muscularGroup` to the `Exercises` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Clients` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "Professional_CPF_key";

-- DropIndex
DROP INDEX "Professional_email_key";

-- DropIndex
DROP INDEX "_ClientsToExercises_B_index";

-- DropIndex
DROP INDEX "_ClientsToExercises_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Professional";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ClientsToExercises";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Treiners" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "careerTime" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Schedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "weekDay" TEXT NOT NULL,
    "editedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientsId" TEXT NOT NULL,
    CONSTRAINT "Schedules_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "Clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ExercisesToSchedules" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ExercisesToSchedules_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercises" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ExercisesToSchedules_B_fkey" FOREIGN KEY ("B") REFERENCES "Schedules" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercises" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "muscularGroup" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "intensity" TEXT NOT NULL
);
INSERT INTO "new_Exercises" ("description", "intensity", "name") SELECT "description", "intensity", "name" FROM "Exercises";
DROP TABLE "Exercises";
ALTER TABLE "new_Exercises" RENAME TO "Exercises";
CREATE TABLE "new_Clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "treinerId" TEXT,
    CONSTRAINT "Clients_treinerId_fkey" FOREIGN KEY ("treinerId") REFERENCES "Treiners" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Clients" ("createdAt", "email", "name", "password") SELECT "createdAt", "email", "name", "password" FROM "Clients";
DROP TABLE "Clients";
ALTER TABLE "new_Clients" RENAME TO "Clients";
CREATE UNIQUE INDEX "Clients_email_key" ON "Clients"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Treiners_email_key" ON "Treiners"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Treiners_CPF_key" ON "Treiners"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "_ExercisesToSchedules_AB_unique" ON "_ExercisesToSchedules"("A", "B");

-- CreateIndex
CREATE INDEX "_ExercisesToSchedules_B_index" ON "_ExercisesToSchedules"("B");
