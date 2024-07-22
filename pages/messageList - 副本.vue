<template>
  <AppHeader></AppHeader>

  <div class="chat-list-container mx-auto p-8 bg-white shadow-md rounded mt-10 mb-10">
    <h2 class="text-2xl font-bold text-center mb-12">Your Conversations</h2>
    <div class="conversations">
      <div v-for="(conversation, index) in conversations" :key="index" class="conversation" @click="goToMessaging(conversation.id)">
        <div class="conversation-header">
          <p class="username">{{ getOtherUser(conversation) }}</p>
          <p class="timestamp">No messages yet</p>
        </div>
        <p class="message-preview">No messages yet</p>
        <p class="conversation-id">Conversation ID: {{ conversation.id }}</p>
      </div>
    </div>
  </div>

  <AppBottom></AppBottom>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import AppHeader from '@/components/AppHeader';
import AppBottom from '@/components/AppBottom';

export default {
  components: {
    AppHeader,
    AppBottom
  },
  data() {
    return {
      conversations: [], // 用于存储获取的会话
      userId: 1 // 当前登录用户 ID，应动态设置
    };
  },
  mounted() {
    this.getConversations();
  },
  methods: {
    getConversations() {
      axios.get(`/api/conversations`)
        .then(response => {
          this.conversations = response.data;
        })
        .catch(error => {
          console.error('Error fetching conversations:', error);
        });
    },
    getOtherUser(conversation) {
      return conversation.user1Id === this.userId ? `User ${conversation.user2Id}` : `User ${conversation.user1Id}`;
    },
    goToMessaging(conversationId) {
      const router = useRouter();
      router.push({ path: '/messaging', query: { conversationId } });
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
  cursor: pointer;
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

.conversation-id {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
</style>
