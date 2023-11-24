"use client";

import { useState } from "react";
import { Button, Input, Modal } from "@mantine/core";
import { Check, Copy, RefreshCw } from "lucide-react";

import { useModal } from "../../hooks/use-modal-store";

import axios from "axios";

const InviteModal = () => {
  const { data, isOpen, onClose, type, onOpen } = useModal();

  const isModalOpen = isOpen && type === "invite";
  const { server } = data;

  const [copied, setCopied] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );

      onOpen("invite", { server: response.data });
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
          <Modal.Title className="!text-2xl !text-center !font-bold">
            Invite Friends
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <div className="p-6">
            <label
              className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70
            "
            >
              Sever invite link
            </label>
            <div className="flex items-center mt-2 gap-x-2 w-full">
              <Input
                radius="md"
                disabled={isLoading}
                className=" !w-full border-0 !focus-visible:ring-0 !text-black !focus-visible:ring-offset-0"
                value={inviteUrl}
              />
              <Button
                disabled={isLoading}
                onClick={onCopy}
                size="icon"
                className="!bg-[#373a40]"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <Button
              onClick={onNew}
              disabled={isLoading}
              variant="link"
              size="sm"
              className="!text-xs !text-zinc-500 !mt-4 !bg-transparent"
            >
              Generate a new link
              <RefreshCw className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default InviteModal;
