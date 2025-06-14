<script setup>
import { ref, watch } from "vue";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

// Props
const props = defineProps({
  selectItems: Array,
  selectPlaceholder: String,
  inputPlaceholder: String,
  selectGroupLabel: String,
  defaultSelectValue: [String, Number],
  withoutSelect: Boolean,
});

// Emits
const emit = defineEmits([
  "update:searchText",
  "update:selectedOption",
  "search",
]);

// State
const selectedOption = ref(props.defaultSelectValue ?? "");
const searchText = ref("");

// Emit langsung saat input berubah (biar bisa reactive ke parent)
watch(searchText, (val) => emit("update:searchText", val));
watch(selectedOption, (val) => emit("update:selectedOption", val));

// Emit manual saat tombol search ditekan
function handleSearch() {
  emit("search", {
    selectedOption: selectedOption.value,
    searchText: searchText.value,
  });
}
</script>

<template>
  <div class="flex w-full justify-center">
    <div
      class="flex w-2xl items-center border border-border rounded-full overflow-hidden"
    >
      <!-- Optional: Dropdown Select -->
      <template v-if="!withoutSelect">
        <div class="flex-shrink-0">
          <Select v-model="selectedOption">
            <SelectTrigger class="px-4 py-1 bg-transparent border-0">
              <SelectValue :placeholder="selectPlaceholder" />
            </SelectTrigger>
            <SelectContent class="drop-shadow-sm">
              <SelectGroup>
                <SelectLabel>{{ selectGroupLabel }}</SelectLabel>
                <SelectItem
                  v-for="item in selectItems"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </template>

      <!-- Input Text -->
      <div class="flex-1">
        <Input
          v-model="searchText"
          type="text"
          :placeholder="inputPlaceholder"
          class="w-full text-sm placeholder:text-muted-foreground border-0 focus:ring-0 truncate"
        />
      </div>

      <!-- Search Button -->
      <div class="flex-shrink-0 pr-1">
        <Button
          type="button"
          variant="secondary"
          class="h-7"
          @click="handleSearch"
        >
          <MagnifyingGlassIcon class="size-5" />
        </Button>
      </div>
    </div>
  </div>
</template>
