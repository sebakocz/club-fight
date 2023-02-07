import { io, Socket } from "socket.io-client";
import { useEnemyStore } from "@/stores/enemy";
import { useAllyStore } from "@/stores/ally";

class SocketioService {
  socket: Socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io("http://localhost:3000");

    const enemyStore = useEnemyStore();
    const allyStore = useAllyStore();

    this.socket.on("connection", () => {
      allyStore.id = this.socket.id;
      const randomNames = ["John Doe", "Jane Doe", "John Smith", "Jane Smith"];
      allyStore.name =
        randomNames[Math.floor(Math.random() * randomNames.length)];

      this.socket.emit("join", {
        id: this.socket.id,
        name: allyStore.name,
      });
    });

    this.socket.on("start", (players) => {
      // start the game
      const enemy = players.find((player: any) => player.id !== this.socket.id);
      enemyStore.setEnemy(enemy);
    });

    this.socket.on("end", () => {
      enemyStore.$reset();
      allyStore.$reset();
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();
