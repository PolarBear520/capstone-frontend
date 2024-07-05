<template>
  <AppHeader></AppHeader>

  <div class="message-list-container mx-auto p-8 bg-white shadow-md rounded mt-10 mb-10">
    <div class="message-item" v-for="(seller, index) in sellers" :key="index">
      <div class="profile-section">
        <div class="profile-pic-placeholder"></div>
        <p class="seller-name">Seller {{ index + 1 }}</p>
      </div>
      <div class="message-content">
        <p>message</p>
      </div>
    </div>
    <router-link to="/next-page" class="next-page">Next page</router-link>
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
      sellers: [1, 2, 3, 4] // 示例数据，实际数据可以从 API 获取
    };
  }
};
</script>

<style scoped>
.message-list-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px; /* 根据需要调整最大宽度 */
  margin: 0 auto;
  padding: 20px; /* 增加内容的填充 */
  height: auto; /* 根据内容自动调整高度 */
}
.message-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 40px; /* 每个消息项之间的间距 */
  padding: 20px; /* 增加内容的填充 */
  border: 1px solid #ddd; /* 增加边框使其更明显 */
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
  flex-grow: 1;
  padding: 20px; /* 两倍填充 */
  border-radius: 10px;
  background-color: #f0f0f0;
}
.next-page {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #007BFF;
  text-decoration: none;
}
.next-page:hover {
  text-decoration: underline;
}
</style>
