"use client";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import InitialModal from "../../../components/modals/initial-modal";
import { db } from "../../../lib/db";
import { initialProfile } from "../../../lib/initialProfile";
import { useEffect } from "react";
import axios from "axios";
import { promises } from "dns";

const Page = () => {
  // await initialProfile();
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log(status);
      void signIn();
    } else if (status === "authenticated") {
      console.log({ session });
      (async () => {
        await axios.post("/api/profiles", session?.user);
      })();
      void router.push("/");
    }
  }, [status]);

  return <InitialModal />;
};

export default Page;
