-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Clients" (
    "clientId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "professionalId" TEXT,
    CONSTRAINT "Clients_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional" ("proId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Clients" ("clientId", "createdAt", "email", "name", "password", "professionalId") SELECT "clientId", "createdAt", "email", "name", "password", "professionalId" FROM "Clients";
DROP TABLE "Clients";
ALTER TABLE "new_Clients" RENAME TO "Clients";
CREATE UNIQUE INDEX "Clients_email_key" ON "Clients"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
