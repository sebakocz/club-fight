import type { Item } from "@/utils/item";
import { ITEM_LIST } from "@/utils/item";

export type Player = {
  id: string;
  health: number;
  name: string;
  isBlocking: boolean;
  items: Item[];
};

export const PLAYER_STATS: Player = {
  id: "",
  health: 80,
  name: "John Doe",
  isBlocking: false,
  items: structuredClone(ITEM_LIST),
};
