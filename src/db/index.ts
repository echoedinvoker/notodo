import { PrismaClient } from "@prisma/client";

// TODO: create archievement model, which relates to thresholds and rewards
export const db = new PrismaClient();
