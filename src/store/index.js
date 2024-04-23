// 创建大仓库
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// 按需导出数据
export * from './modules/user'
export * from './modules/userMessage'
export * from './modules/perm'
