import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs/promises";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const schoolEmail = formData.get("schoolEmail") as string;
  const Contact = formData.get("Contact") as string;
  const address = formData.get("address") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  const image = formData.get("image") as File;

  if (!name || !address || !image) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Save image to /public/uploads
  const buffer = Buffer.from(await image.arrayBuffer());
  const filename = `${Date.now()}_${image.name}`;
  const uploadPath = path.join(process.cwd(), "public", "uploads", filename);
  await fs.writeFile(uploadPath, buffer);

  // Save school details to DB
  const school = await prisma.school.create({
    data: {
      name,
      schoolEmail,
      Contact,
      address,
      city,
      state,
      imagePath: `/uploads/${filename}`,
    },
  });

  return NextResponse.json({ success: true, school });
}
