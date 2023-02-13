export type Player = {
  id: string;
  health: number;
  name: string;
  isBlocking: boolean;
};

export const PLAYER_STATS: Player = {
  id: "",
  health: 80,
  name: "John Doe",
  isBlocking: false,
};
