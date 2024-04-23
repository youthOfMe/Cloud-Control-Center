<template>
    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="18">
                    <el-input placeholder="请输入内容" v-model="username">
                        <!-- 在模板中会传入时间对象event -->
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="getList(1)"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="addFormVisible = true" class="fr">
                        添加用户
                    </el-button>
                    <div class="clear"></div>
                </el-col>
            </el-row>
            <el-table
                :data="userList"
                style="width: 100%; margin-top: 20px"
                :border="true"
                stripe
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
            >
                <el-table-column prop="id" label="用户ID"></el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="phone" label="联系电话"></el-table-column>
                <el-table-column prop="is_active" label="是否激活">
                    <template #default="{ row }">
                        <el-switch
                            v-model="row.is_active"
                            active-color="#409EFF"
                            inactive-color="#ff4949"
                            @change="handleIsactiveChange(row.id, row.is_active)"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="is_superuser" label="是否为管理员">
                    <template #default="{ row }">
                        <el-switch
                            v-model="row.is_staff"
                            active-color="#409EFF"
                            inactive-color="#ff4949"
                            @change="handleIsStaffChange(row.id, row.is_staff)"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="is_superuser" label="是否为超管">
                    <template #default="{ row }">
                        <el-switch
                            v-model="row.is_superuser"
                            active-color="#409EFF"
                            inactive-color="#ff4949"
                            @change="handleIsSuperChange(row.id, row.is_superuser)"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template #default="{ row }">
                        <el-tooltip content="编辑" placement="bottom" effect="light">
                            <el-button
                                :icon="Edit"
                                @click="reqEditUserData({ id: row.id })"
                            ></el-button>
                        </el-tooltip>
                        <el-tooltip content="分配权限" placement="bottom" effect="light">
                            <el-button :icon="Suitcase" @click="handleAuthorRole(row)"></el-button>
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
                @current-change="getUserList"
                :current-page="pagination.page"
                :page-size="pagination.size"
                layout="total, prev, pager, next, jumper"
                :total="pagination.total"
                style="margin-top: 20px"
            ></el-pagination>
        </el-card>
        <el-dialog v-model="addFormVisible" title="新增用户">
            <add-user @success-submit="successSubmit"></add-user>
        </el-dialog>
        <el-dialog v-model="editVisible" title="编辑用户">
            <edit-user
                :editUserData="editUserData"
                @clearEditUserData="clearEditUserData"
            ></edit-user>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Edit, Delete, Suitcase } from '@element-plus/icons-vue'
import {
    reqUserList,
    patchActiveUser,
    patchStaffUser,
    patchSuperUser,
    reqUserInfo,
    delUser,
} from '@/api/user/user'
import AddUser from './AddUser.vue'
import EditUser from './EditUser.vue'
import { ElMessage } from 'element-plus'
import { useUserInfoStore } from '@/store'
// 查询数据
const userList = ref([])
const pagination = ref({
    total: 0,
    page: 1,
    size: 15,
})

const getUserList = (page = 1) => {
    if (typeof page !== 'number' || page <= 0) page = 1
    reqUserList({
        page,
    }).then((response) => {
        userList.value = response.results
        pagination.value = response.pagination
    })
}
getUserList()

// 增加用户
const addFormVisible = ref(false)
const showAddForm = () => {
    addFormVisible.value = true
}
const successSubmit = () => {
    addFormVisible.value = false
    getUserList()
}

// 是否激活用户功能
const isActiveData = ref({
    id: null,
    data: {
        is_active: null,
    },
})
const handleIsactiveChange = (id, isActive) => {
    isActiveData.value.id = id
    isActiveData.value.data.is_active = isActive
    patchActiveUser(isActiveData.value).then((resposne) => {
        ElMessage({
            type: 'success',
            message: `更改成功！${isActiveData.value.data.is_active ? '已激活！' : '未激活！'}`,
        })
    })
}

// 是否为管理员
const isStaffData = ref({
    id: null,
    data: {
        is_staff: null,
    },
})
const handleIsStaffChange = (id, isStaff) => {
    isStaffData.value.id = id
    isStaffData.value.data.is_staff = isStaff
    patchStaffUser(isStaffData.value).then((resposne) => {
        ElMessage({
            type: 'success',
            message: `更改成功！${isStaffData.value.data.is_staff ? '已授权！' : '未授权！'}`,
        })
    })
}

// 是否为超管
const isSuperData = ref({
    id: null,
    data: {
        is_super: null,
    },
})
const handleIsSuperChange = (id, isSuper) => {
    isSuperData.value.id = id
    isSuperData.value.data.is_super = isSuper
    patchSuperUser(isSuperData.value).then((resposne) => {
        ElMessage({
            type: 'success',
            message: `更改成功！${isSuperData.value.data.is_super ? '已授权！' : '未授权！'}`,
        })
    })
}

// 编辑用户前获取用户信息
const userInfoStore = useUserInfoStore()
const editVisible = ref(false)
const reqEditUserData = (data) => {
    reqUserInfo(data)
        .then((response) => {
            userInfoStore.setUserEditInfo(response)
            editVisible.value = true
        })
        .catch((error) => {
            ElMessage({
                type: 'error',
                message: '获取用户信息失败',
            })
        })
}

// 删除用户的功能
const delUserSubmit = (id) => {
    delUser({ id })
        .then((response) => {
            ElMessage({
                type: 'success',
                message: '删除用户成功！',
            })
            getUserList()
        })
        .catch((error) => {
            ElMessage({
                type: 'error',
                message: '删除用户失败！',
            })
        })
}
</script>

<style lang="less" scoped></style>
