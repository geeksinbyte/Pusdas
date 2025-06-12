<script setup>
import { RouterView } from "vue-router";
import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";
</script>
<template>
  <Toaster />
  <RouterView v-slot="{ Component }">
    <transition
      enter-active-class="duration-500 ease-in-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-500 ease-in-out"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <component :is="Component" />
    </transition>
  </RouterView>
</template>
