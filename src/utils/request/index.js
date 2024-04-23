// 二次封装axios
import axios from 'axios'
import { ElMessage } from 'element-plus'
import setting from '@/setting'
import { useUserStore } from '@/store'

const userStore = useUserStore()
// 创建axios实例
const request = axios.create({
    baseURL: setting.host,
    timeout: 5000,
})
request.interceptors.request.use((config) => {
    config.headers['Authorization'] = 'Bearer' + ' ' + userStore.token
    return config
})
request.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        console.log(error)
        return Promise.reject()
    },
)

export default request
