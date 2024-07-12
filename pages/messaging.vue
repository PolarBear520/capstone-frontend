<template>
  <AppHeader></AppHeader>

  <div class="chat-container mx-auto p-8 bg-white shadow-md rounded mt-10 mb-10">
    <h2 class="text-2xl font-bold text-center mb-12">You are talking to "seller name"...</h2>
    <div class="messages">
      <div class="message from-seller">
        <div class="profile-section">
          <div class="profile-pic-placeholder"></div>
          <p class="seller-name">Seller</p>
        </div>
        <div class="message-content">Hello! How can I help you?</div>
      </div>
      <div class="message from-buyer">
        <div class="message-content">Your message here...</div>
        <div class="profile-section">
          <div class="profile-pic-placeholder"></div>
          <p class="seller-name">Buyer</p>
        </div>
      </div>
      <!-- More messages can be added here -->
    </div>
    <div class="send-message">
      <input type="file" class="upload-image">
      <textarea v-model="newMessage" placeholder="Type your message..."></textarea>
      <button @click="sendMessage" class="send-button">Send</button>
    </div>
    <router-link to="/message-list" class="back-to-list">Go back to message list</router-link>
  </div>

  <AppBottom></AppBottom>
</template>

<script>
import axios from 'axios';
import AppHeader from '@/components/AppHeader'
import AppBottom from '@/components/AppBottom'

export default {
  components: {
    AppHeader,
    AppBottom
  },
  data() {
    return {
      newMessage: '', // 用于绑定到 textarea 以获取消息输入
    };
  },
  methods: {
    sendMessage() {
      const messageData = {
        sender_id: 1,  // 示例发送者 ID，应该根据实际用户动态设置
        receiver_id: 2, // 示例接收者 ID，也应动态设置
        content: this.newMessage
      };
      axios.post('/api/messages', messageData)
        .then(response => {
          console.log('Message sent successfully', response.data);
          this.newMessage = ''; // 发送后清空消息输入框
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
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
  justify-content: flex-start; 
  margin-bottom: 15px;
}

.from-seller {
  flex-direction: row;
}

.from-buyer {
  flex-direction: row-reverse; 
}

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
}

.profile-pic-placeholder {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #bbb; 
}

.seller-name, .buyer-name {
  font-size: 16px;
  color: #333;
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

.upload-image {
  margin-right: 10px;
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
