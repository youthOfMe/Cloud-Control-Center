<template>
    <el-descriptions title="基本信息" :column="3" :size="size" border>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <location />
                    </el-icon>
                    主机名称
                </div>
            </template>
            {{ data.name }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <user />
                    </el-icon>
                    登录用户名
                </div>
            </template>
            {{ data.username }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <iphone />
                    </el-icon>
                    所属用户
                </div>
            </template>
            ID: {{ data.user }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <location />
                    </el-icon>
                    所属分类
                </div>
            </template>
            {{ data.category }}
        </el-descriptions-item>

        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <office-building />
                    </el-icon>
                    连接地址
                </div>
            </template>
            {{ data.ip_addr }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <tickets />
                    </el-icon>
                    连接端口
                </div>
            </template>
            {{ data.port }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <location />
                    </el-icon>
                    主机状态
                </div>
            </template>
            <el-tag size="small">{{ data.status }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <location />
                    </el-icon>
                    创建时间
                </div>
            </template>
            {{ data.created_time }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <location />
                    </el-icon>
                    更新时间
                </div>
            </template>
            {{ data.updated_time }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <location />
                    </el-icon>
                    从属环境
                </div>
            </template>
            {{ data.environment }}
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon>
                        <location />
                    </el-icon>
                    备注信息
                </div>
            </template>
            {{ data.memo ? data.memo : '牛逼' }}
        </el-descriptions-item>
    </el-descriptions>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue'

const props = defineProps({
    data: Object,
})
</script>

<style lang="less" scoped>
.cell-item {
    display: flex;
    align-items: center;
}
</style>
