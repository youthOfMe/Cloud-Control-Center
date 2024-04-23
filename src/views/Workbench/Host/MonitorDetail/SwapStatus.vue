<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span>交换内存负载</span>
                <el-button class="button" text type="primary" @click="goMonitorDetail">
                    更多
                </el-button>
            </div>
        </template>
        <el-row>
            <el-col :span="24" class="cpu_status">
                <el-progress type="circle" :percentage="25" width="180" />
            </el-col>
        </el-row>
        <el-row style="margin-top: 15px" v-for="i in [0, 1, 2, 3]">
            <el-col :span="24">
                <el-row>
                    <el-col :span="4">
                        <span>CPU{{ i }}</span>
                    </el-col>
                    <el-col :span="20">
                        <el-progress
                            :percentage="100"
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

<script setup></script>

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
