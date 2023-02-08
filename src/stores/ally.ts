import { defineStore } from "pinia";
import { PLAYER_STATS } from "@/stores/player.constants";
import { ITEM_LIST } from "@/item/item";
import SocketioService from "@/services/socketio.service";

export const useAllyStore = defineStore({
  id: "ally",
  state: () => ({
    ...PLAYER_STATS,
    items: structuredClone(ITEM_LIST),
  }),
  actions: {
    setActiveItem(itemName: string) {
      this.items.forEach((item) => {
        item.isSelected = item.name === itemName && !item.isSelected;
      });
      if (!this.items.some((item) => item.isRunning)) {
        this.useItem();
      }
    },
    useItem() {
      this.items.forEach((item) => {
        if (item.isSelected) {
          const socket = SocketioService.socket;
          socket.emit(item.effect.event, item.effect.data);

          item.isRunning = true;
          const interval = setInterval(() => {
            item.timeUntilReady += 100;

            if (item.timeUntilReady >= item.cooldown) {
              clearInterval(interval);
              item.timeUntilReady = 0;
              item.isRunning = false;
              this.useItem();
            }
          }, item.cooldown / 100);

          return;
        }
      });
    },
  },
});
