<template>
  <div
    class="w-full h-[5vh] bg-secondary-300 p-[.8vh] rounded"
    :class="{ blink: healthChanged }"
  >
    <div
      class="bg-red-600 h-full rounded transition"
      :style="{ transform: `scaleX(${width})` }"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { PLAYER_STATS } from "@/utils/player";

const props = defineProps({
  health: {
    type: Number,
    required: true,
  },
});

const width = computed(() => {
  return `${(props.health / PLAYER_STATS.health) * 100}%`;
});

const healthChanged = ref(false);

watch(width, () => {
  healthChanged.value = true;
  setTimeout(() => {
    healthChanged.value = false;
  }, 1000);
});
</script>

<style>
.blink {
  animation: blink 1s linear;
}

@keyframes blink {
  0% {
    background-color: #ea7777;
  }
  100% {
    background-color: rgb(252 216 155);
  }
}
</style>
