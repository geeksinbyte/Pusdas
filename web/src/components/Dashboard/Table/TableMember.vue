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
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";
import { useMemberStore } from "@/stores/memberStore";
import { computed } from "vue";

const memberStore = useMemberStore();
const members = computed(() => memberStore.members);

const syncMembers = () => {
  memberStore.fetchMembers();
};
</script>

<template>
  <Card class="col-span-2 bg-white border-none w-full relative drop-shadow-xl">
    <CardHeader class="px-4 flex items-center justify-between">
      <template v-if="memberStore.loading">
        <Skeleton class="h-6 w-32 rounded" />
        <Skeleton class="h-8 w-8 rounded-full" />
      </template>
      <template v-else>
        <h2 class="text-lg">Daftar Anggota</h2>
        <Button
          @click="syncMembers"
          :disabled="memberStore.loading"
          variant="ghost"
        >
          <ArrowPathIcon />
        </Button>
      </template>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <template v-if="memberStore.loading">
              <TableCell>
                <Skeleton class="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-4 w-20" />
              </TableCell>
            </template>
            <template v-else>
              <TableCell class="font-medium text-gray-500"
                >Nama Anggota</TableCell
              >
              <TableCell class="font-medium text-gray-500"
                >Tanggal Bergabung</TableCell
              >
              <TableCell class="font-medium text-gray-500">Peran</TableCell>
            </template>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="memberStore.loading">
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
