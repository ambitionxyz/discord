"use client";
import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDisclosure } from "@mantine/hooks";

import classes from "./Initial-modal.module.css";
import { UploadButton } from "../../lib/uploadthing";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Sever name is required",
  }),
  imageUrl: z.string().min(1, {
    message: "Image URL is required",
  }),
});

const InitialModal = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [opened, { toggle, close }] = useDisclosure(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  if (!isMounted) return null;

  return (
    <>
      <div className={classes.demo}> 1123</div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <UploadButton
          endpoint="serverImage"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </main>
    </>
  );
};

export default InitialModal;
