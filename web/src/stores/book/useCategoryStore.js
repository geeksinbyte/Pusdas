import { defineStore } from "pinia";
import { ref } from "vue";
import { cacheCategory, getCachedCategory } from "@/db";
import axios from "axios";

export const useCategoryStore = defineStore("category", () => {
  const items = ref([]);
  const loading = ref(false);

  function setCategories(data) {
    items.value = data;
  }

  async function fetchCategories() {
    loading.value = true;
    try {
      // Ambil data cache terlebih dahulu
      const cachedCategories = await getCachedCategory();
      if (cachedCategories && cachedCategories.length > 0) {
        setCategories(cachedCategories);
      } else {
        const baseURL = "http://localhost:3000";
        const token = localStorage.getItem("token");
        const res = await axios.get(baseURL + "/v1/categories", {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        });
        setCategories(res.data);
        cacheCategory(res.data);
      }
    } catch (err) {
      setCategories([]);
    } finally {
      loading.value = false;
    }
  }

  return { items, loading, setCategories, fetchCategories };
});
