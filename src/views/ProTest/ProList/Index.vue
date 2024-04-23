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
                    <el-button type="primary" @click="showAddForm" class="fr">添加项目</el-button>
                    <div class="clear"></div>
                </el-col>
            </el-row>
            <el-table
                :data="proList"
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
                <el-table-column prop="id" label="项目ID"></el-table-column>
                <el-table-column prop="user_id" label="负责人ID"></el-table-column>
                <el-table-column prop="pro_name" label="项目名称"></el-table-column>
                <el-table-column prop="pro_desc" label="项目描述"></el-table-column>
                <el-table-column prop="pro_start_time" label="开始时间"></el-table-column>
                <el-table-column prop="pro_end_time" label="结束时间"></el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template #default="{ row }">
                        <el-tooltip content="编辑" placement="bottom" effect="light">
                            <el-button :icon="Edit" @click="handleEdit(row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="bottom" effect="light">
                            <el-button
                                type="danger"
                                :icon="Delete"
                                @click="handleDelete(row.id)"
                            ></el-button>
                        </el-tooltip>
                        <el-tooltip content="添加用例" placement="bottom" effect="light">
                            <el-button
                                :icon="DocumentAdd"
                                @click="showAddApiForm(row.id)"
                            ></el-button>
                        </el-tooltip>
                        <el-tooltip content="用例列表" placement="bottom" effect="light">
                            <el-button :icon="Document" @click="viewApiList(row.id)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                @current-change="getProList"
                :current-page="pagination.page"
                :page-size="pagination.size"
                layout="total, prev, pager, next, jumper"
                :total="pagination.total"
                style="margin-top: 20px"
            ></el-pagination>
        </el-card>
        <el-dialog v-model="addFormVisible" title="添加项目">
            <add-pro @success-submit="successSubmit(proList)"></add-pro>
        </el-dialog>
        <el-dialog v-model="addApiFormVisible" title="添加用例">
            <add-document @success-submit="successSubmitApi()" :proId="proId"></add-document>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { reqProList } from '@/api/protest/prolist'
import AddPro from './AddPro.vue'
import AddDocument from './AddDocument.vue'
import { Edit, Delete, DocumentAdd, Document } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 获取项目列表数据
const pagination = ref({
    total: 0,
    page: 1,
    size: 15,
})
const proList = ref([])
const getProList = (page = 1) => {
    if (typeof page !== 'number' || page <= 0) page = 1
    reqProList({ page }).then((response) => {
        proList.value = response.results
        pagination.value = response.pagination
    })
}
getProList()

// 添加项目
const addFormVisible = ref(false)
const showAddForm = () => {
    addFormVisible.value = true
}
const successSubmit = () => {
    addFormVisible.value = false
    getProList()
}

// 查看用例列表
const viewApiList = (id) => {
    router.push(`/protest/documentList?id=${id}`)
}

// 添加用例
const addApiFormVisible = ref(false)
const proId = ref()
const showAddApiForm = (id) => {
    proId.value = id
    addApiFormVisible.value = true
}
const successSubmitApi = () => {
    addApiFormVisible.value = false
}
</script>

<style lang="less" scoped></style>
