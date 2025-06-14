<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const now = ref(new Date());

function formatDate(date) {
  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const bulan = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const d = date.getDate();
  const m = bulan[date.getMonth()];
  const y = date.getFullYear();
  const h = hari[date.getDay()];
  const jam = date.getHours().toString().padStart(2, "0");
  const menit = date.getMinutes().toString().padStart(2, "0");
  return `${m} ${d}, ${y} | ${h}, ${jam}:${menit}`;
}

let interval;
onMounted(() => {
  interval = setInterval(() => {
    now.value = new Date();
  }, 1000);
});
onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <span>{{ formatDate(now) }}</span>
</template>
