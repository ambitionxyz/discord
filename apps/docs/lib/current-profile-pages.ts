import { getServerSession } from "next-auth";

import { db } from "./db";
import { options } from "../app/api/auth/[...nextauth]/options";
import { NextApiRequest, NextApiResponse } from "next";

export const currentProfilePages = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, options);

  if (!session) return null;

  const profile = await db.profile.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  return profile;
};
