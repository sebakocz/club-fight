<template>
  <div
    class="flex flex-col items-center p-1 justify-between sm:max-w-[500px] sm:mx-auto"
  >
    <div v-if="gameStore.enemy.found" class="w-full flex flex-col gap-3">
      <HealthBar :health="gameStore.enemy.health" />
      <div class="flex justify-around">
        <ItemDisplay
          :label="item.name"
          :is-ally="false"
          v-for="item in gameStore.enemy.items"
          :key="item.name + 'enemy'"
          :is-preparing="item.isPreparing"
          :preparation-cooldown="item.preparationCooldown"
          :is-running="item.isRunning"
          :execution-cooldown="item.executionCooldown"
        />
      </div>
      <div class="relative">
        <ItemAnimation
          v-for="item in gameStore.enemy.items"
          :is-enemy="true"
          :label="item.name"
          :is-running="item.isRunning"
          :item-event="item.effect.event"
          :key="item.name + 'enemyAnimation'"
          class="top-3"
        />
      </div>
    </div>
    <h2 v-else class="mt-20 p-10 text-2xl text-center">
      Searching for a worthy opponent...
    </h2>

    <StartCountdown v-if="gameStore.enemy.found && gameStore.isOnline" />

    <div class="w-full flex flex-col gap-3">
      <div class="relative w-full">
        <ItemAnimation
          v-for="item in gameStore.ally.items"
          :is-enemy="false"
          :label="item.name"
          :is-running="item.isRunning"
          :item-event="item.effect.event"
          :key="item.name + 'allyAnimation'"
          class="bottom-3"
        />
      </div>
      <div class="flex justify-around relative">
        <TutorialPopup v-if="gameStore.gamePaused" />

        <ItemDisplay
          v-for="item in gameStore.ally.items"
          :key="item.name + 'ally'"
          :label="item.name"
          :is-preparing="item.isPreparing"
          :preparation-cooldown="item.preparationCooldown"
          :is-running="item.isRunning"
          :execution-cooldown="item.executionCooldown"
          :class="{
            'outline-none outline-4 outline-secondary-500':
              item.name === gameStore.selectedItem,
            'sm:cursor-pointer': true,
            'pointer-events-none':
              !gameStore.enemy.found || gameStore.gamePaused,
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
import ItemAnimation from "@/components/ItemAnimation.vue";
import StartCountdown from "@/components/StartCountdown.vue";
import TutorialPopup from "@/components/TutorialPopup.vue";

const gameStore = useGameStore();

const onItemClick = (name: string) => {
  gameStore.selectItem(name);
};
</script>
