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
                    <el-button type="primary" @click="addDialogVisible = true">添加资产</el-button>
                </el-col>
            </el-row>
            <el-table
                :data="cmdbTypeList"
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
                <el-table-column prop="id" label="终端ID"></el-table-column>
                <el-table-column prop="label" label="名称"></el-table-column>
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
                @current-change="cmdbTypeList"
                :current-page="pagination.page"
                :page-size="pagination.size"
                layout="total, prev, pager, next, jumper"
                :total="pagination.total"
                style="margin-top: 20px"
            ></el-pagination>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { reqCmdbTypeList } from '@/api/cmdb/citype'

// 获取资产类型数据
const pagination = ref({
    total: 0,
    page: 1,
    size: 15,
})
const cmdbTypeList = ref([])
const getCmdbTypeList = (page = 1) => {
    if (typeof page !== 'number' || page <= 0) page = 1
    reqCmdbTypeList({
        page,
    }).then((response) => {
        cmdbTypeList.value = response.results
        pagination.value = response.pagination
    })
}
getCmdbTypeList()
</script>

<style lang="less" scoped></style>
