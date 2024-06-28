// get  /api/channel
import banner from '~/mockdatabase/banner'

// 通过 defineEventHandler 定义接口
export default defineEventHandler(() => {
  return banner
})
