<script setup>
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BellIcon } from "@heroicons/vue/16/solid";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useDeviceStore } from "@/stores/useDeviceStore";
import { useAuthStore } from "@/stores/auth/useAuthStore";

const route = useRoute();

const titles = {
  DashboardLayout: "Dashboard",
  Collections: "Koleksi Perpustakaan",
  Users: "Anggota",
  Loans: "Peminjaman",
  // Tambahkan sesuai kebutuhan
};

const currentTitle = computed(() => titles[route.name] || "Dashboard");

const device = useDeviceStore();
const authStore = useAuthStore();
</script>

<template>
  <nav
    class="flex items-center my-4 ml-2 mr-2 md:mr-4 lg:mr-8 p-2 md:p-2 gap-4"
  >
    <SidebarTrigger />
    <h1 class="text-xl font-semibold">{{ currentTitle }}</h1>
    <BellIcon class="size-6 ml-auto" />
    <span v-if="device.isDesktop" class="flex flex-col items-end">
      <p class="text-sm font-medium">{{ authStore.user.name }}</p>
      <p class="text-sm text-zinc-700">{{ authStore.user.role }}</p>
    </span>
    <Avatar class="size-10">
      <AvatarFallback>
        {{ (authStore.user?.nama || "BN").slice(0, 2).toUpperCase() }}
      </AvatarFallback>
    </Avatar>
  </nav>
</template>
