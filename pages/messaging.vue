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
        <p class="message-content">Hello! How can I help you?</p>
      </div>
      <div class="message from-buyer">
        <p class="message-content">Your message here...</p>
        <div class="profile-section">
          <div class="profile-pic-placeholder"></div>
          <p class="seller-name">Buyer</p>
        </div>
      </div>
      <!-- More messages can be added here -->
    </div>
    <div class="send-message">
      <input type="file" class="upload-image">
      <textarea placeholder="Type your message..."></textarea>
      <button class="send-button">Send</button>
    </div>
    <router-link to="/message-list" class="back-to-list">Go back to message list</router-link>
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
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px; /* 调整最大宽度 */
  margin: 0 auto;
  padding: 20px; /* 调整内容的填充 */
  height: auto; /* 自动调整高度 */
}
.messages {
  overflow-y: auto;
  flex-grow: 1; /* 使消息区域在可用空间中扩展 */
  margin-bottom: 20px; /* 保持与发送消息区域的间距 */
}
.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 40px; /* 增加间距 */
}
.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px; /* 与消息内容的间距 */
}
.profile-pic-placeholder {
  width: 80px; /* 两倍宽度 */
  height: 80px; /* 两倍高度 */
  border-radius: 50%;
  background-color: black; /* 黑色圆圈 */
}
.seller-name {
  font-size: 18px; /* 字体大小 */
  color: #333; /* 字体颜色 */
  text-align: center; /* 居中对齐 */
  margin-top: 10px; /* 与头像的间距 */
}
.message-content {
  max-width: 60%;
  padding: 20px; /* 两倍填充 */
  border-radius: 10px;
  background-color: #f0f0f0;
  margin: 0 20px; /* 与头像的间距 */
}
.send-message {
  display: flex;
  align-items: center;
  margin-bottom: 20px; /* 增加与底部按钮的间距 */
}
.upload-image {
  margin-right: 20px; /* 调整为在输入框左边 */
}
textarea {
  width: 100%;
  height: 150px; /* 调整高度 */
  padding: 20px; /* 调整填充 */
  margin-right: 20px; /* 增加间距 */
  resize: none;
}
.send-button {
  background-color: #007BFF;
  color: white;
  padding: 20px 40px; /* 调整填充 */
  border: none;
  border-radius: 10px; /* 调整圆角 */
  cursor: pointer;
}
.send-button:hover {
  background-color: #0056b3;
}
.back-to-list {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #007BFF;
  text-decoration: none;
}
.back-to-list:hover {
  text-decoration: underline;
}
</style>
