<script setup>
import { Card, CardContent } from "@/components/ui/card";
import { ClockIcon } from "@heroicons/vue/16/solid";
</script>
<template>
  <Card class="bg-white border-none w-full relative drop-shadow-xl">
    <CardContent>
      <h1 class="text-3xl font-semibold">9</h1>
      <p class="text-sm mt-4">Jumlah Keterlambatan</p>
      <ClockIcon class="w-8 h-8 text-primary mt-4 absolute top-2 right-4" />
    </CardContent>
  </Card>
</template>
