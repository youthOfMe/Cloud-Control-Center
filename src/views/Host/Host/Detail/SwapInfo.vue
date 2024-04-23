<template>
    <el-descriptions class="margin-top" title="交换内存信息" :column="3" :size="size" border>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <user />
                    </el-icon>
                    总内存
                </div>
            </template>
            {{ data.swap_total }}
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
