<script setup>
import { SidebarProvider } from "@/components/ui/sidebar";
import { RouterView } from "vue-router";
import AppSidebar from "@/components/layout/AppSidebar.vue";
import AppNavbar from "@/components/layout/AppNavbar.vue";
import { useMemberStore } from "@/stores/member/useMemberStore";
import { useBookStore } from "@/stores/book/useBookStore";
import { useCategoryStore } from "@/stores/book/useCategoryStore";
import { onMounted } from "vue";
const memberStore = useMemberStore();
const bookStore = useBookStore();
const categoryStore = useCategoryStore();

onMounted(() => {
  memberStore.fetchMembers();
  bookStore.fetchBooks();
  categoryStore.fetchCategories();
});
</script>

<template>
  <div>
    <SidebarProvider>
      <div class="flex w-full h-screen">
        <AppSidebar />
        <main class="flex relative flex-col w-full">
          <AppNavbar />
          <section
            class="bg-card my-2 ml-2 mr-2 md:mr-4 lg:mr-8 p-4 py-10 h-fit rounded-4xl"
          >
            <router-view />
          </section>
        </main>
      </div>
    </SidebarProvider>
  </div>
</template>
