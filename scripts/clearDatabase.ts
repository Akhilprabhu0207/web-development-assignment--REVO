import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clearDatabase() {
  await prisma.school.deleteMany();
  console.log("All school records deleted.");
}

clearDatabase().finally(() => prisma.$disconnect());
