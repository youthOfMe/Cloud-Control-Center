import request from '@/utils/request'

// 获取公告列表
export const reqAnnouncementList = (params) =>
    request.get('/operation/announcement/', {
        params,
    })

// 发布公告
export const addAnnouncement = (params) => request.post('/operation/announcement/', params)
