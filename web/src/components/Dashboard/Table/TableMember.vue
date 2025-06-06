<script setup>
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
</script>
<template>
  <Card class="col-span-2 bg-white border-none w-full relative drop-shadow-xl">
    <CardHeader class="px-4">
      <h2 class="text-lg">Daftar Anggota</h2>
    </CardHeader>
    <CardContent>
      <Table class="">
        <TableHeader>
          <TableRow>
            <TableCell class="font-medium text-gray-500"
              >Nama Anggota</TableCell
            >
            <TableCell class="font-medium text-gray-500">Email</TableCell>
            <TableCell class="font-medium text-gray-500"
              >Tanggal Bergabung</TableCell
            >
            <TableCell class="font-medium text-gray-500">Status</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@doe.com</TableCell>
            <TableCell>2 Juni 2025</TableCell>
            <TableCell>Aktif</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>
