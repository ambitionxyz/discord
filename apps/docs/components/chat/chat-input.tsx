"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChatInputProps {
  name: string;
  apiUrl: string;
  query: Record<string, any>;
  type: string;
}

const formSchema = z.object({
  content: z.string().min(1),
});

const ChatInput = ({ name, apiUrl, query, type }: ChatInputProps) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });

      await axios.post(url, value);

      form.reset();
      router.refresh();
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  return (
    <div className="relative p-4 pb-6">
      <button
        type="button"
        onClick={() => {}}
        className=" absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
      >
        <Plus className="text-white dark:text-[#313338]" />
      </button>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-10 px-3 ">
          <Controller
            name="content"
            key="content"
            control={form.control}
            render={({ field }) => (
              <TextInput
                disabled={isLoading}
                variant="filled"
                key={field.name}
                size="md"
                placeholder={`Message ${
                  type === "conversation" ? name : "#" + name
                }`}
                className="!focus:border-none"
                {...field}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
