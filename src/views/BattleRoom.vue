<template>
  <div
    class="h-screen flex flex-col items-center p-1 justify-between md:max-w-[500px] md:mx-auto"
  >
    <div v-if="enemyStore.found" class="w-full flex flex-col gap-3">
      <HealthBar :health="enemyStore.health" />
      <div class="flex justify-around">
        <ItemDisplay
          :label="item.name"
          :is-ally="false"
          v-for="item in enemyStore.items"
          :key="item.name + 'enemy'"
        />
      </div>
    </div>
    <p v-else class="p-10">Searching for a worthy opponent...</p>
    <div class="w-full flex flex-col gap-3">
      <div class="flex justify-around">
        <ItemDisplay
          :label="item.name"
          :is-ally="true"
          v-for="item in allyStore.items"
          :key="item.name + 'ally'"
          @click="onItemClick(item.name)"
        />
      </div>
      <HealthBar :health="allyStore.health" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEnemyStore } from "@/stores/enemy";
import HealthBar from "@/components/HealthBar.vue";
import { useAllyStore } from "@/stores/ally";
import ItemDisplay from "@/components/ItemDisplay.vue";

const allyStore = useAllyStore();
const enemyStore = useEnemyStore();

const onItemClick = (label: string) => {
  allyStore.setActiveItem(label);
};
</script>
