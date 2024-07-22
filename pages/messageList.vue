<template>
  <AppHeader></AppHeader>

  <div class="chat-list-container mx-auto p-8 bg-white shadow-md rounded mt-10 mb-10">
    <h2 class="text-2xl font-bold text-center mb-12">Your Conversations</h2>
    <div class="conversations">
      <div 
        v-for="(conversation, index) in filteredConversations" 
        :key="index" 
        class="conversation"
        @click="goToMessaging(conversation.id)"
      >
        <p class="conversation-id">Conversation ID: {{ conversation.id }}</p>
      </div>
      <div v-if="filteredConversations.length === 0" class="no-conversations">
        <p>No conversations available.</p>
      </div>
    </div>
  </div>

  <AppBottom></AppBottom>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import {jwtDecode} from 'jwt-decode';
import { useRouter } from 'vue-router';
import AppHeader from '@/components/AppHeader';
import AppBottom from '@/components/AppBottom';

const conversations = ref([]);
const filteredConversations = ref([]);
const userId = ref(null);
const router = useRouter();

const getConversations = async () => {
  try {
    const response = await axios.get('http://localhost:8081/api/conversations');
    console.log('API response:', response.data); // 打印 API 响应
    conversations.value = response.data;
    filterConversations();
  } catch (error) {
    console.error('Error fetching conversations:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
  }
};

const filterConversations = () => {
  filteredConversations.value = conversations.value.filter(conversation => 
    conversation.user1Id === userId.value || conversation.user2Id === userId.value
  );
};

const goToMessaging = (conversationId) => {
  router.push({ path: '/messaging', query: { conversationId } });
};

onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId.value = decodedToken.userId; // 假设token中有userId字段
      console.log('Decoded userId:', userId.value);
      getConversations();
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  } else {
    console.warn('No token found');
    getConversations(); // 无 token 也尝试获取会话
  }
});
</script>

<style scoped>
.chat-list-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.conversations {
  flex-grow: 1;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}

.conversation {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  cursor: pointer; /* 添加指针光标以指示可点击 */
}

.conversation:hover {
  background-color: #f0f0f0; /* 鼠标悬停时改变背景颜色 */
}

.conversation-id {
  font-size: 16px;
  color: #333;
}

.no-conversations {
  font-size: 16px;
  color: #999;
}
</style>
