<template>
  <AppHeader></AppHeader>

  <div class="flex">
    <!-- 左侧导航按钮 -->
    <div class="navigation-panel bg-white shadow-lg">
      <h2 class="text-lg font-semibold p-4 border-b">My Orders</h2>
      <div class="flex flex-col p-4">
        <router-link to="/my-orders" class="mb-2 p-2 rounded text-left hover:bg-gray-100 block">My Orders</router-link>
        <router-link to="/my-selling-list" class="mb-2 p-2 rounded text-left hover:bg-gray-100 block">My Selling List</router-link>
        <router-link to="/start-selling" class="mb-2 p-2 rounded text-left hover:bg-gray-100 block">Start Selling</router-link>
        <router-link to="/watch-list" class="mb-2 p-2 rounded text-left hover:bg-gray-100 block">My Watch List</router-link>
      </div>
    </div>

    <!-- 竖线分隔 -->
    <div class="divider bg-gray-300" style="width: 1px;"></div>

    <!-- 右侧订单列表 -->
    <div class="orders-list flex-grow p-4">
      <div v-for="order in orders" :key="order.order_id" class="order-card p-4 border rounded mb-4 flex">
        <img :src="order.products[0].image" alt="Product Image" class="w-32 h-32 mr-4">
        <div>
          <h3 class="font-bold">{{ order.products[0].name }}</h3>
          <p>Order ID: {{ order.order_id }}</p>
          <p>Total Price: {{ order.total_price }}</p>
          <p>Status: {{ order.status }}</p>
        </div>
      </div>
    </div>
  </div>

  <AppBottom></AppBottom>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AppHeader from '@/components/AppHeader';
import AppBottom from '@/components/AppBottom';

const orders = ref([]);

const userId = 123; // This should be dynamically set based on the logged-in user

onMounted(async () => {
  try {
    const response = await axios.get(`/api/orders/user/${userId}`);
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
}
</style>
