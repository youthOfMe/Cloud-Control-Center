<template>
    <el-card>
        <el-row>
            <el-col :span="6">
                <el-statistic :value="138">
                    <template #title>
                        <div style="display: inline-flex; align-items: center">
                            平台执行管理
                            <el-icon style="margin-left: 4px" :size="12">
                                <user-outlined />
                            </el-icon>
                        </div>
                    </template>
                    <template #suffix>/100</template>
                </el-statistic>
                <el-button
                    class="countdown-footer"
                    type="primary"
                    style="margin-top: 10px"
                    @click="reset"
                >
                    详细
                </el-button>
            </el-col>
            <el-col :span="6">
                <el-statistic :value="138">
                    <template #title>
                        <div style="display: inline-flex; align-items: center">
                            平台现存主机
                            <el-icon style="margin-left: 4px" :size="12">
                                <desktop-outlined />
                            </el-icon>
                        </div>
                    </template>
                    <template #suffix>/100</template>
                </el-statistic>
                <RouterLink to="/display/host" target="_blank">
                    <el-button
                        class="countdown-footer"
                        type="primary"
                        style="margin-top: 10px"
                        @click="reset"
                    >
                        详细
                    </el-button>
                </RouterLink>
            </el-col>
            <el-col :span="6">
                <el-statistic :value="138">
                    <template #title>
                        <div style="display: inline-flex; align-items: center">
                            平台现存项目
                            <el-icon style="margin-left: 4px" :size="12">
                                <folder-outlined />
                            </el-icon>
                        </div>
                    </template>
                    <template #suffix>/100</template>
                </el-statistic>
                <el-button
                    class="countdown-footer"
                    type="primary"
                    style="margin-top: 10px"
                    @click="reset"
                >
                    详细
                </el-button>
            </el-col>
            <el-col :span="6">
                <el-statistic :value="138">
                    <template #title>
                        <div style="display: inline-flex; align-items: center">
                            平台现存资产
                            <el-icon style="margin-left: 4px" :size="12">
                                <PayCircleOutlined />
                            </el-icon>
                        </div>
                    </template>
                    <template #suffix>/100</template>
                </el-statistic>
                <el-button
                    class="countdown-footer"
                    type="primary"
                    style="margin-top: 10px"
                    @click="reset"
                >
                    详细
                </el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup>
import {
    DesktopOutlined,
    UserOutlined,
    FolderOutlined,
    PayCircleOutlined,
} from '@ant-design/icons-vue'
</script>

<style lang="less" scoped>
.el-col {
    text-align: center;
}
</style>
