import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useApi } from '~/composables/useApi'; // 确认路径是否正确
import type { LoginParams, LoginResultModel } from '~/apis/login'; // 确认路径是否正确

function storeSetup() {
  const userInfo = ref<LoginResultModel | null>(null); // 确保初始值为 null
  const getUserInfo = computed(() => userInfo.value);
  const isLogin = computed(() => !!userInfo.value?.token);
  const getToken = computed(() => userInfo.value?.token);

  const setUserInfo = (info: LoginResultModel) => {
    userInfo.value = info;
    localStorage.setItem('token', info.token); // 存储 token 到 localStorage
  };

  const login = async (params: LoginParams) => {
    try {
      const { post } = useApi();
      const { data } = await post('/users/login', params);
      setUserInfo(data);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error; // 可以在组件中捕获并处理这个错误
    }
  };

  const clearUserInfo = () => {
    userInfo.value = null;
    localStorage.removeItem('token'); // 清除 localStorage 中的 token
  };

  const logout = async () => {
    try {
      const { post } = useApi();
      await post('/users/logout');
      clearUserInfo();
    } catch (error) {
      console.error('Logout error:', error);
      throw error; // 可以在组件中捕获并处理这个错误
    }
  };

  const count = ref(1);
  const getCount = computed(() => count.value);
  const addCount = () => {
    count.value++;
  };

  return { userInfo, login, logout, getUserInfo, getToken, isLogin, clearUserInfo, count, getCount, addCount, setUserInfo };
}

export const useUserStore = defineStore('app-user', storeSetup, { persist: true });
