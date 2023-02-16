<template>
  <div
    class="relative w-[30vw] h-[30vw] sm:w-32 sm:h-32 bg-secondary-200 rounded overflow-hidden"
  >
    <img :src="icon" class="w-full h-full" alt="icon" />
    <div
      :class="{
        'bg-secondary-400 preparing': isPreparing,
        'bg-gray-200 running': isRunning,
      }"
      class="absolute scale-y-0 top-0 left-0 w-full h-full rounded opacity-70 origin-bottom transition-colors duration-200"
      :style="cssVars"
    />
  </div>
</template>

<script lang="ts" setup>
import { useItem } from "@/composables/item";
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  isPreparing: {
    type: Boolean,
    required: true,
  },
  preparationCooldown: {
    type: Number,
    required: true,
  },
  isRunning: {
    type: Boolean,
    required: true,
  },
  executionCooldown: {
    type: Number,
    required: true,
  },
});

const { icon } = useItem(props.label);

const cssVars = computed(() => {
  return {
    "--preparation-cooldown": `${props.preparationCooldown / 1000}s`,
    "--execution-cooldown": `${props.executionCooldown / 1000}s`,
  };
});
</script>

<style lang="sass">
.preparing
  animation: scale-y var(--preparation-cooldown) linear

.running
  animation: scale-y var(--execution-cooldown) linear reverse
  animation-delay: var(--preparation-cooldown)

@keyframes scale-y
  0%
    transform: scaleY(0)
  100%
    transform: scaleY(1)
</style>
