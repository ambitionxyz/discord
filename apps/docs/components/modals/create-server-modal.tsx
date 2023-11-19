"use client";

import { Modal } from "@mantine/core";
import { useModal } from "../../hooks/use-modal-store";

export const CreateServerModal = () => {
  const { isOpen, type, onClose } = useModal();
  const isModelOpen = isOpen && type === "createServer";

  return (
    <Modal opened={isModelOpen} onClose={onClose} centered>
      demo
    </Modal>
  );
};
