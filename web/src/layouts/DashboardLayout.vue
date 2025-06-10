<script setup>
import StatsMember from "@/components/Dashboard/Stats/StatsMember.vue";
import StatsLoan from "@/components/Dashboard/Stats/StatsLoan.vue";
import StatsOverdue from "@/components/Dashboard/Stats/StatsOverdue.vue";
import StatsCollection from "@/components/Dashboard/Stats/StatsCollection.vue";
import TableCollections from "@/components/Dashboard/Table/TableCollections.vue";
import TableMember from "@/components/Dashboard/Table/TableMember.vue";
</script>
<template>
  <div class="flex items-end mb-4">
    <h1 class="text-4xl font-semibold mr-2">Halo,</h1>
    <h1 class="text-4xl font-semibold text-primary">Admin</h1>
  </div>
  <h2 class="text-xl font-medium mb-8">Jan 12, 2025 | Kamis, 22:12</h2>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
    <StatsMember />
    <StatsLoan />
    <StatsOverdue />
    <StatsCollection />
    <TableMember />
    <TableCollections />
  </div>
</template>
