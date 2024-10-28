/*
  Warnings:

  - You are about to drop the column `notes` on the `Challenge` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "ChallengeNote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "challengeId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ChallengeNote_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Challenge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "notodoId" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Challenge_notodoId_fkey" FOREIGN KEY ("notodoId") REFERENCES "Notodo" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Challenge" ("createdAt", "endTime", "id", "notodoId", "startTime", "updatedAt") SELECT "createdAt", "endTime", "id", "notodoId", "startTime", "updatedAt" FROM "Challenge";
DROP TABLE "Challenge";
ALTER TABLE "new_Challenge" RENAME TO "Challenge";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
