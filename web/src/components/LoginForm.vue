<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";

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

const onSubmit = handleSubmit((values) => {
  console.log("Form submitted!", values);
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
    <Button type="submit" class="w-full"> Masuk </Button>
  </form>
</template>
