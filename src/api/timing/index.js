import request from '@/utils/request'

// 获取周期任务列表
export const reqScheduleTaskList = () => request.get('/schedule/tasks/')

// 获取周期类型
export const reqPeriodData = () => request.get('/schedule/periods/')

// 新增定时任务
export const addScheduleTask = (params) => request.post('/schedule/tasks/', params)

// 切换计划任务的激活状态
export const changeScheduleStatus = (id) => request.put(`/schedule/tasks/${id}/`)
