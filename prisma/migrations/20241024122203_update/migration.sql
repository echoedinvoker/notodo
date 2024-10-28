/*
  Warnings:

  - Added the required column `activeAt` to the `Notodo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notodo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "activeAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Notodo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Notodo" ("content", "createdAt", "id", "title", "updatedAt", "userId") SELECT "content", "createdAt", "id", "title", "updatedAt", "userId" FROM "Notodo";
DROP TABLE "Notodo";
ALTER TABLE "new_Notodo" RENAME TO "Notodo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
