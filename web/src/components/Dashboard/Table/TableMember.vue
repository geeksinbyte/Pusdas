<script setup>
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ref, onMounted } from "vue";
import axios from "axios";

const members = ref([]);
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000"; // Ganti dengan URL backend Anda

onMounted(async () => {
  try {
    const res = await axios.get(baseURL + "/v1/users"); // Ganti baseURL sesuai backend Anda
    members.value = res.data;
  } catch (err) {
    members.value = [];
  }
});
</script>
<template>
  <Card class="col-span-2 bg-white border-none w-full relative drop-shadow-xl">
    <CardHeader class="px-4">
      <h2 class="text-lg">Daftar Anggota</h2>
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
          <TableRow v-for="member in members" :key="member.id">
            <TableCell>{{ member.nama }}</TableCell>
            <TableCell>{{
              new Date(member.tglDaftar).toLocaleDateString("id-ID")
            }}</TableCell>
            <TableCell>{{ member.peran }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>
