import request from '@/utils/request'

// 获取主机类别的接口
export const reqCategoryList = () => request.get('/host/category/')

// 新增主机类别的接口
export const addHostCategory = (params) => request.post('/host/category/', params)

// 删除主机类别的接口
export const delHostCategory = (id) => request.delete(`/host/category/${id}/`)

// 获取主机列表的接口
export const reqHostList = (params) =>
    request.get('/host/', {
        params,
    })

// 删除主机的接口
export const delHost = (id) => request.delete(`/host/${id}/`)

// 新增主机的接口
export const addHost = (params) => request.post('/host/', params)

// 获取主机详情信息的接口
export const reqHostDetail = (params) =>
    request.get('/host/detail/', {
        params,
    })

// 进行请求服务器信息
export const reqHostMonitor = (params) => request.post('/host/detail/', params)
