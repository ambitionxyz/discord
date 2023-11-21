"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal } from "@mantine/core";

import { useModal } from "../../hooks/use-modal-store";

const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const router = useRouter();

  const { server } = data;

  const isModalOpen = isOpen && type === "deleteServer";

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/servers/${server?.id}`);

      onClose();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal.Root opened={isModalOpen} onClose={onClose} centered size={600}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header className="!pt-8 !px-6">
          <Modal.Title className="!text-2xl !font-bold ">
            Delete Server
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to do this?
          <br />
          <span className="font-semibold text-indigo-500 ">{server?.name}</span>
          will be permanetly deleted. ?
        </Modal.Body>
        <div className=" bg-zinc-800/20 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isLoading}
              onClick={onClose}
              variant="transparent"
            >
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={onClick} variant="outline">
              Confirm
            </Button>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};

export default DeleteServerModal;
