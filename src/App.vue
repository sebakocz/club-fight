<template>
  <BattleRoom />
</template>

<script setup lang="ts">
import SocketioService from "@/services/socketio.service";
import { onBeforeUnmount, onMounted } from "vue";
import BattleRoom from "@/views/BattleRoom.vue";

onMounted(() => {
  SocketioService.setupSocketConnection();
});
onBeforeUnmount(() => {
  SocketioService.disconnect();
});
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
