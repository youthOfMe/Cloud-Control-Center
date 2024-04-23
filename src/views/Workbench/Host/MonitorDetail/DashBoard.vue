<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span>主机状态</span>
                <el-button class="button" text type="primary" @click="goMonitorDetail">
                    数据更新时间: {{}}
                </el-button>
            </div>
        </template>
        <el-row :gutter="5" class="body">
            <el-col :span="6">
                <el-progress
                    type="circle"
                    :percentage="cpuStatus.cpu_every_percent.reduce((pre, cur) => pre + cur)"
                >
                    <template #default="{ percentage }">
                        <span class="percentage-value">{{ percentage }}%</span>
                        <span class="percentage-label">负载状态</span>
                    </template>
                </el-progress>
                <p>香港神机-ID:5</p>
            </el-col>
            <el-col :span="6">
                <el-progress type="circle" :percentage="cpuStatus.cpu_avg_percent">
                    <template #default="{ percentage }">
                        <span class="percentage-value">{{ percentage }}%</span>
                        <span class="percentage-label">CPU占用</span>
                    </template>
                </el-progress>
                <p>{{ cpuStatus.cpu_count }} 核</p>
            </el-col>
            <el-col :span="6">
                <el-progress
                    type="circle"
                    :percentage="memoryStatus.memory_percent1.toFixed(2)"
                    status="warning"
                >
                    <template #default="{ percentage }">
                        <span class="percentage-value">{{ percentage }}%</span>
                        <span class="percentage-label">内存占用</span>
                    </template>
                </el-progress>
                <p>
                    {{
                        (
                            Number(
                                memoryStatus.memory_total.substring(
                                    0,
                                    memoryStatus.memory_total.length - 1,
                                ),
                            ) -
                            Number(
                                memoryStatus.memory_available.substring(
                                    0,
                                    memoryStatus.memory_available.length - 1,
                                ),
                            )
                        ).toFixed(2) + 'G'
                    }}
                    /
                    {{ memoryStatus.memory_total }}
                </p>
            </el-col>
            <el-col :span="6">
                <el-progress
                    type="circle"
                    :percentage="
                        (((diskInfo.total - diskInfo.free + 1.8) / diskInfo.total) * 100).toFixed(2)
                    "
                    status="exception"
                >
                    <template #default="{ percentage }">
                        <span class="percentage-value">{{ percentage }}%</span>
                        <span class="percentage-label">硬盘占用</span>
                    </template>
                </el-progress>
                <p>{{ diskInfo.total - diskInfo.free + 1.8 }}G / {{ diskInfo.total }}G</p>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
    cpuStatus: Object,
    memoryStatus: Object,
    diskInfo: Object,
})
</script>

<style lang="less" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}
span {
    font-weight: bold;
    font-size: 16px;
}

.body {
    div {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        p {
            margin: 5px 0 0 0;
            color: rgb(16, 142, 233);
            font-weight: bold;
        }
    }
}

.percentage-value {
    display: block;
    margin-top: 10px;
    font-size: 28px;
}
.percentage-label {
    display: block;
    margin-top: 10px;
    font-size: 12px;
}

.el-col {
    text-align: center;
}
</style>
