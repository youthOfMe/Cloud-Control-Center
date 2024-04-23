import request from '@/utils/request'

export const reqCiList = (params) =>
    request.get('/jumpserver/orgs/tree/', {
        params,
    })
