<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types';
import { ref } from 'vue';
import { z } from 'zod';

const {register} = useFirebaseAuth()

const toast = useToast()

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Must be at least 6 characters')
})

type Schema = z.output<typeof schema>

const state = ref({
  email: undefined,
  password: undefined
})

async function submit (event: FormSubmitEvent<Schema>) {
  try {
    await register(event.data.email, event.data.password)

    toast.add({
      title: "Redirigiendo al admin...",
      timeout: 2500,
      callback: async() => {
        await navigateTo('/admin')
      }
    })
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    @submit="submit"
  >
    <UFormGroup label="Email" name="email" class="mb-4">
      <UInput v-model.trim="state.email" />
    </UFormGroup>
    <UFormGroup label="Password" name="password" class="mb-4">
      <UInput v-model.trim="state.password" type="password" />
    </UFormGroup>
    <UButton type="submit" class="">
      Submit
    </UButton>
  </UForm>
</template>