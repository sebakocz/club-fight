<template>
  <div class="w-full h-8 bg-main-500 p-1 rounded">
    <div class="bg-main-300 h-full rounded" :style="{ width: width }" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { PLAYER_STATS } from "@/stores/player.constants";

const props = defineProps({
  health: {
    type: Number,
    required: true,
  },
});

const width = computed(() => {
  return `${(props.health / PLAYER_STATS.health) * 100}%`;
});
</script>
