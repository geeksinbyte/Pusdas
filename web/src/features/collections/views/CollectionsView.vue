<script setup>
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import SearchBar from "@/components/shared/SearchBar.vue";
import { useCategoryStore } from "@/stores/book/useCategoryStore";
import { ref, computed } from "vue";

const categoryStore = useCategoryStore();
const categoryOptions = computed(() =>
  categoryStore.items.map((cat) => ({
    value: cat.id,
    label: cat.nama,
  }))
);

// State untuk pencarian
const searchText = ref("");
const selectedOption = ref("semua");

function handleSearch({ searchText: text, selectedOption: selected }) {
  console.log("Pencarian:", text);
  console.log("Kategori terpilih:", selected);
  // TODO: filter data berdasarkan search dan kategori
}
</script>

<template>
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

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
    <Card
      class="col-span-3 bg-white border-none w-full relative drop-shadow-xl"
    >
      <CardHeader class="px-4">
        <h2 class="text-lg">Pengetahuan Umum</h2>
      </CardHeader>

      <CardContent class="flex items-center justify-between">
        <Button variant="outline"><ChevronLeftIcon /></Button>
        <div class="grid grid-cols-4 md:grid-cols-6">
          <!-- TODO: Tampilkan koleksi berdasarkan hasil pencarian -->
        </div>
        <Button variant="outline"><ChevronRightIcon /></Button>
      </CardContent>

      <CardFooter>
        <Button class="max-w-sm">Lihat Semua Koleksi</Button>
      </CardFooter>
    </Card>
  </div>
</template>
