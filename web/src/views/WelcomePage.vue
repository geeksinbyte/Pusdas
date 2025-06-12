<script setup>
import { useAuthStore } from "../stores/authStore";
import { useDeviceStore } from "@/stores/useDeviceStore";
import LoginForm from "@/components/LoginForm.vue";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const device = useDeviceStore();
const authStore = useAuthStore();
</script>

<template>
  <main
    class="w-full min-h-screen bg-zinc-100 grid grid-cols-1 md:grid-cols-2 justify-items-center items-center"
  >
    <div>
      <h1 class="text-3xl text-secondary font-semibold text-center">
        Selamat Datang di PUSDAS
      </h1>
      <h2 class="text-2xl text-secondary font-semibold text-center mb-8">
        Perpustakaan Digital Sekolah
      </h2>
      <img src="/src/assets/images/char.png" alt="background" class="w-full" />
    </div>

    <Card v-if="device.isDesktop" class="bg-white border-none drop-shadow-2xl">
      <CardHeader>
        <img
          src="@/assets/logo-full.svg"
          alt="Logo"
          class="size-28 mx-auto mb-4"
        />
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        <Button class="w-full" variant="secondary" :disabled="authStore.loading"
          >Daftar Anggota</Button
        >
      </CardFooter>
    </Card>

    <Drawer v-else>
      <DrawerTrigger class="w-full">
        <Button class="w-4/5 h-12 text-lg rounded-full">Yuk, Masuk</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <img
            src="@/assets/logo-full.svg"
            alt="Logo"
            class="size-28 mx-auto mb-4"
          />
          <DrawerDescription class="text-center text-secondary font-medium">
            Masuk untuk mengakses PUSDAS
          </DrawerDescription>
        </DrawerHeader>
        <div class="px-10">
          <LoginForm />
        </div>
        <DrawerFooter class="px-10 mb-4">
          <DrawerClose class="w-full">
            <Button variant="outline" class="w-full">Tutup</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </main>
</template>
