"use client";
import { redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { db } from "../../lib/db";
import InitialModal from "../../components/modals/initial-modal";
import { data } from "autoprefixer";

const Page = async () => {
  const { data: session } = useSession();

  if (!session) {
    return redirect(`/login`);
  }
  console.log(session);

  // const server = await db.server.findFirst({
  //   where: {
  //     Members: {
  //       some: {
  //         profileId: profile.id,
  //       },
  //     },
  //   },
  // });

  // console.log("SEVER: ", server);

  // if (server) {
  //   return redirect(`/servers/${server.id}`);
  // }

  return <InitialModal />;
};

export default Page;
