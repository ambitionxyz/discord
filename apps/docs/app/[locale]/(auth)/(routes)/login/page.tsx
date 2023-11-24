"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Page() {
  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      void signIn();
    } else if (status === "authenticated") {
      void router.push("/");
    }
  }, [status]);

  return <></>;
}
