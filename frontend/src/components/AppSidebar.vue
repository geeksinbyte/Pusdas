<script setup>
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { RouterLink, useRoute } from "vue-router";
import pusdasLogo from "@/assets/logo.svg";
import {
  Cog6ToothIcon,
  RectangleStackIcon,
  UsersIcon,
  ArrowLeftStartOnRectangleIcon,
  DocumentIcon,
  RectangleGroupIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();

const adminMenu = [
  {
    name: "Dashboard",
    icon: RectangleGroupIcon,
    url: "/dashboard",
  },
  {
    name: "Koleksi Perpustakaan",
    icon: RectangleStackIcon,
    url: "/dashboard/collections",
  },
  {
    name: "Anggota",
    icon: UsersIcon,
    url: "/dashboard/users",
  },
  {
    name: "Peminjaman",
    icon: DocumentIcon,
    url: "/dashboard/loans",
  },
];
</script>

<template>
  <Sidebar class="border-none" collapsible="icon">
    <SidebarHeader>
      <div class="flex flex-col items-center justify-center py-4">
        <img :src="pusdasLogo" alt="Pusdas Logo" class="size-12" />
      </div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="menu in adminMenu" :key="menu.name">
              <SidebarMenuButton asChild :isActive="route.path === menu.url">
                <RouterLink :to="menu.url">
                  <component :is="menu.icon" />
                  <span>
                    {{ menu.name }}
                  </span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <RouterLink to="#">
              <ArrowLeftStartOnRectangleIcon />
              <span>Keluar</span>
            </RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
