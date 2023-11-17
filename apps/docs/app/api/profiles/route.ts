import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log(data);

    const profile = await db.profile.findUnique({
      where: {
        email: data.email,
      },
    });

    if (profile) {
      return new NextResponse("Project is existing", { status: 400 });
    }

    const newProfile = await db.profile.create({
      data: {
        userId: uuidv4(),
        name: data.name,
        imageUrl: data.image,
        email: data.email,
      },
    });
    return NextResponse.json(newProfile);
  } catch (error) {
    console.log("PROFILE_POST", error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
