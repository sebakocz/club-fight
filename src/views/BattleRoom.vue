<template>
  <div class="game">
    <div v-if="enemyStore.found">
      <p>Enemy found!</p>
    </div>
    <div class="p-10">
      <div>{/* status */}</div>
      <ol>
        {/* TODO */}
      </ol>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEnemyStore } from "@/stores/enemy";
// import { useAllyStore } from "@/stores/ally";
//
// const allyStore = useAllyStore();
const enemyStore = useEnemyStore();
</script>
