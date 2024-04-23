<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible theme="light">
            <div
                class="logo"
                style="
                    font-style: italic;
                    text-align: center;
                    font-size: 20px;
                    color: #fff;
                    margin: 15px 15px;
                    background-color: rgb(16, 142, 233);
                    line-height: 50px;
                    font-family: 'Times New Roman';
                "
            >
                <span>Wind</span>
            </div>
            <div class="logo"></div>
            <a-menu
                v-for="menu in menu_list"
                v-model:selectedKeys="selectedKeys"
                theme="light"
                mode="inline"
                style=""
            >
                <a-menu-item v-if="menu.children.length === 0" :key="menu.id">
                    <router-link :to="menu.menu_url">
                        <user-outlined />
                        <span>{{ menu.title }}</span>
                    </router-link>
                </a-menu-item>

                <a-sub-menu v-else :key="menu.id">
                    <template #title>
                        <span>
                            <desktop-outlined />

                            <span>{{ menu.title }}</span>
                        </span>
                    </template>
                    <a-menu-item v-for="child_menu in menu.children" :key="child_menu.id">
                        <router-link :to="child_menu.menu_url">{{ child_menu.title }}</router-link>
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header
                style="background: #fff; padding: 0; box-shadow: #aaa 0 0px 10px 3px; height: 64px"
            >
                <top-header></top-header>
            </a-layout-header>
            <a-layout-content
                :style="{
                    margin: '24px 16px',
                    padding: '0px',
                }"
            >
                <router-view></router-view>
            </a-layout-content>
            <a-layout-footer style="text-align: center; background-color: #fff">
                Wind Groan ©2023 Created by Zhang Yang
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script setup>
import { DesktopOutlined, UserOutlined } from '@ant-design/icons-vue'
import { reqMenuList } from '@/api/menu/index.ts'
import { ref, onMounted } from 'vue'
import TopHeader from '@/components/TopHeader.vue'
import { reqUserInfo } from '@/api/user/index.ts'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'

const router = useRouter()
const collapsed = ref(false)
const selectedKeys = ref(['1'])
const menu_list = ref([
    {
        id: 88,
        icon: 'mail',
        title: '展示中心',
        tube: '',
        menu_url: '/display',
        children: [],
    },
    {
        id: 55,
        icon: 'bold',
        title: '批量任务',
        tube: '',
        menu_url: '/urils/workbench',
        children: [
            { id: 10, icon: 'mail', title: '执行任务', menu_url: '/task/execute' },
            {
                id: 11,
                icon: 'mail',
                title: '命令管理',
                menu_url: '/urils/template_manage',
            },
        ],
    },
    {
        id: 4,
        icon: 'highlight',
        title: '代码发布',
        tube: '',
        menu_url: '/release',
        children: [
            { id: 888, title: '仓库管理', menu_url: '/release/git' },
            { id: 12, title: '应用管理', menu_url: '/release/app' },
            { id: 13, title: '发布申请', menu_url: '/release/apply' },
        ],
    },
    {
        id: 9,
        icon: 'mail',
        title: '项目测试',
        tube: '',
        menu_url: '/protest',
        children: [
            { id: 901, title: '项目列表', menu_url: '/protest/prolist' },
            { id: 902, title: '用例列表', menu_url: '/protest/documentList' },
        ],
    },
    {
        id: 5,
        icon: 'mail',
        title: '定时计划',
        tube: '',
        menu_url: '/schedule/task',
        children: [],
    },
    {
        id: 6,
        icon: 'mail',
        title: '配置管理',
        tube: '',
        menu_url: '/conf',
        children: [
            { id: 14, title: '环境管理', menu_url: '/conf/environment' },
            { id: 15, title: '服务配置', menu_url: '/conf/workbench' },
            { id: 16, title: '应用配置', menu_url: '/conf/workbench' },
        ],
    },
    {
        id: 7,
        icon: 'mail',
        title: '监控预警',
        tube: '',
        menu_url: '/workbench',
        children: [
            { id: 701, title: '监控类型', menu_url: '/workbench/type' },
            { id: 702, title: '主机监控', menu_url: '/workbench/host' },
        ],
    },
    {
        id: 8,
        icon: 'mail',
        title: '报警',
        tube: '',
        menu_url: '/urils/workbench',
        children: [
            { id: 17, title: '报警历史', menu_url: '/urils/workbench' },
            { id: 18, title: '报警联系人', menu_url: '/urils/workbench' },
            { id: 19, title: '报警联系组', menu_url: '/urils/workbench' },
        ],
    },
])

const userInfo = useUserStore()
const getUserInfo = async () => {
    const data = await reqUserInfo()
    if (data.code) return router.replace('/login')
    userInfo.setNickname(data.nickname)
    const time = new Date()
    userInfo.setSailTime(Math.floor((time - Date.parse(data.date_joined)) / 1000 / 60 / 60 / 24))
}
getUserInfo()

const getMenuList = async () => {
    const data = await reqMenuList()
    try {
        menu_list.value.unshift(...data.data)
    } catch (error) {
        console.log(error)
    }
}
getMenuList()
</script>
<style scoped>
#components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
    background: #fff;
}

.site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #fff;
}
</style>
