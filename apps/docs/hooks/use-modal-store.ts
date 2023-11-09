import { create } from "zustand";
import { Channel, ChannelType, Server } from "@prisma/client";

interface ModalData {}

export const useModal = create<ModalData>((set) => ({}));
