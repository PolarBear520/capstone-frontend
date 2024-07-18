<template>
  <AppHeader></AppHeader>
  <AppBanner />

  <!-- 新添加的注册表单部分 -->
  <div class="register-form-container mx-auto max-w-lg p-6 bg-white shadow-md rounded">
      <h2 class="text-2xl font-bold text-center mb-6">Register</h2>
      <form @submit.prevent="submitRegistration">
          <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" v-model="user.email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required>
          </div>
          <div class="mb-4">
              <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
              <input type="text" id="username" v-model="user.username" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required>
          </div>
          <div class="mb-4">
              <label for="password" class="block text-sm font-medium text-gray-700">Create a password</label>
              <input type="password" id="password" v-model="user.password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required>
          </div>
          <div class="mb-4">
              <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm password</label>
              <input type="password" id="confirm-password" v-model="user.confirmPassword" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required>
          </div>
          <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
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
      user: {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    async submitRegistration() {
      if (this.user.password !== this.user.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const response = await axios.post('http://localhost:8081/api/users/register', {
          email: this.user.email,
          username: this.user.username,
          password: this.user.password
        });
        console.log(response);
        alert('Registration successful');
      } catch (error) {
        console.error('There was an error registering the user:', error);
        alert('Registration failed');
      }
    }
  }
}
</script>

<style scoped>
.register-form-container {
    max-width: 500px;
    margin: 100px auto;
    padding: 40px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

@media (max-width: 768px) {
    .register-form-container {
        max-width: 90%;
        margin: 50px auto;
        padding: 30px;
    }
}

@media (max-width: 480px) {
    .register-form-container {
        max-width: 100%;
        margin: 20px auto;
        padding: 20px;
    }
}
</style>
