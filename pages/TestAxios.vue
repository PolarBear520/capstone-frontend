<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Decoded Token Information</h1>
    <div v-if="decodedToken" class="bg-gray-100 p-4 rounded shadow">
      <pre>{{ decodedToken }}</pre>
    </div>
    <div v-else class="text-red-500">No token found or failed to decode token.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {jwtDecode} from 'jwt-decode';

const decodedToken = ref(null);

onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      decodedToken.value = jwtDecode(token);
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  } else {
    console.warn('No token found');
  }
});
</script>

<style scoped>
.container {
  max-width: 600px;
  margin-top: 50px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
