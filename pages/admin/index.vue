<script setup lang="ts">

definePageMeta({
  middleware: "auth"
})

const {logout, infoCurrentUser} = useFirebaseAuth()

</script>

<template>
  <div>
    <h1>Admin (ruta protegida)</h1>
    <h2>{{ infoCurrentUser?.email }}</h2>
    <h2>{{ infoCurrentUser?.uid }}</h2>
    <UButton @click="logout">Salir</UButton>
  </div>
</template>