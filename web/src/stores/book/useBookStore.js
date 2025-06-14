import { defineStore } from "pinia";
import { ref } from "vue";
import { cacheBook, getCachedBook } from "@/db";
import axios from "axios";

export const useBookStore = defineStore("book", () => {
  const books = ref([]);
  const total = ref(0);
  const loading = ref(false);

  function setBooks(data) {
    books.value = data;
    total.value = data.length;
  }

  async function fetchBooks() {
    loading.value = true;
    try {
      // Ambil data cache terlebih dahulu
      const cachedBooks = await getCachedBook();
      if (cachedBooks && cachedBooks.length > 0) {
        setBooks(cachedBooks);
      } else {
        const baseURL = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem("token");
        const res = await axios.get(baseURL + "/v1/books", {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        });
        setBooks(res.data);
        cacheBook(res.data);
        console.log("Data Book diambil dari API");
      }
    } catch (err) {
      console.error("Error fetching books:", err);
      setBooks([]);
    } finally {
      loading.value = false;
    }
  }

  return { books, total, loading, setBooks, fetchBooks };
});
