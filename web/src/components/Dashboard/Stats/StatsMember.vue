<script setup>
import { Card, CardContent } from "@/components/ui/card";
import { UserGroupIcon } from "@heroicons/vue/16/solid";
import { useMemberStore } from "@/stores/memberStore";
import { computed } from "vue";

const memberStore = useMemberStore();
const totalMembers = computed(() => memberStore.total);
</script>
<template>
  <Card class="bg-white border-none w-full relative drop-shadow-xl">
    <CardContent>
      <h1 class="text-3xl font-semibold">{{ totalMembers }}</h1>
      <p class="text-sm mt-4">Total Member</p>
      <UserGroupIcon class="w-8 h-8 text-primary mt-4 absolute top-2 right-4" />
    </CardContent>
  </Card>
</template>
