-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Threshold" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "multiplier" REAL NOT NULL,
    "notodoId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Threshold_notodoId_fkey" FOREIGN KEY ("notodoId") REFERENCES "Notodo" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Threshold" ("content", "createdAt", "duration", "id", "multiplier", "notodoId", "title", "updatedAt") SELECT "content", "createdAt", "duration", "id", "multiplier", "notodoId", "title", "updatedAt" FROM "Threshold";
DROP TABLE "Threshold";
ALTER TABLE "new_Threshold" RENAME TO "Threshold";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
