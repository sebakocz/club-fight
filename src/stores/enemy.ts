import { defineStore } from "pinia";
import { PLAYER_STATS } from "@/stores/player.constants";

export const useEnemyStore = defineStore({
  id: "enemy",
  state: () => ({
    ...PLAYER_STATS,
    found: false,
  }),
  actions: {
    setEnemy(enemy: any) {
      this.name = enemy.name;
      this.health = enemy.health;
      this.found = true;
    },
  },
});
