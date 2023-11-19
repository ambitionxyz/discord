import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "../../../lib/db";
import { MemberRole } from "@prisma/client";
import { currentProfile } from "../../../lib/current-profile";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        Channels: {
          create: [
            {
              name: "general",
              profileId: profile.id,
            },
          ],
        },
        Members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVERS+POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
