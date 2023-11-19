import { create } from "zustand";
import { Channel, ChannelType, Server } from "@prisma/client";

export type ModelType = "createServer" | "invite";

interface ModalData {
  server?: Server;
}
interface ModalStore {
  type: ModelType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModelType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
