import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import MultiplayerPage from "@/views/MultiplayerPage.vue";
import SingleplayerPage from "@/views/SingleplayerPage.vue";

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
      component: MultiplayerPage,
    },
    {
      path: "/train",
      name: "train",
      component: SingleplayerPage,
    },
  ],
});

export default router;
