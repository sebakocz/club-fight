import { defineStore } from "pinia";
import { ref } from "vue";
import { type Player, PLAYER_STATS } from "@/utils/player";
import type { Item } from "@/utils/item";
import SocketioService from "@/services/socketio.service";

const steps = 100;

export const useGameStore = defineStore("game", () => {
  const ally = ref({ ...structuredClone(PLAYER_STATS) });
  const enemy = ref({ ...structuredClone(PLAYER_STATS), found: false });
  const selectedItem = ref<Item | undefined>(undefined);

  const useSelectedItem = () => {
    if (selectedItem.value) {
      if (selectedItem.value.isPreparing || selectedItem.value.isRunning) {
        return;
      }
      SocketioService.socket.emit("useItem", {
        item: selectedItem.value,
      });
      useItem(selectedItem.value, ally.value, enemy.value).then(() => {
        useSelectedItem();
      });
    }
  };

  const selectItem = (itemName: string) => {
    if (selectedItem.value) {
      if (selectedItem.value.name === itemName) {
        selectedItem.value = undefined;
        return;
      }
    }
    selectedItem.value = ally.value.items.find(
      (item) => item.name === itemName
    );
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
    // fix: small delay to prevent only every second item to be used by opponent
    // await new Promise((resolve) => setTimeout(resolve, 100));

    return new Promise((resolve) => {
      item.isPreparing = true;
      item.progressPercentage = 0;
      const preparationInterval = setInterval(() => {
        item.progressPercentage += 100 / steps;
        if (item.progressPercentage >= 100) {
          clearInterval(preparationInterval);
          item.progressPercentage = 100;
          item.isPreparing = false;
          applyEffect(item, attacker, defender).then(() => {
            resolve();
          });
        }
      }, item.preperationCooldown / steps);
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
        }
      } else if (item.effect.event === "block") {
        attacker.isBlocking = true;
        setTimeout(() => {
          attacker.isBlocking = false;
        }, item.cooldown);
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
      const cooldownInterval = setInterval(() => {
        item.progressPercentage -= 100 / steps;
        if (item.progressPercentage <= 0) {
          clearInterval(cooldownInterval);
          item.progressPercentage = 0;
          item.isRunning = false;
          resolve();
        }
      }, item.cooldown / steps);
    });
  };

  return {
    ally,
    enemy,
    selectItem,
    selectedItem,
    useItem,
  };
});
