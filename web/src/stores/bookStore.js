import { defineStore } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";

export const useBookStore = defineStore("book", () => {
  const books = ref([]);
  const total = ref(0);
  const loading = ref(false);

  function setBooks(data) {
    books.value = data.books;
    total.value = data.total;
  }

  // Simpan ke localStorage setiap kali books berubah
  watch(books, (val) => {
    localStorage.setItem("books", JSON.stringify(val));
  });

  async function fetchBooks() {
    loading.value = true;
    try {
      const baseURL = import.meta.env.VITE_API_URL;
      const res = await axios.get(baseURL + "/v1/books");
      setBooks(res.data); // asumsi response { total, books }
      localStorage.setItem("books", JSON.stringify(res.data.books));
    } catch (err) {
      setBooks({ books: [], total: 0 });
    } finally {
      loading.value = false;
    }
  }

  return { books, total, loading, setBooks, fetchBooks };
});
