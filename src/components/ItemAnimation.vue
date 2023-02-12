<template>
  <div :class="`w-32 h-32 mx-auto left-0 right-0 ${isEnemy ? 'flipped' : ''}`">
    <Transition :name="animationType">
      <img
        :src="icon"
        class="w-full h-full origin-bottom-left opacity-0"
        alt="icon"
        v-if="isRunning"
      />
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, type PropType, ref, watch } from "vue";
import type { ItemEvent } from "@/utils/item";
import { useItem } from "@/composables/item";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  isRunning: {
    type: Boolean,
    required: true,
  },
  itemEvent: {
    type: String as PropType<ItemEvent>,
    required: true,
  },
  isEnemy: {
    type: Boolean,
    required: true,
  },
});

const { icon } = useItem(props.label);

const animationType = computed(() => {
  switch (props.itemEvent) {
    case "attack":
      return runCounter.value % 2 === 1 ? "swingReverse" : "swing";
    case "block":
      return "block";
    default:
      return "swing";
  }
});

const runCounter = ref(0);

watch(
  () => props.isRunning,
  (isRunning) => {
    if (isRunning) {
      console.log("runCounter.value: ", runCounter.value);
      console.log(animationType.value);
      runCounter.value++;
    }
  }
);
</script>

<style lang="sass">
.swing-enter-active
  animation: swing 0.8s cubic-bezier(0.42, 0, 0.58, 1)

.swingReverse-enter-active
  animation: swing 0.8s cubic-bezier(0.42, 0, 0.58, 1) reverse

@keyframes swing
  0%
    transform: rotate(5deg) translateX(100%)
    opacity: 0

  15%
    opacity: 1

  70%
    opacity: 1

  100%
    transform: rotate(-120deg)
    opacity: 0

.block-enter-active
  animation: block 1.4s ease-out

@keyframes block
  0%
    transform: scale(0.5) translateY(0%)
    transform-origin: center
    opacity: 0

  10%
    transform: translateY(-10%)
    opacity: 1

  30%
    transform: scale(1.4) translateY(-10%)

  100%
    transform: scale(1.4) translateY(-10%)
    transform-origin: center
    opacity: 1

.flipped
  rotate: 180deg
</style>
