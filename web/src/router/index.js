import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const routes = [
  {
    path: "/",
    component: () => import("@/views/WelcomePage.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("@/views/AppDashboard.vue"),
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
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  const user = authStore.user;

  // Jika user sudah punya token dan menuju halaman root, redirect ke dashboard
  if (to.path === "/" && token) {
    // Jika user belum di-load, fetch profile dulu
    if (!user) {
      try {
        await authStore.fetchProfile();
        if (authStore.user) {
          return next({ path: "/dashboard" });
        }
      } catch (err) {
        authStore.logout();
        return next();
      }
    } else {
      return next({ path: "/dashboard" });
    }
  }

  // Jika route diawali /dashboard dan tidak ada token, redirect ke /
  if (to.path.startsWith("/dashboard") && !token) {
    return next({ path: "/" });
  } else if (to.path.startsWith("/dashboard") && token) {
    // Jika user belum di-load, fetch profile dulu
    if (!user) {
      try {
        await authStore.fetchProfile();
        if (!authStore.user) {
          authStore.logout();
          return next({ path: "/" });
        }
      } catch (err) {
        authStore.logout();
        return next({ path: "/" });
      }
    }
    return next();
  } else {
    return next();
  }
});

export default router;
