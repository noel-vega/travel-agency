import { nanoid } from "nanoid";
import { create } from "zustand";

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

type State = {
  clients: Client[];
};
type Actions = {
  addClient: (client: Omit<Client, "id">) => void;
};

type Store = State & Actions;

export const useClientsStore = create<Store>((set) => ({
  clients: [
    {
      id: nanoid(),
      name: "Mitchell",
      email: "mitchell@vasile.live",
      phone: "5555555555",
    },
  ],
  addClient: (client) => {
    set((state) => {
      return { clients: [{ id: nanoid(), ...client }, ...state.clients] };
    });
  },
}));
