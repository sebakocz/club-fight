import { createRouter, createWebHashHistory } from "vue-router";
import BattleRoom from "@/views/BattleRoom.vue";
import HomePage from "@/views/HomePage.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/battle",
      name: "battle",
      component: BattleRoom,
    },
  ],
});

export default router;
