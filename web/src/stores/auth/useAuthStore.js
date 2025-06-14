import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const token = ref(localStorage.getItem("token") || "");

    const user = ref({
      id: "",
      name: "",
      role: "",
    });

    const loading = ref(false);
    const error = ref(null);
    const baseURL = import.meta.env.VITE_API_URL;

    const router = useRouter();

    function setToken(newToken) {
      token.value = newToken;
      if (newToken) {
        localStorage.setItem("token", newToken);
      } else {
        localStorage.removeItem("token");
      }
    }

    function setUser(data) {
      if (data) {
        user.value = {
          id: data.id || "",
          name: data.nama || "",
          role: data.peran || "",
        };
      } else {
        user.value = {
          id: "",
          nama: "",
          role: "",
        };
      }
    }

    async function login({ id, password }) {
      loading.value = true;
      error.value = null;

      try {
        const res = await axios.post(baseURL + "/v1/auth/login", {
          id,
          password,
        });
        setToken(res.data.token);
        setUser(res.data.anggota); // Sesuaikan sesuai struktur API-mu

        router.push("/dashboard");
        return true;
      } catch (err) {
        error.value = err.response?.data?.error || "Login gagal";
        setToken("");
        setUser(null);
        return false;
      } finally {
        loading.value = false;
      }
    }

    function logout() {
      setToken("");
      setUser(null);
      router.push("/");
    }

    async function fetchProfile() {
      if (!token.value) return;
      loading.value = true;
      try {
        const res = await axios.get(baseURL + "/v1/profile", {
          headers: { Authorization: `Bearer ${token.value}` },
        });
        setUser(res.data.user || res.data.anggota || res.data);
      } catch (err) {
        setToken("");
        setUser(null);
      } finally {
        loading.value = false;
      }
    }

    return {
      token,
      user,
      loading,
      error,
      login,
      logout,
      fetchProfile,
      setToken,
      setUser,
    };
  },
  { persist: true }
);
