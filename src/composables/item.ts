import { computed } from "vue";

export function useItem(label: string) {
  const icon = computed(() => {
    return new URL(`../assets/icons/${label}.svg`, import.meta.url).href;
  });

  return {
    icon,
  };
}
