import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { db } from "../../../lib/db";
import InitialModal from "../../../components/modals/initial-modal";
import { initialProfile } from "../../../lib/initialProfile";
import { options } from "../../api/auth/[...nextauth]/options";

const Page = async () => {
  const session = await getServerSession(options);
  if (!session) {
    return redirect("/login");
  }

  const profile = await initialProfile(session);

  const server = await db.server.findFirst({
    where: {
      Members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
};

export default Page;
