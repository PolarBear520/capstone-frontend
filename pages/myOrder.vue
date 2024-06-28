<template>
  <AppHeader></AppHeader>

  <div class="flex">
    <!-- 左侧导航按钮 -->
    <div class="navigation-panel bg-white shadow-lg">
      <h2 class="text-lg font-semibold p-4 border-b">My order</h2>
      <div class="flex flex-col p-4">
        <!-- 使用 router-link 代替 button 实现页面跳转 -->
        <router-link to="/my-orders" class="mb-2 p-2 rounded text-left hover:bg-gray-100 block">My order</router-link>
        <router-link to="/my-selling-list" class="mb-2 p-2 rounded text-left hover:bg-gray-100 block">My selling list</router-link>
        <router-link to="/start-selling" class="mb-2 p-2 rounded text-left hover:bg-gray-100 block">Start a selling</router-link>
        <router-link to="/watch-list" class="mb-2 p-2 rounded text-left hover:bg-gray-100 block">My watch list</router-link>
      </div>
    </div>

    <!-- 竖线分隔 -->
    <div class="divider bg-gray-300" style="width: 1px;"></div>

    <!-- 右侧订单列表 -->
    <div class="orders-list flex-grow p-4">
      <div v-for="order in orders" :key="order.id" class="order-card p-4 border rounded mb-4 flex">
        <img :src="order.image" alt="Product Image" class="w-32 h-32 mr-4">
        <div>
          <h3 class="font-bold">{{ order.name }}</h3>
          <p>Order ID: {{ order.id }}</p>
          <p>Price: {{ order.price }}</p>
          <p>Status: {{ order.status }}</p>
        </div>
      </div>
      <p class="text-center">you have reached the bottom</p>
    </div>
  </div>

  <AppBottom></AppBottom>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppBottom from '@/components/AppBottom'

export default {
  components: {
    AppHeader,
    AppBottom
  },
  data() {
    return {
      orders: [
        { id: '1265159511112', name: 'phone', image: 'path/to/phone.jpg', price: '$5', status: 'Shipped' },
        { id: '1265159511113', name: 'item name', image: 'path/to/item1.jpg', price: '$5', status: 'Pending' },
        { id: '1265159511115', name: 'item name', image: 'path/to/item2.jpg', price: '$5', status: 'Delivered' },
        // 更多订单...
      ]
    };
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

.orders-list {
  flex: 1;
}

.order-card {
  display: flex;
  align-items: center;
}
</style>
