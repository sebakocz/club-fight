export type ItemEvent = "attack" | "block";
export type ItemEffect = { event: ItemEvent; data: any };

export class Item {
  name: string;
  preperationCooldown: number;
  cooldown: number;
  effect: ItemEffect;
  progressPercentage: number = 0; // 0-100, helper for progress bar
  isPreparing: boolean = false;
  isRunning: boolean = false;

  constructor(
    name: string,
    preperationCooldown: number,
    cooldown: number,
    effect: ItemEffect
  ) {
    this.name = name;
    this.preperationCooldown = preperationCooldown;
    this.cooldown = cooldown;
    this.effect = effect;
  }
}

export const ITEM_LIST = [
  new Item("club", 1000, 5000, { event: "attack", data: { damage: 10 } }),
  new Item("shield", 600, 1400, { event: "block", data: {} }),
  new Item("dagger", 500, 1000, { event: "attack", data: { damage: 5 } }),
];
