<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span>物理内存负载</span>
                <el-button class="button" text type="primary" @click="goMonitorDetail">
                    更多
                </el-button>
            </div>
        </template>
        <el-row>
            <el-col :span="24" class="cpu_status">
                <el-progress
                    type="circle"
                    :percentage="memoryStatus.memory_percent1.toFixed(2)"
                    width="180"
                />
            </el-col>
        </el-row>
        <el-row style="margin-top: 15px">
            <el-col :span="24">
                <el-row>
                    <el-col :span="4">
                        <span>ABLE</span>
                    </el-col>
                    <el-col :span="20">
                        <el-progress
                            :percentage="100 - memoryStatus.memory_percent1.toFixed(2)"
                            striped
                            striped-flow
                            :text-inside="true"
                            :stroke-width="22"
                            :duration="10"
                        ></el-progress>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row style="margin-top: 15px">
            <el-col :span="24">
                <el-row>
                    <el-col :span="4">
                        <span>FREE</span>
                    </el-col>
                    <el-col :span="20">
                        <el-progress
                            :percentage="100 - memoryStatus.memory_percent2.toFixed(2)"
                            striped
                            striped-flow
                            :text-inside="true"
                            :stroke-width="22"
                            :duration="10"
                        ></el-progress>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row style="margin-top: 15px">
            <el-col :span="24">
                <el-row>
                    <el-col :span="4">
                        <span>NOABLE</span>
                    </el-col>
                    <el-col :span="20">
                        <el-progress
                            :percentage="memoryStatus.memory_percent1.toFixed(2)"
                            striped
                            striped-flow
                            :text-inside="true"
                            :stroke-width="22"
                            :duration="10"
                        ></el-progress>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row style="margin-top: 15px">
            <el-col :span="24">
                <el-row>
                    <el-col :span="4">
                        <span>NOFREE</span>
                    </el-col>
                    <el-col :span="20">
                        <el-progress
                            :percentage="memoryStatus.memory_percent2.toFixed(2)"
                            striped
                            striped-flow
                            :text-inside="true"
                            :stroke-width="22"
                            :duration="10"
                        ></el-progress>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
    memoryStatus: Object,
})

// const data = ref({
//     total: Number(props.memoryStatus.total.substring(0, memoryStatus.total.length - 1)),
//     available: Number(props.memoryStatus.available.substring(0, memoryStatus.available.length - 1)),
// })
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

.cpu_status {
    display: flex;
    justify-content: center;
}

.el-card {
    height: 450px;
}
</style>
