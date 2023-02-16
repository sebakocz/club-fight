export type ItemEvent = "attack" | "block";
export type ItemEffect = { event: ItemEvent; data: any };

export type Item = {
  name: string;
  preparationCooldown: number;
  executionCooldown: number;
  effect: ItemEffect;
  isPreparing: boolean;
  isRunning: boolean;
};

export const ITEM_BASE = {
  isPreparing: false,
  isRunning: false,
};

export const ITEM_LIST: Item[] = [
  {
    name: "club",
    preparationCooldown: 5000,
    executionCooldown: 1000,
    effect: { event: "attack", data: { damage: 25 } },
    ...ITEM_BASE,
  },
  {
    name: "shield",
    preparationCooldown: 600,
    executionCooldown: 1400,
    effect: { event: "block", data: {} },
    ...ITEM_BASE,
  },
  {
    name: "dagger",
    preparationCooldown: 500,
    executionCooldown: 1000,
    effect: { event: "attack", data: { damage: 5 } },
    ...ITEM_BASE,
  },
];
