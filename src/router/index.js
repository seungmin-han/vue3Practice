import { createWebHistory, createRouter } from "vue-router";
import Main from "@/components/main/Main.vue";
import Create from "@/components/create/Create.vue";

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
