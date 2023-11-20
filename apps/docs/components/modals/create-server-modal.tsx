"use client";

import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, Modal, Text, TextInput } from "@mantine/core";
import { FileUpload } from "../file-upload";
import classes from "./Initial-modal.module.css";
import { useModal } from "../../hooks/use-modal-store";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Sever name is required",
  }),
  imageUrl: z.string().min(1, {
    message: "Image URL is required",
  }),
});

const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "createServer";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/servers", values);
      form.reset();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal.Root
      opened={isModalOpen}
      onClose={handleClose}
      centered
      className={classes.modal}
      size={600}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header className={classes.header}>
          <Modal.Title className={classes.title}>
            Customize your service
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body className={classes.body}>
          <Text className={classes.description}>
            Give your server a persion with a name and an image. You can always
            change it later
          </Text>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-10 px-6">
              <div className="flex items-center justify-center text-center">
                <Controller
                  name="imageUrl"
                  key="imageUrl"
                  control={form.control}
                  render={({ field }) => (
                    <FileUpload
                      endpoint="serverImage"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
              <Controller
                name="name"
                key="name"
                control={form.control}
                render={({ field }) => (
                  <TextInput
                    key={field.name}
                    {...field}
                    label="Sever name"
                    placeholder="Enter sever name"
                    required
                  />
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="mr-6">
                Create
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default CreateServerModal;
