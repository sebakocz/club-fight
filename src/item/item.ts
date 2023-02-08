export class Item {
  name: string;
  cooldown: number;
  effect: { event: string; data: any };
  timeUntilReady: number = 0;
  isSelected: boolean = false;
  isRunning: boolean = false;
  constructor(
    name: string,
    cooldown: number,
    effect: { event: string; data: any }
  ) {
    this.name = name;
    this.cooldown = cooldown;
    this.effect = effect;
  }
}

export const ITEM_LIST = [
  new Item("club", 6000, { event: "attack", data: { damage: 20 } }),
  new Item("shield", 2400, { event: "attack", data: { damage: 0 } }),
  new Item("dagger", 2000, { event: "attack", data: { damage: 5 } }),
];
