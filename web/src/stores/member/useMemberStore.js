import { defineStore } from "pinia";
import { ref } from "vue";
import { cacheUser, getCachedUser } from "@/db";
import axios from "axios";

export const useMemberStore = defineStore("member", () => {
  const members = ref([]);
  const total = ref(0);
  const loading = ref(false);

  function setMembers(data) {
    members.value = data;
    total.value = data.length;
  }

  async function fetchMembers() {
    loading.value = true;

    try {
      // Ambil data cache terlebih dahulu
      const cachedUsers = await getCachedUser();
      if (cachedUsers && cachedUsers.length > 0) {
        setMembers(cachedUsers);
      } else {
        const baseURL = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem("token");
        const res = await axios.get(baseURL + "/v1/users", {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        });
        setMembers(res.data);
        cacheUser(res.data);
      }
    } catch (err) {
      setMembers([]);
    } finally {
      loading.value = false;
    }
  }

  return { members, total, loading, setMembers, fetchMembers };
});
