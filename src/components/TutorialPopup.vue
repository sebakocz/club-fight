<template>
  <div
    v-if="!userSeenIt"
    class="flex absolute justify-around bottom-[32vw] sm:bottom-32"
  >
    <img
      class="h-20 sm:h-32"
      src="@/assets/tutorial/club_text.svg"
      alt="club_text"
    />
    <img
      class="h-20 sm:h-32"
      src="@/assets/tutorial/shield_text.svg"
      alt="shield_text"
    />
    <img
      class="h-20 sm:h-32"
      src="@/assets/tutorial/dagger_text.svg"
      alt="dagger_text"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const userSeenIt = computed(() => {
  if (localStorage.getItem("tutorialSeen") === "true") {
    return true;
  }
  localStorage.setItem("tutorialSeen", "true");
  return false;
});
</script>
