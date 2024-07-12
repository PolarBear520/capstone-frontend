import { Notification } from '@arco-design/web-vue'
import { useUserStore } from '~/stores/user.store'

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()
  if (!userStore.isLogin) {
    Notification.warning('Please login in!')
    return navigateTo({ path: '/', query: { redirect: to.path } })
  }
})
