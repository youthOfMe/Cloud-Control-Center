import request from '@/utils/request'

// 获取用户列表的接口
export const reqUserList = (params) =>
    request.get('/users/mgr/', {
        params,
    })

// 进行增加用户的接口
export const addUser = (params) => request.post('/users/mgr/', params)

// 进行激活用户
export const patchActiveUser = (params) => request.patch(`/users/mgr/${params.id}/`, params.data)

// 进行设置用户为管理员
export const patchStaffUser = (params) => request.patch(`/users/mgr/${params.id}/`, params.data)

// 进行设置用户为超级管理员
export const patchSuperUser = (params) => request.patch(`/users/mgr/${params.id}/`, params.data)

// 进行编辑用户信息
export const patchUserInfo = (params) => request.patch(`/user/mgr/${params.id}/`, params.data)

// 获取用户信息
export const reqUserInfo = (params) => request.get(`/users/mgr/${params.id}/`)

// 删除用户
export const delUser = (params) => request.delete(`/users/mgr/${params.id}/`)
