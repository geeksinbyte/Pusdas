<script setup>
import { SidebarProvider } from "@/components/ui/sidebar";
import { RouterView } from "vue-router";
import AppSidebar from "@/components/AppSidebar.vue";
import AppNavbar from "@/components/AppNavbar.vue";
import { useMemberStore } from "@/stores/memberStore";
import { useBookStore } from "@/stores/bookStore";
import { onMounted } from "vue";
const memberStore = useMemberStore();
const bookStore = useBookStore();

onMounted(() => {
  memberStore.fetchMembers();
  bookStore.fetchBooks();
});
</script>

<template>
  <SidebarProvider>
    <div class="flex w-full h-screen">
      <AppSidebar />
      <main class="flex flex-col w-full">
        <AppNavbar />
        <section
          class="bg-card my-2 ml-2 mr-2 md:mr-4 lg:mr-8 p-4 py-10 h-fit rounded-4xl"
        >
          <router-view />
        </section>
      </main>
    </div>
  </SidebarProvider>
</template>
