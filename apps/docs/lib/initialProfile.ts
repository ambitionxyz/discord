import { v4 as uuidv4 } from "uuid";
import { Session, getServerSession } from "next-auth";

import { db } from "./db";
import { options } from "../app/api/auth/[...nextauth]/options";

export const initialProfile = async (session: Session) => {
  if (!session?.user) {
    return;
  }

  const profile = await db.profile.findUnique({
    where: {
      email: session.user.email as string,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: uuidv4(),
      name: session.user.name as string,
      imageUrl: session.user.image as string,
      email: session.user.email as string,
    },
  });

  return newProfile;
};
