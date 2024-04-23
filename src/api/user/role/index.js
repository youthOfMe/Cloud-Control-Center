import request from '@/utils/request'

// 获取角色列表数据
export const reqRoleList = (params) =>
    request.get('/users/roles/', {
        params,
    })

// 获取角色对应的权限数据
export const reqPermList = (params) => request.get(`users/roles/${params.id}/perms/`)
