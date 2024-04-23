import request from '@/utils/request'

// 获取环境列表
export const reqEnvList = () => request.get('/conf/env/')

// 添加环境列表
export const addEnv = (params) => request.post('/conf/env/', params)

// 删除环境列表
export const delEnv = (id) => request.delete(`/conf/env/${id}/`)
