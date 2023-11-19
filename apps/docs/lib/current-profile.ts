import { getServerSession } from "next-auth";

import { db } from "./db";
import { options } from "../app/api/auth/[...nextauth]/options";

export const currentProfile = async () => {
  const session = await getServerSession(options);

  if (!session) return null;

  const profile = await db.profile.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  return profile;
};
