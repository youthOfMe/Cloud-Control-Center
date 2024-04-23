import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { useUserStore } from '@/store'

// 引入element-ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 引入通用样式
import '@/style/reset.css'
import '@/style/rule.css'
import 'normalize.css'

// 引入终端xterm
import 'xterm/css/xterm.css'
import 'xterm/lib/xterm'

import '@/assets/main.css'
// import '@/style/display/style.css'

const app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn,
})
// app.component(key, component)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 安装仓库
app.use(pinia)

app.use(Antd)

const userStore = useUserStore()
// router.beforeEach((to, from, next) => {
//     document.title = to.meta.title

//     if (to.path === '/login') next()
//     else {
//         const token = userStore.token
//         token ? next() : next('/login')
//     }
// })
app.use(router).mount('#app')

// 配置echarts插件
const echarts = require('echarts')
app.config.globalProperties.$echarts = echarts

// 解决vue3-elementui-plus报错问题
const debounce = (fn, delay) => {
    let timer = null
    return function () {
        let context = this
        let args = arguments
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, delay)
    }
}

const _ResizeObserver = window.ResizeObserver
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
    constructor(callback) {
        callback = debounce(callback, 16)
        super(callback)
    }
}
