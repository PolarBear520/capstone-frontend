<template>
  <AppHeader></AppHeader>

  <div class="flex">
    <!-- 左侧导航按钮 -->
    <div class="navigation-panel bg-white shadow-lg">
      <h2 class="text-lg font-semibold p-4 border-b">Navigation</h2>
      <div class="flex flex-col p-4">
        <router-link to="/myOrder" class="mb-2 p-2 rounded text-left hover:bg-gray-100 block">My Orders</router-link>
        <router-link to="/my-selling-list" class="mb-2 p-2 rounded text-left hover:bg-gray-100 block">My Selling List</router-link>
        <router-link to="/start-selling" class="mb-2 p-2 rounded text-left hover:bg-gray-100 block">Start Selling</router-link>
        <router-link to="/watch-list" class="mb-2 p-2 rounded text-left hover:bg-gray-100 block">My Watch List</router-link>
      </div>
    </div>

    <!-- 竖线分隔 -->
    <div class="divider bg-gray-300" style="width: 1px;"></div>

    <!-- 右侧销售表单 -->
    <div class="selling-form flex-grow p-4">
      <h2 class="text-xl font-semibold mb-4">Create New Product</h2>
      <form @submit.prevent="submitProduct">
        <div class="mb-4">
          <label for="productName" class="block text-sm font-medium text-gray-700">Product Name</label>
          <input type="text" id="productName" v-model="product.name" class="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none" required>
        </div>
        <div class="mb-4">
          <label for="productDescription" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="productDescription" v-model="product.description" rows="4" class="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none" required></textarea>
          <button type="button" @click="optimizeDescription" class="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Optimize Description</button>
        </div>
        <p v-if="optimizedDescription">Optimized Description: {{ optimizedDescription }}</p>
        <div class="mb-4">
          <label for="productPrice" class="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" id="productPrice" v-model="product.price" class="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none" required>
        </div>
        <div class="mb-4">
          <label for="productImage" class="block text-sm font-medium text-gray-700">Product Image</label>
          <input type="file" id="productImage" @change="handleFileUpload" class="mt-1 block w-full">
          <button type="button" @click="uploadImageToOpenAI" class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload Image to OpenAI</button>
        </div>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit Product
        </button>
      </form>

      <!-- GPT 对话窗口 -->
      <div class="mt-8">
        <h2 class="text-xl font-semibold mb-4">Chat with GPT</h2>
        <div class="chat-window border border-gray-300 rounded p-4 h-64 overflow-y-scroll mb-4">
          <div v-for="(message, index) in chatMessages" :key="index" class="mb-2">
            <p :class="{'text-blue-600': message.role === 'user', 'text-green-600': message.role === 'assistant'}">
              <strong>{{ message.role }}:</strong> {{ message.content }}
            </p>
          </div>
        </div>
        <div class="flex">
          <input type="text" v-model="userMessage" class="flex-grow p-2 border border-gray-300 rounded shadow-sm focus:outline-none" placeholder="Type your message here...">
          <button type="button" @click="sendMessageToGPT" class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
        </div>
      </div>
    </div>
  </div>

  <AppBottom></AppBottom>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import AppHeader from '@/components/AppHeader';
import AppBottom from '@/components/AppBottom';

const product = ref({
  name: '',
  description: '',
  price: null,
  image: null
});
const optimizedDescription = ref('');
const imageFile = ref(null);
const chatMessages = ref([]);
const userMessage = ref('');

function handleFileUpload(event) {
  imageFile.value = event.target.files[0];
}

async function uploadImageToOpenAI() {
  if (!imageFile.value) {
    alert('Please upload an image first.');
    return;
  }

  const formData = new FormData();
  formData.append('file', imageFile.value);
  formData.append('purpose', 'vision'); // 指定合适的用途

  try {
    const response = await axios.post('https://api.openai.com/v1/files', formData, {
      headers: {
        'Authorization': 'Bearer sk-proj-cM7QTrmVjNmPXwkjYWeZT3BlbkFJFi2u2TlmBNjzlOuvIiiZ', // 替换为您的实际 OpenAI API 密钥
        'Content-Type': 'multipart/form-data'
      }
    });
    product.value.image = response.data.id; // 假设响应包含上传文件的 ID
    alert('Image uploaded successfully to OpenAI!');
  } catch (error) {
    console.error('Error uploading image to OpenAI:', error);
    alert('Failed to upload image to OpenAI.');
  }
}

async function optimizeDescription() {
  const messages = [
    { role: "system", content: "Rewrite the following product description to make it more appealing and attractive to potential buyers." },
    { role: "user", content: `Product Name: ${product.value.name}` },
    { role: "user", content: `Product Description: ${product.value.description}` }
  ];

  const data = {
    model: "gpt-4o-mini",
    messages: messages,
    temperature: 0.7,
    max_tokens: 150
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-proj-cM7QTrmVjNmPXwkjYWeZT3BlbkFJFi2u2TlmBNjzlOuvIiiZ' // 再次替换为您的实际 API 密钥
      }
    });
    optimizedDescription.value = response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error optimizing description:', error);
    alert('Failed to optimize description. Check the console for more details.');
  }
}

async function sendMessageToGPT() {
  if (!userMessage.value) return;

  // Add user message to chat
  chatMessages.value.push({ role: 'user', content: userMessage.value });

  const messages = chatMessages.value.map(msg => ({
    role: msg.role,
    content: msg.content
  }));

  const data = {
    model: "gpt-4o-mini",
    messages: messages,
    temperature: 0.7,
    max_tokens: 150
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-proj-cM7QTrmVjNmPXwkjYWeZT3BlbkFJFi2u2TlmBNjzlOuvIiiZ' // 替换为您的实际 API 密钥
      }
    });
    chatMessages.value.push({ role: 'assistant', content: response.data.choices[0].message.content });
    userMessage.value = ''; // Clear input
  } catch (error) {
    console.error('Error sending message to GPT:', error);
    alert('Failed to send message to GPT. Check the console for more details.');
  }
}

async function submitProduct() {
  alert('Product submitted with image ID: ' + product.value.image);
}
</script>

<style scoped>
.navigation-panel {
  width: 200px;
  min-height: 100vh;
}

.divider {
  height: 100vh;
}

.selling-form {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
}

.order-card, .product-form {
  display: flex;
  align-items: center;
}

.chat-window {
  background-color: #f9f9f9;
  max-height: 200px;
  overflow-y: auto;
}
</style>
