<template>
    <el-descriptions class="margin-top" title="CPU信息" :column="3" :size="size" border>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <user />
                    </el-icon>
                    CPU核心数
                </div>
            </template>
            {{ data.cpu_count }} 核
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <iphone />
                    </el-icon>
                    CPU逻辑核心数
                </div>
            </template>
            {{ data.cpu_logical_count }} 核
        </el-descriptions-item>
    </el-descriptions>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue'

const props = defineProps({
    data: Object,
})
</script>

<style lang="less" scoped></style>
