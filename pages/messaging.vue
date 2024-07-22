<template>
  <AppHeader></AppHeader>

  <div class="chat-container mx-auto p-8 bg-white shadow-md rounded mt-10 mb-10">
    <h2 class="text-2xl font-bold text-center mb-12">Conversation ID: {{ conversationId }}</h2>
    <div class="messages">
      <div v-for="message in messages" :key="message.id" :class="['message', { 'from-user': message.senderId === userId, 'from-other': message.senderId !== userId }]">
        <div class="message-content">{{ message.content }}</div>
      </div>
    </div>
    <div class="send-message">
      <textarea v-model="newMessage" placeholder="Type your message..."></textarea>
      <button @click="sendMessage" class="send-button">Send</button>
    </div>
    <router-link to="/messageList" class="back-to-list">Go back to message list</router-link>
  </div>

  <AppBottom></AppBottom>
</template>

<script>
import axios from 'axios';
import AppHeader from '@/components/AppHeader';
import AppBottom from '@/components/AppBottom';
import { useRoute } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

export default {
  components: {
    AppHeader,
    AppBottom
  },
  data() {
    return {
      newMessage: '', // 用于绑定到 textarea 以获取消息输入
      messages: [], // 用于存储会话的全部消息
      userId: null, // 当前用户的ID
      conversationId: null // 当前会话的ID
    };
  },
  async mounted() {
    const route = useRoute();
    this.conversationId = route.query.conversationId;

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        this.userId = decodedToken.userId; // 获取用户ID
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    } else {
      console.warn('No token found');
    }

    await this.getConversationMessages(this.conversationId);
  },
  methods: {
    async getConversationMessages(conversationId) {
      try {
        const response = await axios.get(`http://localhost:8081/api/messages/conversation/${conversationId}`);
        this.messages = response.data;
      } catch (error) {
        console.error('Error fetching conversation messages:', error);
      }
    },
    async sendMessage() {
      const messageData = {
        senderId: this.userId, // 当前用户ID
        conversationId: this.conversationId, // 当前会话ID
        content: this.newMessage
      };
      try {
        const response = await axios.post('http://localhost:8081/api/messages', messageData);
        console.log('Message sent successfully', response.data);
        this.newMessage = ''; // 发送后清空消息输入框
        await this.getConversationMessages(this.conversationId); // 重新获取消息
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px; 
  margin: 0 auto;
  padding: 20px;
  overflow-y: auto;
}

.messages {
  overflow-y: auto;
  flex-grow: 1;
  background-color: #f9f9f9; 
  padding: 20px;
  border-radius: 8px; 
}

.message {
  display: flex;
  margin-bottom: 15px;
}

.from-user {
  justify-content: flex-end; 
}

.from-other {
  justify-content: flex-start; 
}

.message-content {
  padding: 10px 15px;
  background-color: #e0e0e0; 
  border-radius: 15px; 
  max-width: 80%; 
  word-wrap: break-word; 
}

.send-message {
  display: flex;
  align-items: center;
}

textarea {
  flex-grow: 1;
  margin-right: 10px;
}

.send-button {
  min-width: 80px;
}

.back-to-list {
  text-decoration: none;
}
</style>
