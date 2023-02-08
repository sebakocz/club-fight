import { defineStore } from "pinia";
import { PLAYER_STATS } from "@/stores/player.constants";
import { ITEM_LIST } from "@/item/item";

export const useEnemyStore = defineStore({
  id: "enemy",
  state: () => ({
    ...PLAYER_STATS,
    items: structuredClone(ITEM_LIST).reverse(),
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
