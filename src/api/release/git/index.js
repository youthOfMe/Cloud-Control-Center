import request from '@/utils/request'

// 获取git仓库列表
export const reqGitList = (params) => request.get('/release/gitlab/', { params })

// 获取仓库分支列表
export const reqBranchList = (id) => request.get(`/release/gitlab/${id}/branchs/`)

// 获取历史版本列表
export const reqCommitList = (id) => request.get(`/release/gitlab/${id}/commits/`)

// 新增仓库
export const addGit = (params) => request.post('/release/gitlab/', params)
