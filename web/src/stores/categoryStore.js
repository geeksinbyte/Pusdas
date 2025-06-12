import { defineStore } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([]);
  const loading = ref(false);
  const selectedCategory = ref("semua");

  function setCategories(data) {
    categories.value = data;
  }

  function setSelectedCategory(val) {
    selectedCategory.value = val;
  }

  // Simpan ke localStorage setiap kali categories berubah
  watch(categories, (val) => {
    localStorage.setItem("categories", JSON.stringify(val));
  });

  async function fetchCategories() {
    loading.value = true;
    try {
      const baseURL = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("token");
      const res = await axios.get(baseURL + "/v1/categories", {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      setCategories(res.data); // asumsi response adalah array kategori
      localStorage.setItem("categories", JSON.stringify(res.data));
    } catch (err) {
      setCategories([]);
    } finally {
      loading.value = false;
    }
  }

  return {
    categories,
    loading,
    selectedCategory,
    setCategories,
    setSelectedCategory,
    fetchCategories,
  };
});
