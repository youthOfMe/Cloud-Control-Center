<template>
    <div>
        <div class="fl"></div>
        <div class="fr topfunc">
            <el-dropdown class="fr" @command="handlecommand" role="menu">
                <span class="el-dropdown-link">
                    欢迎您，{{ nickname }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="a">个人中心</el-dropdown-item>
                        <el-dropdown-item command="b">修改密码</el-dropdown-item>
                        <el-dropdown-item command="c">退出登录</el-dropdown-item>
                        <el-dropdown-item disabled commmand="d">暴揍海星</el-dropdown-item>
                        <el-dropdown-item divided command="e">自毁程序</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <p class="fl time">
                今天是你来到风吟工业互联网平台的第
                <span>{{ sailtime }}</span>
                天
            </p>
            <div class="clear"></div>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store'

const userStore = useUserStore()
const nickname = userStore.nickname
const sailtime = userStore.sailTime
</script>

<style lang="less" scoped>
.el-dropdown {
    margin-top: 25px;
}
.el-dropdown-link {
    cursor: pointer;
}
.el-icon-arrow-down {
    font-size: 18px;
}
.topfunc {
    margin-right: 20px;
}
.time {
    font-size: 26px;
    margin-right: 30px;
    span {
        color: #5696ff;
        font-size: 36px;
    }
    cursor: pointer;
}
</style>
