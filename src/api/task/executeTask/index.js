import request from '@/utils/request'

// 执行任务的接口
export const cmdExec = (params) => request.post('/mtask/cmd_exec/', params)
