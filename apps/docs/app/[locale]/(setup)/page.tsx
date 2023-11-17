"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import InitialModal from "../../../components/modals/initial-modal";

const Page = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log(status);
      void signIn();
    } else if (status === "authenticated") {
      void router.push("/");
    }
  }, [status]);

  return <InitialModal />;
};

export default Page;
