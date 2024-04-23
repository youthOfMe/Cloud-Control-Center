<template>
    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="18">
                    <el-input placeholder="请输入内容" v-model="serach">
                        <!-- 在模板中会传入时间对象event -->
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="getList(1)"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="showAddForm" class="fr">发布公告</el-button>
                    <div class="clear"></div>
                </el-col>
            </el-row>
            <el-table
                :data="announcementList"
                style="width: 100%; margin-top: 20px"
                :border="true"
                label-width="100px"
                stripe
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
            >
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="id" label="公告ID"></el-table-column>
                <el-table-column prop="user_id" label="用户ID"></el-table-column>
                <el-table-column prop="name" label="公告标题"></el-table-column>
                <el-table-column prop="created_time" label="创建时间"></el-table-column>
                <el-table-column prop="updated_time" label="更新时间"></el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template #default="{ row }">
                        <el-tooltip content="编辑" placement="bottom" effect="light">
                            <el-button
                                size="small"
                                icon="el-icon-edit"
                                @click="handleEdit(row.id)"
                            ></el-button>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="bottom" effect="light">
                            <el-button
                                type="danger"
                                size="small"
                                icon="el-icon-delete"
                                @click="handleDelete(row.id)"
                            ></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                @current-change="getAnnouncementList"
                :current-page="pagination.page"
                :page-size="pagination.size"
                layout="total, prev, pager, next, jumper"
                :total="pagination.total"
                style="margin-top: 20px"
            ></el-pagination>
        </el-card>
        <el-dialog v-model="addFormVisible" title="发布公告">
            <add-announcement @success-submit="successSubmit"></add-announcement>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { reqAnnouncementList } from '@/api/operation/announcement/'
import AddAnnouncement from './AddAnnouncement.vue'

// 获取资产类型数据
const pagination = ref({
    total: 0,
    page: 1,
    size: 15,
})
const announcementList = ref([])
const getAnnouncementList = (page = 1) => {
    if (typeof page !== 'number' || page <= 0) page = 1
    reqAnnouncementList({
        page,
    }).then((response) => {
        announcementList.value = response.results
        pagination.value = response.pagination
    })
}
getAnnouncementList()

// 发布公告
const addFormVisible = ref(false)
const showAddForm = () => {
    addFormVisible.value = true
}
const successSubmit = () => {
    addFormVisible.value = false
}
</script>

<style lang="less" scoped></style>
