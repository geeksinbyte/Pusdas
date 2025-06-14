<script setup>
import { ref, computed } from "vue";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Card, CardFooter, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";
import { useMemberStore } from "@/stores/member/useMemberStore";

// Tambahkan prop untuk nilai pencarian (dikirim dari SearchBar)
const props = defineProps({
  searchQuery: {
    type: String,
    default: "",
  },
});

const memberStore = useMemberStore();
const members = computed(() => memberStore.members);

// Computed untuk filter anggota berdasarkan searchQuery
const filteredMembers = computed(() => {
  if (!props.searchQuery) return members.value;
  const query = props.searchQuery.toLowerCase();
  return members.value.filter((member) => {
    const id = String(member.id).toLowerCase();
    const nama = member.nama.toLowerCase();
    const tgl = new Date(member.tglDaftar)
      .toLocaleDateString("id-ID")
      .toLowerCase();
    const peran = member.peran.toLowerCase();
    return (
      id.includes(query) ||
      nama.includes(query) ||
      tgl.includes(query) ||
      peran.includes(query)
    );
  });
});

const syncMembers = () => {
  memberStore.fetchMembers();
};
</script>

<template>
  <Card class="col-span-3 bg-white border-none w-full relative drop-shadow-xl">
    <CardContent class="px-2 h-fit">
      <Table>
        <TableHeader>
          <TableRow>
            <template v-if="memberStore.loading">
              <TableHead>
                <Skeleton class="h-4 w-16" />
              </TableHead>
              <TableHead>
                <Skeleton class="h-4 w-32" />
              </TableHead>
              <TableHead>
                <Skeleton class="h-4 w-32" />
              </TableHead>
              <TableHead>
                <Skeleton class="h-4 w-20" />
              </TableHead>
            </template>
            <template v-else>
              <TableHead class="font-medium text-gray-500 rounded-tl-sm">
                ID
              </TableHead>
              <TableHead class="font-medium text-gray-500"> Nama </TableHead>
              <TableHead class="font-medium text-gray-500">
                Tanggal Bergabung
              </TableHead>
              <TableHead class="font-medium text-gray-500 rounded-tr-sm">
                Peran
              </TableHead>
            </template>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="memberStore.loading">
            <TableRow v-for="i in 3" :key="i">
              <TableCell>
                <Skeleton class="h-4 min-w-full" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 min-w-full" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 min-w-full" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 min-w-full" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow v-for="(member, idx) in filteredMembers" :key="member.id">
              <TableCell
                :class="
                  idx === filteredMembers.length - 1 ? 'rounded-bl-sm' : ''
                "
              >
                {{ member.id }}
              </TableCell>
              <TableCell>
                {{ member.nama }}
              </TableCell>
              <TableCell>
                {{ new Date(member.tglDaftar).toLocaleDateString("id-ID") }}
              </TableCell>
              <TableCell
                :class="
                  idx === filteredMembers.length - 1 ? 'rounded-br-sm' : ''
                "
              >
                {{ member.peran }}
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </CardContent>
    <CardFooter class="flex justify-center gap-4">
      <Button variant="outline" class="size-8"><ChevronLeftIcon /></Button>
      1 2 3
      <Button variant="outline" class="size-8"><ChevronRightIcon /></Button>
    </CardFooter>
  </Card>
</template>
