-- CreateTable
CREATE TABLE "Threshold" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "notodoId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Threshold_notodoId_fkey" FOREIGN KEY ("notodoId") REFERENCES "Notodo" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
