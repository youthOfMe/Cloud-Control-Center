import request from '@/utils/request'

// 获取任务模板列表
export const reqTemplateList = (params) =>
    request('/mtask/templates/', {
        params,
    })

// 获取任务模板目录
export const reqTemplateCategory = () => request('/mtask/templates/categorys/')
