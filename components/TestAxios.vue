<template>
  <div class="axios-test">
    <h1>Test Axios Configuration</h1>
    <div>
      <p>Token: {{ token }}</p>
      <button @click="testAxiosConfig">Test Axios Request</button>
    </div>
    <div v-if="testResult">
      <h2>Test Result:</h2>
      <p>{{ testResult }}</p>
    </div>
  </div>
</template>

<script>
import axios from '@/axios';  // 导入 axios 实例

export default {
  data() {
    return {
      token: null,
      testResult: null,
    };
  },
  mounted() {
    this.token = localStorage.getItem('token');  // 获取存储在 localStorage 中的 token
  },
  methods: {
    async testAxiosConfig() {
      try {
        const response = await axios.get('/test-endpoint');  // 发送 GET 请求到你的 API 端点
        this.testResult = 'Request succeeded!';
        console.log('Test request successful:', response.data);
      } catch (error) {
        console.error('Test request error:', error);
        this.testResult = `Request failed: ${error.message}`;
      }
    }
  }
}
</script>

<style scoped>
.axios-test {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
button {
  background-color: #4CAF50; /* 绿色 */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>
