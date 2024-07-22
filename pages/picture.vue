<template>
  <div class="container">
    <h1>Upload Image</h1>
    <input type="file" @change="handleFileUpload" />
    <button @click="uploadImage">Upload</button>
    <div v-if="uploadUrl">
      <h2>Uploaded Image URL:</h2>
      <a :href="uploadUrl" target="_blank">{{ uploadUrl }}</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { uploadFile } from '@uploadcare/upload-client';

const file = ref(null);
const uploadUrl = ref('');

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
};

const uploadImage = async () => {
  if (!file.value) {
    alert('Please select an image first.');
    return;
  }

  try {
    const result = await uploadFile(file.value, {
      publicKey: '0d2fe847c47939a3325f',
      store: 'auto'
    });
    uploadUrl.value = result.cdnUrl;
    alert('Image uploaded successfully!');
  } catch (error) {
    console.error('Error uploading image:', error);
    alert('Failed to upload image.');
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
}

h1, h2 {
  margin-bottom: 20px;
}

input[type="file"] {
  display: block;
  margin: 20px auto;
}

button {
  background-color: #007BFF;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

a {
  color: #007BFF;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
