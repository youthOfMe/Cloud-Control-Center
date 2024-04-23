import request from '@/utils/request'

// 获取应用列表的接口
export const reqAppList = (params) => request.get('/release/app/', { params })

// 添加应用的接口
export const addApp = (params) => request.post('/release/app/', params)
