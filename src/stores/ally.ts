import { defineStore } from "pinia";
import { PLAYER_STATS } from "@/stores/player.constants";

export const useAllyStore = defineStore({
  id: "ally",
  state: () => ({ ...PLAYER_STATS }),
});
