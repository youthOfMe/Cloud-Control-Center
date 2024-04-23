import request from '@/utils/request'

// 获取监控主机列表接口
export const reqMonitorHostList = () => request.get('/monitor/host/')

// 获取主机列表接口
export const reqHostList = () => request.get('/host/')

//  获取监控参数类型
export const reqMonitorParam = () => request.get('/monitor/param/')

// 获取监控通知类型
export const reqNotifTypeList = () => request.get('/monitor/notif/')

// 进行添加监控主机信息
export const addMonitorHost = (param) => request.post('/monitor/host/', param)

// 获取监控数据
export const reqMonitorData = (param) => request.post('/monitor/host/info/', param)

// 获取主机的监控数据
export const reqMonitorHostData = (params) =>
    request.get('/monitor/detail/', {
        params,
    })
