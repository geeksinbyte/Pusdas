import { defineStore } from "pinia";
import { ref } from "vue";

export const useDeviceStore = defineStore("device", () => {
  const isDesktop = ref(window.innerWidth >= 768);

  function handleResize() {
    isDesktop.value = window.innerWidth >= 768;
  }

  if (typeof window !== "undefined") {
    window.addEventListener("resize", handleResize);
  }

  return { isDesktop };
});
