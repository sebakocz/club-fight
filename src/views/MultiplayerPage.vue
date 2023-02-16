<template>
  <BattleRoom />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from "vue";
import SocketioService from "@/services/socketio.service";
import BattleRoom from "@/components/BattleRoom.vue";

onMounted(() => {
  SocketioService.setupSocketConnection();
});

onBeforeUnmount(() => {
  SocketioService.disconnect();
});
</script>
