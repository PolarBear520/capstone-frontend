<template>
  <div class="flex flex-col justify-center items-center">
    <div class="flex items-center justify-center w-4/5 product-card">
      <div class="w-1/2">
        <v-carousel hide-delimiters>
          <v-carousel-item
            v-for="item in product.images"
            :src="item"
            cover
          ></v-carousel-item>
        </v-carousel>
      </div>
      <div class="flex flex-col justify-start ml-9">
        <h3>{{ product.title }}</h3>
        <h3>C ${{ product.price }}</h3>
        <p>{{ product.description }}</p>
        <div class="flex flex-col justify-start">
          <button class="btn" @click="buyNow">Buy It Now</button>
          <button v-if="showTalkToSeller" class="btn mt-2" @click="talkToSeller">Please Talk to Seller</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const { productApi } = useApi();
const { data: product } = await useAsyncData(() => productApi.getById(id));
// const { data: product } = await useFetch("https://dummyjson.com/products/6");

const showTalkToSeller = ref(false);

const buyNow = async () => {
  showTalkToSeller.value = true;  // 显示 "Please Talk to Seller" 按钮
  try {
    // 创建订单
    const orderResponse = await axios.post('http://localhost:8081/api/orders', { productId: id });
    console.log('Order created:', orderResponse.data);

    // 创建会话
    const conversationResponse = await axios.post('http://localhost:8081/api/conversations', { user1Id: 1, user2Id: product.value.sellerId });
    console.log('Conversation created:', conversationResponse.data);

    alert('Purchase successful and conversation created!');
  } catch (error) {
    console.error('Error making purchase or creating conversation:', error);
    alert('Purchase failed.');
  }
};

const talkToSeller = () => {
  router.push('/messageList');
};
</script>

<style scoped>
.product-card {
  border: 1px solid #e5e7eb;
  margin-top: 100px;
  margin-bottom: 50px;
  border-radius: 5px;
  padding: 30px;
}
</style>
