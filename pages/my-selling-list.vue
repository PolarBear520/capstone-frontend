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

    <!-- 右侧订单列表 -->
    <div class="orders-list flex-grow p-4">
      <div v-for="order in orders" :key="order.id" class="order-card p-4 border rounded mb-4 flex" @click="goToProductPage(order.product.productId)">
        <!-- 如果有产品图片，替换掉占位符URL -->
        <img src="https://via.placeholder.com/150" alt="Product Image" class="w-32 h-32 mr-4">
        <div>
          <h3 class="font-bold">{{ order.product.productName }}</h3>
          <p>Order ID: {{ order.id }}</p>
          <p>Product ID: {{ order.product.productId }}</p>
          <p>Buyer ID: {{ order.buyerId }}</p>
          <p>Order Date: {{ new Date(order.orderDate).toLocaleString() }}</p>
          <p>Status: {{ order.status }}</p>
        </div>
      </div>
    </div>
  </div>

  <AppBottom></AppBottom>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import AppHeader from '@/components/AppHeader';
import AppBottom from '@/components/AppBottom';

const orders = ref([]);
const router = useRouter();

const goToProductPage = (productId: number) => {
  router.push(`/product/${productId}`);
};

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8081/api/orders/my-orders');
    orders.value = response.data;
  } catch (error) {
    console.error('Failed to fetch orders:', error);
  }
});
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
}
</style>
