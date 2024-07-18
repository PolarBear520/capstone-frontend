import { defineStore } from 'pinia'
import type { LoginParams, LoginResultModel } from '~/apis/login'

function storeSetup() {
  const userInfo = ref<LoginResultModel>()
  const getUserInfo = computed(() => userInfo.value)
  const isLogin = computed(() => !!userInfo.value?.token)
  const getToken = computed(() => userInfo.value?.token)
  const setUserInfo = (info: LoginResultModel) => {
    userInfo.value = info
  }
  const login = async (params: LoginParams) => {
    const { loginApi } = useApi()
    const { data } = await loginApi.login(params)
    userInfo.value = data
    return data
  }
  const clearUserInfo = () => {
    userInfo.value = undefined
  }
  const logout = async () => {
    const { loginApi } = useApi()
    await loginApi.logout()
    clearUserInfo()
  }

  const count = ref(1)
  const getCount = computed(() => count.value)
  const addCount = () => {
    count.value++
  }

  return { userInfo, login, logout, getUserInfo, getToken, isLogin, clearUserInfo, count, getCount, addCount, setUserInfo }
}
export const useUserStore = defineStore('app-user', storeSetup, { persist: true })
