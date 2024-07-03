<template>
  <div>
    <NuxtLayout>
      <v-app>
        <!-- <NuxtPage /> -->
        <NuxtLink to="/"></NuxtLink>
        <NuxtPage />
      </v-app>
    </NuxtLayout>

  </div>
</template>
<script setup>
import { provide, reactive } from 'vue';

// TODO, get data from backend
const state = reactive({ cartCount: 0 });
provide('state', state);
</script>
