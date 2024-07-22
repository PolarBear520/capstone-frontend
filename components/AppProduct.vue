<template>
  <div class="flex flex-col justify-center items-center">
    <div class="flex items-center justify-center w-4/5 product-card" v-if="product">
      <div class="w-1/2">
        <v-carousel hide-delimiters>
          <v-carousel-item :src="product.imageUrl || defaultImage" cover></v-carousel-item>
        </v-carousel>
      </div>
      <div class="flex flex-col justify-start ml-9">
        <h3>{{ product.productName }}</h3>
        <h3>C ${{ product.price }}</h3>
        <p>{{ product.description }}</p>
        <div class="flex flex-col justify-start">
          <button class="btn" @click="buyNow">Buy It Now</button>
          <button v-if="showTalkToSeller" class="btn mt-2" @click="talkToSeller">Please Talk to Seller</button>
        </div>
      </div>
    </div>
    <div v-else class="text-red-500">Loading product...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const product = ref(null);
const showTalkToSeller = ref(false);
const defaultImage = 'https://via.placeholder.com/150'; // 占位符图片URL

const token = ref(null);
const userId = ref(null);

onMounted(() => {
  // 仅在客户端获取 token 和 userId
  token.value = localStorage.getItem('token');
  if (token.value) {
    const decodedToken = jwtDecode(token.value);
    userId.value = decodedToken.userId; // Assuming userId is stored in the 'sub' claim
  }

  fetchProduct();
});

const fetchProduct = async () => {
  try {
    const response = await axios.get(`http://localhost:8081/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    });
    product.value = response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

const buyNow = async () => {
  showTalkToSeller.value = true;  // 显示 "Please Talk to Seller" 按钮
  try {
    // 创建订单
    const orderData = {
      product: { productId: product.value.productId },
      status: 'PENDING',
      orderDate: new Date().toISOString()
    };
    const orderResponse = await axios.post(
      'http://localhost:8081/api/orders',
      orderData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`
        }
      }
    );
    console.log('Order created:', orderResponse.data);

    try {
      // 创建会话
      const conversationData = {
        user1Id: userId.value,
        user2Id: product.value.sellerId
      };
      const conversationResponse = await axios.post(
        'http://localhost:8081/api/conversations',
        conversationData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.value}`
          }
        }
      );
      console.log('Conversation created:', conversationResponse.data);

      alert('Purchase successful and conversation created!');
    } catch (conversationError) {
      console.error('Error creating conversation:', conversationError);
      handleAxiosError(conversationError);
      alert('Purchase succeeded but failed to create conversation.');
    }
  } catch (orderError) {
    console.error('Error creating order:', orderError);
    handleAxiosError(orderError);
    alert('Purchase failed.');
  }
};

const handleAxiosError = (error) => {
  if (error.response) {
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);
  } else if (error.request) {
    console.error('Request data:', error.request);
  } else {
    console.error('Error message:', error.message);
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
