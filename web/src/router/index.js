import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";

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
  const baseURL = import.meta.env.VITE_API_URL; // Ganti dengan URL API Anda
  const token = localStorage.getItem("token");

  // Jika user sudah punya token dan menuju halaman root, redirect ke dashboard
  if (to.path === "/" && token) {
    try {
      await axios.get(baseURL + "/v1/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return next({ path: "/dashboard" });
    } catch (err) {
      // Jika token tidak valid, hapus token dan lanjut ke halaman /
      localStorage.removeItem("token");
      return next();
    }
  }

  // Jika route diawali /dashboard dan tidak ada token, redirect ke /
  if (to.path.startsWith("/dashboard") && !token) {
    return next({ path: "/" });
  } else if (to.path.startsWith("/dashboard") && token) {
    // Verifikasi token ke API
    try {
      await axios.get(baseURL + "/v1/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return next();
    } catch (err) {
      // Jika token tidak valid, hapus token dan redirect ke /
      localStorage.removeItem("token");
      return next({ path: "/" });
    }
  } else {
    return next();
  }
});

export default router;
