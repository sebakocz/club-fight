import { io, Socket } from "socket.io-client";
import { useGameStore } from "@/stores/game";

class SocketioService {
  socket: Socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io(import.meta.env["VITE_SOCKET_ENDPOINT"]);

    const gameStore = useGameStore();

    this.socket.on("connection", () => {
      gameStore.ally.id = this.socket.id;
      const randomNames = ["John Doe", "Jane Doe", "John Smith", "Jane Smith"];
      gameStore.ally.name =
        randomNames[Math.floor(Math.random() * randomNames.length)];

      this.socket.emit("join", {
        id: this.socket.id,
        name: gameStore.ally.name,
      });
    });

    this.socket.on("start", (players) => {
      // start the game
      const enemy = players.find((player: any) => player.id !== this.socket.id);
      gameStore.enemy.id = enemy.id;
      gameStore.enemy.name = enemy.name;
      gameStore.enemy.found = true;
    });

    this.socket.on("end", () => {
      gameStore.resetGame();
    });

    // handle item effects coming from opponent
    this.socket.on("itemUsed", (data) => {
      const item = gameStore.enemy.items.find(
        (item) => item.name === data.item.name
      );
      if (item) {
        gameStore.useItem(item, gameStore.enemy, gameStore.ally);
      }
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();
