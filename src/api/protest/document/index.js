import request from '@/utils/request'

// 获取项目用例列表
export const reqDocumentList = (params) =>
    request.get(`/protest/document/`, {
        params,
    })

// 添加项目用例的接口
export const addDocument = (params) => request.post('/protest/document/', params)
