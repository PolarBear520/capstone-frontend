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
          <input type="text" id="productName" v-model="product.productName" class="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none" required>
        </div>
        <div class="mb-4">
          <label for="productDescription" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="productDescription" v-model="product.description" rows="4" class="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none" required></textarea>
          <button type="button" @click="generateDescription" class="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Generate Description with AI</button>
        </div>
        <div class="mb-4">
          <label for="productPrice" class="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" id="productPrice" v-model="product.price" class="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none" required>
        </div>
        <div class="mb-4">
          <label for="productImage" class="block text-sm font-medium text-gray-700">Product Image</label>
          <input type="file" id="productImage" @change="handleFileUpload" class="mt-1 block w-full">
          <button type="button" @click="uploadImageToCloud" class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload Image to Cloud</button>
        </div>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit Product
        </button>
      </form>
    </div>
  </div>

  <AppBottom></AppBottom>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import AppHeader from '@/components/AppHeader';
import AppBottom from '@/components/AppBottom';

const product = ref({
  productName: '',
  description: '',
  price: '',
  productStatus: '',
  uploadDate: '',
  sellerId: '',
  imageUrl: '' // 添加imageUrl属性
});
const imageFile = ref(null);
const imageUrl = ref('');
const decodedToken = ref(null);

function handleFileUpload(event) {
  imageFile.value = event.target.files[0];
}

async function uploadImageToCloud() {
  if (!imageFile.value) {
    alert('Please upload an image first.');
    return;
  }

  const formData = new FormData();
  formData.append('file', imageFile.value);
  formData.append('UPLOADCARE_PUB_KEY', '0d2fe847c47939a3325f'); // 替换为您的实际公钥

  try {
    const response = await axios.post('https://upload.uploadcare.com/base/', formData);
    imageUrl.value = `https://ucarecdn.com/${response.data.file}/`; // 假设响应包含上传文件的 URL
    product.value.imageUrl = imageUrl.value; // 将返回的URL保存到product对象中
    alert('Image uploaded successfully to Cloud!');
  } catch (error) {
    console.error('Error uploading image to Cloud:', error);
    alert('Failed to upload image to Cloud.');
  }
}

async function generateDescription() {
  if (!product.value.imageUrl) {
    alert('Please upload an image first.');
    return;
  }

  const apiKey = 'sk-proj-cM7QTrmVjNmPXwkjYWeZT3BlbkFJFi2u2TlmBNjzlOuvIiiZ'; // 替换为您的实际OpenAI API密钥
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const data = {
    model: 'gpt-4-turbo',
    messages: [
      {
        role: 'user',
        content: [
          { 
            type: 'text', 
            text: "This is an image of a product that a user wants to list on a second-hand trading website. Generate an accurate and appealing product description based on this image, aimed at providing potential buyers with clear and precise information, without exaggeration." 
          },
          { 
            type: 'image_url', 
            image_url: { url: product.value.imageUrl } 
          }
        ]
      }
    ],
    max_tokens: 300
  };

  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });
    product.value.description = response.data.choices[0].message.content; // 自动将生成的描述放到描述窗口
  } catch (error) {
    console.error('Error generating description:', error);
    alert('Failed to generate description.');
  }
}

onMounted(() => {
  // 解码JWT token并提取userId作为sellerId
  const token = localStorage.getItem('token');
  if (token) {
    try {
      decodedToken.value = jwtDecode(token);
      product.value.sellerId = decodedToken.value.userId; // 使用userId作为sellerId
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  } else {
    console.warn('No token found');
  }
});

async function submitProduct() {
  const apiUrl = 'http://localhost:8081/api/products';
  product.value.uploadDate = new Date().toISOString().split('T')[0]; // 设置上传日期
  product.value.productStatus = 'AVAILABLE'; // 设置产品状态
  try {
    console.log('Submitting product:', product.value);
    const response = await axios.post(apiUrl, product.value, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Product created:', response.data);
    alert('Product created successfully!');
  } catch (error) {
    console.error('Error creating product:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    alert('Failed to create product. Please try again.');
  }
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
</style>
