"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isMount, setIsMounted] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <div>INITIAL</div>;
};

export default Page;
