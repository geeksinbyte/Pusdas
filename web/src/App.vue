<script setup>
import { RouterView } from "vue-router";
import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";
</script>
<template>
  <Toaster class="fixed z-50" />
  <RouterView />
</template>
