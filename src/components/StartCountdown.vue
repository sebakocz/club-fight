<template>
  <span class="text-5xl pulse" v-if="gamePaused">
    {{ countdown > 0 ? countdown + "..." : "Battle!" }}
  </span>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useGameStore } from "@/stores/game";
import { storeToRefs } from "pinia";

const countdown = ref(3);

const { gamePaused } = storeToRefs(useGameStore());

onMounted(() => {
  const interval = setInterval(() => {
    countdown.value--;
    if (countdown.value === -1) {
      clearInterval(interval);

      setTimeout(() => {
        gamePaused.value = false;
      }, 1000);
    }
  }, 1000);
});
</script>

<style>
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
.pulse {
  animation: pulse 1s ease-in-out infinite;
}
</style>
