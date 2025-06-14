<script setup>
import FormatDate from "@/components/shared/FormatDate.vue";
import StatsMember from "../components/StatsMember.vue";
import StatsLoan from "../components/StatsLoan.vue";
import StatsOverdue from "../components/StatsOverdue.vue";
import StatsCollection from "../components/StatsCollection.vue";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { computed } from "vue";

const authStore = useAuthStore();
const username = computed(() => authStore.user.name);
</script>

<template>
  <div class="flex items-end mb-4">
    <h1 class="text-4xl font-semibold mr-2">Halo,</h1>
    <h1 class="text-4xl font-semibold text-primary">
      {{ username }}
    </h1>
  </div>
  <h2 class="text-xl font-medium mb-8">
    <FormatDate />
  </h2>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
    <StatsMember />
    <StatsLoan />
    <StatsOverdue />
    <StatsCollection />
  </div>
</template>
