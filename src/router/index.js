import { createWebHistory, createRouter } from "vue-router";
import Main from "@/components/Main.vue";
import Create from "@/components/Create.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;