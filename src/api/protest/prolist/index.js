import request from '@/utils/request'

// 获取项目列表的接口
export const reqProList = (params) =>
    request.get('/protest/prolist/', {
        params,
    })

// 添加项目的接口
export const addProject = (params) => request.post('/protest/prolist/', params)
