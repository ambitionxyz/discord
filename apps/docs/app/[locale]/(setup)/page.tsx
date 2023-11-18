import { redirect } from "next/navigation";
import InitialModal from "../../../components/modals/initial-modal";
import { db } from "../../../lib/db";
import { initialProfile } from "../../../lib/initialProfile";

const Page = async () => {
  const profile = await initialProfile();

  // const server = await db.server.findFirst({
  //   where: {
  //     Members: {
  //       some: {
  //         profileId: profile?.id,
  //       },
  //     },
  //   },
  // });

  // if (server) {
  //   return redirect(`/servers/${server.id}`);
  // }

  return <InitialModal />;
};

export default Page;
