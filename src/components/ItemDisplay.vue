<template>
  <div
    class="relative w-24 h-24 sm:w-32 sm:h-32 bg-main-300 rounded overflow-hidden"
  >
    <img :src="icon" class="w-full h-full" alt="icon" />
    <p class="absolute top-0 p-2">{{ label }}</p>
    <div
      :class="{
        'bg-gray-400': isPreparing,
        'bg-main-200': isRunning,
        'absolute top-0 left-0 w-full h-full rounded opacity-70 origin-bottom transition-{duration: 0.1s, timing-function: linear} transition-colors': true,
      }"
      :style="{ transform: `scaleY(${progressPercentage / 100})` }"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  progressPercentage: {
    type: Number,
    required: true,
  },
  isPreparing: {
    type: Boolean,
    required: true,
  },
  isRunning: {
    type: Boolean,
    required: true,
  },
});

const icon = computed(() => {
  return new URL(`../assets/icons/${props.label}.svg`, import.meta.url).href;
});
</script>
