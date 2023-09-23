-- CreateTable
CREATE TABLE "Professional" (
    "proId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "professionTime" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Clients" (
    "clientId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "professionalId" TEXT NOT NULL,
    CONSTRAINT "Clients_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional" ("proId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Exercises" (
    "workoutId" TEXT NOT NULL PRIMARY KEY,
    "group" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "intensity" TEXT NOT NULL,
    "video" BLOB NOT NULL
);

-- CreateTable
CREATE TABLE "_ClientsToExercises" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ClientsToExercises_A_fkey" FOREIGN KEY ("A") REFERENCES "Clients" ("clientId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ClientsToExercises_B_fkey" FOREIGN KEY ("B") REFERENCES "Exercises" ("workoutId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Professional_email_key" ON "Professional"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_email_key" ON "Clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ClientsToExercises_AB_unique" ON "_ClientsToExercises"("A", "B");

-- CreateIndex
CREATE INDEX "_ClientsToExercises_B_index" ON "_ClientsToExercises"("B");
