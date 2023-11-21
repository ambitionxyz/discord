"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Modal, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

export const ServerSearch = ({ data }: ServerSearchProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "z" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onSubmit = (e) => {
    console.log(e);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className=" bg-transparent group rounded-md flex items-center border-none gap-x-2 w-full h-8  transition "
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
          Search
        </p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-zinc-800  px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-xs">ctrl</span>Z
        </kbd>
      </button>
      <Modal.Root
        opened={open}
        onClose={() => {
          setOpen(false);
        }}
        centered
        size={600}
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div>
                <Controller
                  name="valueSearch"
                  key="valueSearch"
                  control={form.control}
                  render={({ field }) => (
                    <TextInput
                      variant="unstyled"
                      key={field.name}
                      {...field}
                      leftSection={<Search />}
                      placeholder="Search all chanels and all members..."
                    />
                  )}
                />
              </div>
            </form>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>qwwqw</Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};
