<template>
  <AppHeader></AppHeader>
  <AppBanner />

  <!-- 登录表单部分 -->
  <div class="login-form-container mx-auto max-w-lg p-6 bg-white shadow-md rounded">
    <h2 class="text-2xl font-bold text-center mb-6">Log in</h2>
    <form @submit.prevent="login">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" v-model="credentials.email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required>
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" v-model="credentials.password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required>
      </div>
      <div class="text-right mb-4 text-sm">
        <router-link to="/reset-password" class="text-blue-500 hover:text-blue-700">Forgot your password?</router-link>
      </div>
      <div class="mb-4 text-center">
        <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Log in</button>
      </div>
      <p class="text-center">
        New users? <router-link to="/register" class="text-blue-600 hover:text-blue-800">Click here to register</router-link>
      </p>
    </form>
  </div>

  <AppBottom></AppBottom>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import AppBanner from '@/components/AppBanner';
import AppBottom from '@/components/AppBottom';
import axios from 'axios';

export default {
  components: {
    AppHeader,
    AppBanner,
    AppBottom
  },
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8081/api/users/login', {
          email: this.credentials.email,
          password: this.credentials.password
        });
        console.log('Login successful:', response);
        alert('Login successful');
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed');
      }
    }
  }
}
</script>

<style scoped>
.login-form-container {
    max-width: 500px;
    margin: 100px auto;
    padding: 40px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.text-sm {
    font-size: 0.875rem; /* Smaller font size for the 'Forgot your password?' link */
}

button {
    width: 100%; /* Ensure button stretches to full width of the form */
}

@media (max-width: 768px) {
    .login-form-container {
        max-width: 90%;
        margin: 50px auto;
        padding: 30px;
    }
}

@media (max-width: 480px) {
    .login-form-container {
        max-width: 100%;
        margin: 20px auto;
        padding: 20px;
    }
}
</style>
