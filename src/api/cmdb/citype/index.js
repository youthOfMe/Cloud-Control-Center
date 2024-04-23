import request from '@/utils/request'

// 获取资产类型
export const reqCmdbTypeList = (params) =>
    request.get('/cmdb/citypes/', {
        params,
    })
