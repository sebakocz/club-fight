<template>
  <div
    class="h-screen flex flex-col items-center p-1 justify-between sm:max-w-[500px] sm:mx-auto"
  >
    <div v-if="gameStore.enemy.found" class="w-full flex flex-col gap-3">
      <HealthBar :health="gameStore.enemy.health" />
      <div class="flex justify-around">
        <ItemDisplay
          :label="item.name"
          :is-ally="false"
          v-for="item in gameStore.enemy.items"
          :key="item.name + 'enemy'"
          :progress-percentage="item.progressPercentage"
          :is-preparing="item.isPreparing"
          :is-running="item.isRunning"
        />
      </div>
    </div>
    <p v-else class="p-10">Searching for a worthy opponent...</p>
    <div class="w-full flex flex-col gap-3">
      <div class="flex justify-around">
        <ItemDisplay
          v-for="item in gameStore.ally.items"
          :key="item.name + 'ally'"
          :label="item.name"
          :progress-percentage="item.progressPercentage"
          :is-preparing="item.isPreparing"
          :is-running="item.isRunning"
          :class="{
            'outline-none outline-2 outline-main-500':
              item === gameStore.selectedItem,
            'sm:cursor-pointer': true,
          }"
          @click="onItemClick(item.name)"
        />
      </div>
      <HealthBar :health="gameStore.ally.health" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import HealthBar from "@/components/HealthBar.vue";
import ItemDisplay from "@/components/ItemDisplay.vue";
import { useGameStore } from "@/stores/game";

const gameStore = useGameStore();

const onItemClick = (label: string) => {
  gameStore.selectItem(label);
};
</script>
