import request from '@/utils/request'

// 获取资产类型
export const reqCmdbList = (params) =>
    request.get('/cmdb/cis/', {
        params,
    })
