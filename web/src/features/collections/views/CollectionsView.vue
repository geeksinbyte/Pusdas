<script setup>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/shared/SearchBar.vue";
import { useCategoryStore } from "@/stores/book/useCategoryStore";
import { useBookStore } from "@/stores/book/useBookStore";
import { ref, computed } from "vue";

const categoryStore = useCategoryStore();
const categoryOptions = computed(() =>
  categoryStore.items.map((cat) => ({
    value: cat.id,
    label: cat.nama,
  }))
);

const bookStore = useBookStore();
const books = computed(() => bookStore.books);

// State pencarian
const searchText = ref("");
const selectedOption = ref("semua");

// Dialog state
const selectedBook = ref(null);

function handleSearch({ searchText: text, selectedOption: selected }) {
  console.log("Pencarian:", text);
  console.log("Kategori terpilih:", selected);
  // TODO: filter data berdasarkan pencarian
}
</script>

<template>
  <!-- Search -->
  <SearchBar
    v-model:searchText="searchText"
    v-model:selectedOption="selectedOption"
    :selectItems="categoryOptions"
    select-placeholder="Pilih Kategori"
    input-placeholder="Cari Judul, Penulis, atau Kategori"
    select-group-label="Kategori"
    default-select-value="semua"
    @search="handleSearch"
  />

  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
    <template v-if="bookStore.loading">
      <div class="col-span-full flex justify-center items-center h-60">
        <div
          class="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"
        ></div>
      </div>
    </template>

    <!-- Koleksi Buku -->
    <Dialog>
      <template v-for="book in books" :key="book.id">
        <DialogTrigger as-child>
          <div
            class="group relative bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer drop-shadow-xl"
            @click="selectedBook = book"
          >
            <!-- Sampul -->
            <img
              :src="
                book.urlSampul ||
                'https://placehold.co/300x400?text=Sampul+Kosong'
              "
              alt="Sampul Buku"
              class="w-full h-60 object-cover"
            />

            <!-- Info Buku -->
            <div class="p-4">
              <p class="font-semibold text-base line-clamp-2">
                {{ book.judul }}
              </p>
              <p class="text-sm text-gray-500 mt-1 line-clamp-1">
                {{ book.penulis }}
              </p>
              <p class="text-xs text-gray-400">
                {{ new Date(book.tglTerbit).getFullYear() }}
              </p>
            </div>

            <!-- Tombol Hover -->
            <div
              class="absolute inset-0 bg-transparent bg-opacity-0 group-hover:bg-opacity-50 transition flex items-center justify-center"
            >
              <Button
                class="opacity-0 group-hover:opacity-100 transition"
                variant="secondary"
                size="sm"
              >
                Lihat Detail
              </Button>
            </div>
          </div>
        </DialogTrigger>
      </template>

      <!-- Konten Dialog Detail Buku -->
      <DialogContent v-if="selectedBook">
        <DialogHeader>
          <DialogTitle>{{ selectedBook.judul }}</DialogTitle>
          <DialogDescription>
            Ditulis oleh {{ selectedBook.penulis }} -
            {{ new Date(selectedBook.tglTerbit).getFullYear() }}
          </DialogDescription>
        </DialogHeader>
        <div class="flex flex-col items-center gap-4">
          <img
            :src="
              selectedBook.urlSampul ||
              'https://placehold.co/200x300?text=Sampul'
            "
            class="w-40 h-auto rounded shadow"
          />
          <p class="text-sm text-gray-700">
            {{ selectedBook.deskripsi || "Deskripsi belum tersedia." }}
          </p>
        </div>
        <DialogFooter>
          <a :href="selectedBook.urlFile">
            <Button>Mulai Baca</Button>
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
