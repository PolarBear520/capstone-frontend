<template>
  <AppHeader></AppHeader>

  <div class="chat-list-container mx-auto p-8 bg-white shadow-md rounded mt-10 mb-10">
    <h2 class="text-2xl font-bold text-center mb-12">Your Conversations</h2>
    <div class="conversations">
      <div v-for="(message, index) in latestMessages" :key="index" class="conversation">
        <div class="conversation-header">
          <p class="username">{{ getOtherUser(message) }}</p>
          <p class="timestamp">{{ message.timestamp }}</p>
        </div>
        <p class="message-preview">{{ message.content }}</p>
      </div>
    </div>
  </div>

  <AppBottom></AppBottom>
</template>

<script>
import axios from 'axios';
import AppHeader from '@/components/AppHeader';
import AppBottom from '@/components/AppBottom';

export default {
  components: {
    AppHeader,
    AppBottom
  },
  data() {
    return {
      messages: [], // 用于存储获取的消息
      latestMessages: [], // 用于存储每个对话的最新消息
      userId: 1 // 当前登录用户 ID，应动态设置
    };
  },
  mounted() {
    this.getMessages();
  },
  methods: {
    getMessages() {
      axios.get(`/api/messages/user/${this.userId}`)
        .then(response => {
          this.messages = response.data;
          this.extractLatestMessages();
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    },
    extractLatestMessages() {
      const conversations = {};

      // 将每条消息分类到每个对话中
      this.messages.forEach(message => {
        const otherUserId = message.sender_id === this.userId ? message.receiver_id : message.sender_id;
        if (!conversations[otherUserId] || new Date(message.timestamp) > new Date(conversations[otherUserId].timestamp)) {
          conversations[otherUserId] = message;
        }
      });

      // 获取每个对话的最新消息
      this.latestMessages = Object.values(conversations);
    },
    getOtherUser(message) {
      return message.sender_id === this.userId ? `User ${message.receiver_id}` : `User ${message.sender_id}`;
    }
  }
};
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
}

.conversation-header {
  display: flex;
  justify-content: space-between;
}

.username {
  font-size: 16px;
  color: #333;
}

.timestamp {
  font-size: 14px;
  color: #999;
}

.message-preview {
  font-size: 14px;
  color: #666;
}
</style>
