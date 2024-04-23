import request from '@/utils/request'

// 获取构建项目的列表
export const reqJobList = () => request.get('/release/jenkins/')

// 添加构建应用的接口
export const addJobApp = (params) => request.post('/release/app/', params)

// 进行构建项目
export const buildJob = (params) => request.put('/release/jenkins/build/', params)
