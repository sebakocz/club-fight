<template>
  <BattleRoom />
</template>

<script setup lang="ts">
import BattleRoom from "@/components/BattleRoom.vue";
import { useGameStore } from "@/stores/game";
import { watch } from "vue";

const gameStore = useGameStore();

gameStore.gamePaused = false;
gameStore.createEnemy("1", "Dummy");

watch(
  () => gameStore.enemy.health,
  () => {
    if (gameStore.enemy.health != 80) {
      setTimeout(() => {
        gameStore.enemy.health = 80;
      }, 1000);
    }
  }
);
</script>
