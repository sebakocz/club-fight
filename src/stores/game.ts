import { defineStore } from "pinia";
import { ref } from "vue";
import { type Player, PLAYER_STATS } from "@/utils/player";
import type { Item } from "@/utils/item";
import SocketioService from "@/services/socketio.service";
import router from "@/router";
import { ITEM_LIST } from "@/utils/item";

export const useGameStore = defineStore("game", () => {
  const ally = ref({
    ...PLAYER_STATS,
    items: ITEM_LIST.map((item) => ({ ...item })),
  });
  const enemy = ref({
    ...PLAYER_STATS,
    items: ITEM_LIST.map((item) => ({ ...item })),
    found: false,
  });
  const selectedItem = ref("");
  const gamePaused = ref(true);
  const isOnline = ref(false);

  const useSelectedItem = () => {
    const item = ally.value.items.find(
      (item) => item.name === selectedItem.value
    );
    if (item) {
      if (item.isPreparing || item.isRunning) {
        return;
      }
      if (isOnline.value) {
        SocketioService.socket.emit("useItem", {
          item: item,
        });
      }
      useItem(item, ally.value, enemy.value).then(() => {
        useSelectedItem();
      });
    }
  };

  const selectItem = (name: string) => {
    if (selectedItem.value) {
      if (selectedItem.value === name) {
        selectedItem.value = "";
        return;
      }
    }
    selectedItem.value = name;
    if (ally.value.items.some((item) => item.isRunning || item.isPreparing)) {
      return;
    }
    useSelectedItem();
  };

  const useItem = async (
    item: Item,
    attacker: Player,
    defender: Player
  ): Promise<void> => {
    return new Promise((resolve) => {
      item.isPreparing = true;
      setTimeout(() => {
        item.isPreparing = false;
        applyEffect(item, attacker, defender).then(() => {
          resolve();
        });
      }, item.preparationCooldown);
    });
  };

  const applyEffect = (
    item: Item,
    attacker: Player,
    defender: Player
  ): Promise<void> => {
    return new Promise((resolve) => {
      if (item.effect.event === "attack") {
        if (!defender.isBlocking) {
          defender.health = Math.max(
            0,
            defender.health - item.effect.data.damage
          );

          if (defender.health <= 0) {
            gamePaused.value = true;
            setTimeout(() => {
              resetGame();
            }, 1000);
          }
        }
      } else if (item.effect.event === "block") {
        attacker.isBlocking = true;
        setTimeout(() => {
          attacker.isBlocking = false;
        }, item.executionCooldown);
      } else {
        console.error("Unknown effect event", item.effect.event);
      }

      startCooldown(item).then(() => {
        resolve();
      });
    });
  };

  const startCooldown = (item: Item): Promise<void> => {
    return new Promise((resolve) => {
      item.isRunning = true;
      setTimeout(() => {
        item.isRunning = false;
        resolve();
      }, item.executionCooldown);
    });
  };

  const resetGame = () => {
    router.push("/");
    ally.value = {
      ...structuredClone(PLAYER_STATS),
      items: ITEM_LIST.map((item) => ({ ...item })),
    };
    enemy.value = {
      ...structuredClone(PLAYER_STATS),
      items: ITEM_LIST.map((item) => ({ ...item })),
      found: false,
    };
    selectedItem.value = "";
    gamePaused.value = true;
  };

  const createEnemy = (
    id: string,
    name: string,
    onlineMode: boolean = false
  ) => {
    enemy.value.id = id;
    enemy.value.name = name;
    enemy.value.found = true;
    isOnline.value = onlineMode;
  };

  return {
    ally,
    enemy,
    selectItem,
    selectedItem,
    useItem,
    gamePaused,
    resetGame,
    createEnemy,
    isOnline,
  };
});
