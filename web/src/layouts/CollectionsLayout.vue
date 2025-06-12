<script setup>
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import SearchBar from "@/components/Collections/SearchBar.vue";
</script>

<template>
  <SearchBar />
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
