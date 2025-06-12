<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useAuthStore } from "@/stores/authStore";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = toTypedSchema(
  z.object({
    id: z
      .string()
      .regex(/^\d+$/, "ID harus berupa angka")
      .max(10, "ID maksimal 10 digit"),
    password: z.string().min(1, "Wajib diisi").max(50),
  })
);

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
});

const authStore = useAuthStore();

const onSubmit = handleSubmit(async (values) => {
  const success = await authStore.login({
    id: values.id,
    password: values.password,
  });
  if (!success) {
    if (authStore.error?.includes("tidak ditemukan")) {
      alert("ID tidak ditemukan");
    } else if (authStore.error?.includes("Sandi salah")) {
      alert("Password salah");
    } else {
      alert(authStore.error || "Terjadi kesalahan, silakan coba lagi nanti.");
    }
  }
});
</script>

<template>
  <form @submit="onSubmit">
    <FormField
      v-slot="{ componentField }"
      name="id"
      :validate-on-blur="!isFieldDirty"
    >
      <FormItem v-auto-animate class="mb-4">
        <FormLabel class="text-secondary">ID Anggota</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Masukkan ID Anggota"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="password"
      :validate-on-blur="!isFieldDirty"
    >
      <FormItem v-auto-animate class="mb-12">
        <FormLabel class="text-secondary">Password</FormLabel>
        <FormControl>
          <Input
            type="password"
            placeholder="Masukkan password"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="w-full" :disabled="authStore.loading">
      Masuk
    </Button>
  </form>
</template>
