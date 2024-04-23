<template>
    <p class="title">磁盘信息</p>
    <el-table :data="data.disk_info" style="width: 100%" border>
        <el-table-column prop="device" label="路径" />
        <el-table-column prop="total" label="硬盘总量" />
        <el-table-column prop="used" label="被使用量" />
        <el-table-column prop="free" label="空余量" />
        <el-table-column label="操作" fixed="right">
            <template #default="{ row }">
                <el-tooltip content="编辑" placement="bottom" effect="light">
                    <el-button size="small" icon="el-icon-edit"></el-button>
                </el-tooltip>
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
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue'

const props = defineProps({
    data: Object,
})
</script>

<style lang="less" scoped>
.title {
    margin: 20px 0 20px 0;
    color: var(--el-text-color-primary);
    font-size: 16px;
    font-weight: 700;
}
</style>
