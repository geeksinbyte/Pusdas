<script setup>
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowPathIcon } from "@heroicons/vue/16/solid";
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";

const members = ref([]);
const loading = ref(true);
const baseURL = import.meta.env.VITE_API_URL;

// Ambil dari cache saat mounted
onMounted(async () => {
  const cached = localStorage.getItem("members");
  if (cached) {
    members.value = JSON.parse(cached);
    loading.value = false;
  } else {
    loading.value = true;
    try {
      const res = await axios.get(baseURL + "/v1/users");
      members.value = res.data;
    } catch (err) {
      members.value = [];
    } finally {
      loading.value = false;
    }
  }
});

// Simpan ke cache setiap kali members berubah
watch(members, (val) => {
  localStorage.setItem("members", JSON.stringify(val));
});

async function syncMembers() {
  loading.value = true;
  try {
    const res = await axios.get(baseURL + "/v1/users");
    members.value = res.data;
    localStorage.setItem("members", JSON.stringify(res.data));
  } catch (err) {
    members.value = [];
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <Card class="col-span-2 bg-white border-none w-full relative drop-shadow-xl">
    <CardHeader class="px-4 flex items-center justify-between">
      <h2 class="text-lg">Daftar Anggota</h2>
      <Button @click="syncMembers" :disabled="loading" variant="ghost">
        <ArrowPathIcon />
      </Button>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell class="font-medium text-gray-500"
              >Nama Anggota</TableCell
            >
            <TableCell class="font-medium text-gray-500"
              >Tanggal Bergabung</TableCell
            >
            <TableCell class="font-medium text-gray-500">Peran</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="loading">
            <TableRow v-for="i in 3" :key="i">
              <TableCell><Skeleton class="h-4 min-w-full" /></TableCell>
              <TableCell><Skeleton class="h-4 min-w-full" /></TableCell>
              <TableCell><Skeleton class="h-4 min-w-full" /></TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow v-for="member in members" :key="member.id">
              <TableCell>{{ member.nama }}</TableCell>
              <TableCell>{{
                new Date(member.tglDaftar).toLocaleDateString("id-ID")
              }}</TableCell>
              <TableCell>{{ member.peran }}</TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>
