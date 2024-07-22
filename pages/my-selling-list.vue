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

    <!-- 右侧产品列表 -->
    <div class="orders-list flex-grow p-4">
      <div v-for="product in products" :key="product.productId" class="order-card p-4 border rounded mb-4 flex justify-between items-center">
        <!-- 使用 product.imageUrl 显示图片 -->
        <img :src="product.imageUrl || 'https://via.placeholder.com/150'" alt="Product Image" class="w-32 h-32 mr-4">
        <div class="flex-1">
          <h3 class="font-bold">{{ product.productName }}</h3>
          <p>Product ID: {{ product.productId }}</p>
          <p>Description: {{ product.description }}</p>
          <p>Price: {{ product.price }}</p>
          <p>Status: {{ product.productStatus }}</p>
          <p>Upload Date: {{ new Date(product.uploadDate).toLocaleString() }}</p>
        </div>
        <button @click="removeProduct(product.productId)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Remove
        </button>
      </div>
    </div>
  </div>

  <AppBottom></AppBottom>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import AppHeader from '@/components/AppHeader';
import AppBottom from '@/components/AppBottom';

const products = ref([]);
const router = useRouter();

const goToProductPage = (productId: number) => {
  router.push(`/product/${productId}`);
};

onMounted(async () => {
  // 解码JWT token
  const token = localStorage.getItem('token');
  let userId = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.userId; // 假设token中有userId字段
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  } else {
    console.warn('No token found');
  }

  // 获取产品列表
  if (userId) {
    try {
      const response = await axios.get(`http://localhost:8081/api/products/seller/${userId}`);
      products.value = response.data;
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }
});

const removeProduct = async (productId: number) => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please log in first.');
    return;
  }

  try {
    await axios.put(
      `http://localhost:8081/api/products/${productId}/status`,
      'REMOVED',
      {
        headers: {
          'Content-Type': 'text/plain',  // 确保请求头中的Content-Type是text/plain
          'Authorization': `Bearer ${token}`
        }
      }
    );
    alert('Product status updated successfully');
    // 更新产品列表，移除已下架产品
    products.value = products.value.filter(product => product.productId !== productId);
  } catch (error) {
    console.error('Failed to update product status:', error);
    alert('Failed to update product status');
  }
};
</script>

<style scoped>
.navigation-panel {
  width: 200px;
  min-height: 100vh;
}

.divider {
  height: 100vh;
}

.orders-list {
  flex: 1;
}

.order-card {
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between; /* 使按钮与产品信息分开 */
}
</style>
