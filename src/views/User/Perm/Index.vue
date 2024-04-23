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
                    <!-- <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button> -->
                </el-col>
            </el-row>
            <el-table
                :data="permList"
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
                <el-table-column prop="content_type.app_label" label="应用"></el-table-column>
                <el-table-column prop="codename" label="codename"></el-table-column>
            </el-table>

            <el-pagination
                @current-change="getPermList"
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
import { reqPermList } from '@/api/user/perm'

// 获取数据
const pagination = ref({
    total: 0,
    page: 1,
    size: 15,
})
const permList = ref([])
const getPermList = (page = 1) => {
    if (typeof page !== 'number' || page <= 0) page = 1
    reqPermList({
        page,
    }).then((response) => {
        permList.value = response.results
        pagination.value = response.pagination
    })
}
getPermList()
</script>

<style lang="less" scoped></style>
