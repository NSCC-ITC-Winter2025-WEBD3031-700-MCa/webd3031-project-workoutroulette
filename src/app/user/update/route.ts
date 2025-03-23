import { auth } from "@/auth";
import { prisma } from "@/utils/prismaDB";
import { writeFile } from "fs/promises";
import { v4 as uuid } from "uuid";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const aboutMe = formData.get("aboutMe") as string;
  const image = formData.get("image") as File | null;

  let imageUrl: string | undefined;

  if (image) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${uuid()}-${image.name}`;
    const filepath = path.join(process.cwd(), "public/uploads", filename);
    await writeFile(filepath, buffer);
    imageUrl = `/uploads/${filename}`;
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      aboutMe,
      ...(imageUrl && { image: imageUrl }),
    },
  });

  return NextResponse.json({ success: true });
}
