<script setup>
import { Card, CardContent } from "@/components/ui/card";
import { BookOpenIcon } from "@heroicons/vue/16/solid";
import { useBookStore } from "@/stores/book/useBookStore";
import { computed } from "vue";

const bookStore = useBookStore();
const totalBooks = computed(() => bookStore.total);
</script>
<template>
  <Card class="bg-white border-none w-full relative drop-shadow-xl">
    <CardContent>
      <h1 class="text-3xl font-semibold">{{ totalBooks }}</h1>
      <p class="text-sm mt-4">Total Koleksi Buku</p>
      <BookOpenIcon class="w-8 h-8 text-primary mt-4 absolute top-2 right-4" />
    </CardContent>
  </Card>
</template>
