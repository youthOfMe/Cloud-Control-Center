<template>
    <el-descriptions class="margin-top" title="网络传输信息" :column="3" :size="size" border>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <user />
                    </el-icon>
                    网络接受字节量
                </div>
            </template>
            {{ data.net_bytes_recv }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <user />
                    </el-icon>
                    网络发送字节量
                </div>
            </template>
            {{ data.net_bytes_sent }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <user />
                    </el-icon>
                    网络接收包量
                </div>
            </template>
            {{ data.net_packets_recv }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <user />
                    </el-icon>
                    网络发送包量
                </div>
            </template>
            {{ data.net_packets_sent }}
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
