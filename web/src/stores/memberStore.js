// src/stores/memberStore.js
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";

export const useMemberStore = defineStore("member", () => {
  const members = ref([]);
  const total = ref(0);
  const loading = ref(false);

  function setMembers(data) {
    members.value = data.users;
    total.value = data.total;
  }

  // Simpan ke localStorage setiap kali members berubah
  watch(members, (val) => {
    localStorage.setItem("members", JSON.stringify(val));
  });

  async function fetchMembers() {
    loading.value = true;
    try {
      const baseURL = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("token");
      const res = await axios.get(baseURL + "/v1/users", {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      setMembers(res.data);
      localStorage.setItem("members", JSON.stringify(res.data.users));
    } catch (err) {
      setMembers([]);
    } finally {
      loading.value = false;
    }
  }

  return { members, total, loading, setMembers, fetchMembers };
});
