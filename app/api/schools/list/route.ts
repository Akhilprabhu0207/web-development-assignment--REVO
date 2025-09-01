import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const schools = await prisma.school.findMany({ orderBy: { id: "desc" } });
  return NextResponse.json({ schools });
}
