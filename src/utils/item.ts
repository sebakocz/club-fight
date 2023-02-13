export type ItemEvent = "attack" | "block";
export type ItemEffect = { event: ItemEvent; data: any };

export type Item = {
  name: string;
  preperationCooldown: number;
  cooldown: number;
  effect: ItemEffect;
  progressPercentage: number; // 0-100, helper for progress bar
  isPreparing: boolean;
  isRunning: boolean;
};

export const ITEM_BASE = {
  progressPercentage: 0,
  isPreparing: false,
  isRunning: false,
};

export const ITEM_LIST: Item[] = [
  {
    name: "club",
    preperationCooldown: 5000,
    cooldown: 1000,
    effect: { event: "attack", data: { damage: 25 } },
    ...ITEM_BASE,
  },
  {
    name: "shield",
    preperationCooldown: 600,
    cooldown: 1400,
    effect: { event: "block", data: {} },
    ...ITEM_BASE,
  },
  {
    name: "dagger",
    preperationCooldown: 500,
    cooldown: 1000,
    effect: { event: "attack", data: { damage: 5 } },
    ...ITEM_BASE,
  },
];
