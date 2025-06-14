<script setup>
import { ref } from "vue";
import SearchBar from "@/components/shared/SearchBar.vue";
import TableMember from "../components/table/TableMember.vue";

const searchQuery = ref(""); // dari input
const selectedOption = ref(""); // dari select (jika dipakai)
</script>

<template>
  <SearchBar
    v-model:searchText="searchQuery"
    v-model:selectedOption="selectedOption"
    :selectItems="[
      { value: 'all', label: 'Semua' },
      { value: 'siswa', label: 'siswa' },
      { value: 'guru', label: 'guru' },
      { value: 'pustakawan', label: 'Pustakawan' },
    ]"
    selectPlaceholder="Filter Role"
    inputPlaceholder="Cari nama anggota..."
    selectGroupLabel="Role"
  />

  <div class="mt-8">
    <TableMember
      :searchQuery="searchQuery"
      :filterRole="selectedOption"
      colSpan="col-span-3"
    />
  </div>
</template>
