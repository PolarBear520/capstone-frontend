<template>
    <AppHeader></AppHeader>
  
    <!-- 登录表单 -->
    <div class="login-form-container mx-auto max-w-md p-6 bg-white shadow-md rounded mt-10 mb-10">
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
        <div class="mb-4 text-right">
          <router-link to="/reset-password" class="text-sm text-blue-600 hover:text-blue-800">Forgot your password?</router-link>
        </div>
        <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Log in</button>
      </form>
      <p class="mt-4 text-center">
        New users? <router-link to="/register" class="text-blue-600 hover:text-blue-800">Click here to register</router-link>
      </p>
    </div>
  
    <AppBottom></AppBottom>
  </template>
  
  <script>
  import AppHeader from '@/components/AppHeader'
  import AppBottom from '@/components/AppBottom'
  import axios from 'axios';
  
  export default {
    components: {
      AppHeader,
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
      login() {
        axios.post('/api/login', this.credentials)
          .then(response => {
            console.log('Login successful:', response);
            // Handle successful login, e.g., redirect or save auth token
          })
          .catch(error => {
            console.error('Login error:', error);
            // Handle error, e.g., show user message
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .login-form-container {
    /* Customize the style to match your design needs */
  }
  </style>
  