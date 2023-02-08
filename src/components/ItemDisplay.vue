<template>
  <div
    :class="{
      'relative w-24 h-24 sm:w-32 sm:h-32 bg-main-300 rounded': true,
      'outline-none outline-2 outline-main-500': item.isSelected,
      'sm:cursor-pointer': isAlly,
    }"
  >
    <img :src="icon" class="w-full h-full" alt="icon" />
    <p class="absolute top-0 p-2">{{ item.name }}</p>
    <div
      class="absolute top-0 left-0 w-full h-full bg-gray-400 rounded opacity-70 origin-bottom"
      :style="{ transform: `scaleY(${scaleY})` }"
      v-show="item.isRunning"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useAllyStore } from "@/stores/ally";
import { useEnemyStore } from "@/stores/enemy";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  isAlly: {
    type: Boolean,
    required: true,
  },
});
const playerStore = props.isAlly ? useAllyStore() : useEnemyStore();

const item = computed(() => {
  return playerStore.items.find((item) => item.name === props.label);
});

const icon = computed(() => {
  return new URL(`../assets/icons/${props.label}.png`, import.meta.url).href;
});

const scaleY = computed(() => {
  if (!item.value) return 0;
  return 1 - item.value.timeUntilReady / item.value.cooldown;
});
</script>
