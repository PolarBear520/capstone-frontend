<template>
  <AppHeader></AppHeader>
  <AppBanner />

  <!-- 重置密码表单 -->
  <div class="reset-password-container mx-auto max-w-lg p-6 bg-white shadow-md rounded mt-20 mb-20">
    <h2 class="text-2xl font-bold text-center mb-6">Let's reset your password</h2>
    <form @submit.prevent="sendResetLink">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Enter your email</label>
        <input type="email" id="email" v-model="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required>
      </div>
      <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Click here to send a reset link</button>
    </form>
  </div>

  <AppBottom></AppBottom>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppBanner from '@/components/AppBanner'
import AppBottom from '@/components/AppBottom'
import axios from 'axios'; // 确保已经安装和配置了 axios

export default {
  components: {
    AppHeader,
    AppBanner,
    AppBottom
  },
  data() {
    return {
      email: '', // 用于绑定表单输入
    };
  },
  methods: {
    sendResetLink() {
      axios.post('/api/reset-password', { email: this.email })
        .then(response => {
          alert('Reset link sent! Check your email.'); // 实际项目中可能需要更复杂的反馈
          console.log(response);
        })
        .catch(error => {
          alert('Error sending reset link'); // 实际项目中可能需要更复杂的错误处理
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
.reset-password-container {
    max-width: 600px;  /* 调整宽度以便居中显示更多内容 */
    margin: 100px auto;  /* 增加顶部和底部的外边距，使其在视觉上更加居中 */
    padding: 50px;  /* 增加内边距，使表单元素间有更多空间 */
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

@media (max-width: 991px) {  /* 适应中小屏幕 */
    .reset-password-container {
        max-width: 90%;
        margin: 50px auto;
        padding: 30px;
    }
}

@media (max-width: 600px) {  /* 适应小型设备 */
    .reset-password-container {
        max-width: 100%;
        margin: 20px auto;
        padding: 20px;
    }
}
</style>
