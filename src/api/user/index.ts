import setting from '@/setting'
// 统一管理项目用户相关的接口
import request from '@/utils/request'

// 请求登录
export const reqLogin = (data) => request.post(`login/`, data)

// 请求获取信息
export const reqUserInfo = () => request.get('users/mgr/whoami/')
