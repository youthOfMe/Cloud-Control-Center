<template>
    <div>
        <!-- 组织树 -->
        <el-tree
            :data="ciList"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :props="defaultProps"
            @node-click="handleNodeClick"
        >
            <!-- <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                    <el-button
                        type="text"
                        size="mini"
                        @click="() => handleCommand(['add_group', node, data])"
                    >
                        Append
                    </el-button>
                    <el-button
                        type="text"
                        size="mini"
                        @click="() => handleCommand(['delete', node, data])"
                    >
                        Delete
                    </el-button>
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            <i class="el-icon-setting el-icon--right"></i>
                            操作
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="['add_group', node, data]">
                                增加子分组
                            </el-dropdown-item>
                            <el-dropdown-item :command="['delete', node, data]">
                                删除分组及其子分组
                            </el-dropdown-item>
                            <el-dropdown-item
                                :command="['add_server', node, data]"
                                :disabled="!data.id"
                            >
                                增加主机
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
            </span> -->
        </el-tree>
        <el-card class="host-list">
            <el-row :gutter="20">
                <el-col :span="18">
                    <el-input placeholder="请输入内容">
                        <!-- 在模板中会传入时间对象event -->
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="getList(1)"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6" class="add-col">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>
            <el-table
                :data="hostList"
                style="width: 100%"
                :border="true"
                stripe
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
            >
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="id" label="主机ID"></el-table-column>
                <el-table-column prop="name" label="主机名称"></el-table-column>
                <el-table-column prop="ip" label="主机IP"></el-table-column>
                <el-table-column prop="username" label="用户名称"></el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template #default="{ row }">
                        <router-link
                            class="to_webshell"
                            :to="{ path: `/jumpserver/webshell/${row.id}` }"
                            target="_blank"
                        >
                            <el-tooltip content="WebShell" placement="bottom" effect="light">
                                <el-button size="small" icon="el-icon-monitor"></el-button>
                            </el-tooltip>
                        </router-link>

                        <el-tooltip content="分配权限" placement="bottom" effect="light">
                            <el-button
                                size="small"
                                icon="el-icon-suitcase"
                                @click="handleSetPerm(row)"
                            ></el-button>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="bottom" effect="light">
                            <el-button type="danger" size="small" icon="el-icon-delete"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <!-- <el-pagination
                @current-change="getList"
                :current-page="pagination.page"
                :page-size="pagination.size"
                layout="total, prev, pager, next, jumper"
                :total="pagination.total"
            ></el-pagination> -->
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { reqCiList } from '@/api/jumpserver'

const ciList = ref([])
const getCiList = () => {
    reqCiList().then((response) => {
        console.log(response)
        const vroot = { label: '组织树', parent: null, children: null, id: null }
        vroot.children = response.results
        ciList.value = [vroot]
    })
}
getCiList()
</script>

<style lang="scss" scoped></style>
