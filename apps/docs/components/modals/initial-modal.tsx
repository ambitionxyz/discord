"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useDisclosure } from "@mantine/hooks";
import {
  Dialog,
  Group,
  Button,
  TextInput,
  Text,
  Grid,
  Input,
  Alert,
  Box,
  Notification,
} from "@mantine/core";

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

  return <></>;
};

export default InitialModal;
