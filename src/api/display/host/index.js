import hyRequest from './request'
import request from '@/utils/request'

export function getPowerScreenData() {
    return hyRequest.get({
        url: '/powerscreen',
    })
}

// 主机数量分析
export const reqHostCount = () => request.get('/display/host/count/')

// 主机增量分析
export const reqHostIncrease = () => request.get('/display/host/increase/')

// 主机TOP分析
export const reqHostTop = () => request.get('/display/host/top/')
