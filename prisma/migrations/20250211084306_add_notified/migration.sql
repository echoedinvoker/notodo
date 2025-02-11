-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "notified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Reward" ADD COLUMN     "notified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Threshold" ADD COLUMN     "notified" BOOLEAN NOT NULL DEFAULT false;
