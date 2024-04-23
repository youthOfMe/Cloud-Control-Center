import request from '@/utils/request'

// 获取权限列表数据
export const reqPermList = (params) =>
    request.get('/users/perms/', {
        params,
    })
