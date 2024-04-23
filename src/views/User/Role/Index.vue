<template>
    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="18">
                    <el-input placeholder="请输入内容" v-model="name">
                        <!-- 在模板中会传入时间对象event -->
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="getList(1)"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>
            <el-table
                :data="roleList"
                style="width: 100%; margin-top: 20px"
                :border="true"
                stripe
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
            >
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="id" label="用户ID"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template #default="{ row }">
                        <el-tooltip content="编辑" placement="bottom" effect="light">
                            <el-button
                                :icon="Edit"
                                @click="reqEditUserData({ id: row.id })"
                            ></el-button>
                        </el-tooltip>
                        <el-tooltip content="分配权限" placement="bottom" effect="light">
                            <el-button :icon="Suitcase" @click="getPermList(row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="bottom" effect="light">
                            <el-button
                                type="danger"
                                :icon="Delete"
                                @click="delUserSubmit(row.id)"
                            ></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                @current-change="getRoleList"
                :current-page="pagination.page"
                :page-size="pagination.size"
                layout="total, prev, pager, next, jumper"
                :total="pagination.total"
                style="margin-top: 20px"
            ></el-pagination>

            <el-dialog v-model="permVisible" title="分类权限">
                <perm-list></perm-list>
            </el-dialog>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { reqRoleList, reqPermList } from '@/api/user/role'
import { Edit, Delete, Suitcase } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { usePermStore } from '@/store'
import PermList from './permList.vue'

// 获取角色数据
const pagination = ref({
    total: 0,
    page: 1,
    size: 15,
})
const roleList = ref([])
const getRoleList = (page = 1) => {
    if (typeof page !== 'number' || page <= 0) page = 1
    reqRoleList({
        page,
    }).then((response) => {
        roleList.value = response.results
        pagination.value = response.pagination
    })
}
getRoleList()

// 分配权限
const permStore = usePermStore()
const permVisible = ref(false)
const getPermList = (id) => {
    permVisible.value = true
    reqPermList({ id })
        .then((response) => {
            permStore.setPermList(response.allPerms)
            permStore.setSelectIdData(response.permissions)
        })
        .catch((error) => {
            ElMessage({
                type: 'error',
                message: '获取数据失败！',
            })
        })
}
</script>

<style lang="less" scoped></style>
