import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/pages/WelcomePage.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("@/pages/AppDashboard.vue"),
    children: [
      {
        path: "",
        name: "DashboardLayout",
        component: () => import("@/layouts/DashboardLayout.vue"),
      },
      {
        path: "collections",
        name: "Collections",
        component: () => import("@/layouts/CollectionsLayout.vue"),
      },
      {
        path: "users",
        name: "Users",
        component: () => import("@/layouts/UsersLayout.vue"),
      },
      {
        path: "loans",
        name: "Loans",
        component: () => import("@/layouts/LoansLayout.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
