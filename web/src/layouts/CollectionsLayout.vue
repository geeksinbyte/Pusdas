<script setup>
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/vue/24/outline";
import { useCategoryStore } from "@/stores/categoryStore";
import { computed, onMounted } from "vue";

const categoryStore = useCategoryStore();
const categories = computed(() => categoryStore.categories);

// Gunakan setSelectedCategory agar perubahan v-model langsung update store
const selectedCategory = computed({
  get: () => categoryStore.selectedCategory,
  set: (value) => categoryStore.setSelectedCategory(value),
});

// Ambil kategori dari API saat komponen dimount
onMounted(() => {
  categoryStore.fetchCategories();
});
</script>

<template>
  <div class="flex w-full justify-end">
    <div class="relative max-w-md items-center">
      <Select v-model="selectedCategory">
        <SelectTrigger
          class="absolute left-2 top-1/2 -translate-y-1/2 px-4 py-0 z-10 w-32 border-0"
        >
          <SelectValue placeholder="Kategori" />
        </SelectTrigger>
        <SelectContent class="mt-1 drop-shadow-sm">
          <SelectGroup>
            <SelectLabel>Kategori</SelectLabel>
            <SelectItem value="semua">Semua</SelectItem>
            <template v-for="cat in categories" :key="cat.ddc">
              <SelectItem :value="cat.ddc">{{ cat.nama }}</SelectItem>
            </template>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        id="search"
        type="text"
        placeholder="Cari Judul, Penulis, atau Kategori"
        class="pl-36 pr-16 text-sm placeholder:text-muted-foreground border-border rounded-full truncate overflow-ellipsis overflow-hidden whitespace-nowrap"
      />
      <Button
        type="button"
        variant="secondary"
        class="absolute right-1 top-1/2 -translate-y-1/2 h-7"
      >
        <MagnifyingGlassIcon class="size-5" />
      </Button>
    </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
    <Card
      class="col-span-3 bg-white border-none w-full relative drop-shadow-xl"
    >
      <CardHeader class="px-4">
        <h2 class="text-lg">Pengetahuan Umum</h2>
      </CardHeader>
      <CardContent class="flex items-center justify-between">
        <Button variant="outline"><ChevronLeftIcon /></Button>
        <div class="grid grid-cols-4 md:grid-cols-6"></div>
        <Button variant="outline"><ChevronRightIcon /></Button>
      </CardContent>
      <CardFooter>
        <Button variant="" class="max-w-sm">Lihat Semua Koleksi</Button>
      </CardFooter>
    </Card>
  </div>
</template>
