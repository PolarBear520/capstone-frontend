<template>
  <AppHeader></AppHeader>

  <div class="flex">
    <!-- 左侧导航按钮 -->
    <div class="navigation-panel bg-white shadow-lg">
      <h2 class="text-lg font-semibold p-4 border-b">My selling list</h2>
      <div class="flex flex-col p-4">
        <button class="mb-2 p-2 rounded text-left hover:bg-gray-100">My order</button>
        <button class="mb-2 p-2 rounded text-left hover:bg-gray-100">My selling list</button>
        <button class="mb-2 p-2 rounded text-left hover:bg-gray-100">Start a selling</button>
        <button class="mb-2 p-2 rounded text-left hover:bg-gray-100">My watch list</button>
      </div>
    </div>

    <!-- 竖线分隔 -->
    <div class="divider bg-gray-300" style="width: 1px;"></div>

    <!-- 右侧销售列表 -->
    <div class="selling-list flex-grow p-4">
      <div v-for="item in sellingItems" :key="item.id" class="item-card p-4 border rounded mb-4 flex">
        <img :src="item.image" alt="Product Image" class="w-32 h-32 mr-4">
        <div>
          <h3 class="font-bold">{{ item.name }}</h3>
          <p>Item ID: {{ item.id }}</p>
          <p>{{ item.price }}</p>
          <p>{{ item.pickupOption }}</p>
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
      sellingItems: [
        { id: '1265159511112', name: 'phone', image: 'path/to/phone.jpg', price: '$5', pickupOption: 'Local pickup' },
        { id: '1265159511113', name: 'item name', image: 'path/to/item1.jpg', price: '$5', pickupOption: 'Local pickup' },
        { id: '1265159511115', name: 'item name', image: 'path/to/item2.jpg', price: '$5', pickupOption: 'Local pickup' },
        // 更多物品...
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

.selling-list {
  flex: 1;
}

.item-card {
  display: flex;
  align-items: center;
}
</style>
