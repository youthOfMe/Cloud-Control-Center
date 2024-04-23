export const routes = [
    {
        path: '/',
        name: 'Logout',
        component: () => import('@/views/Layout/Layout.vue'),
        redirect: '/home/survey',
        children: [
            {
                path: '/home/survey',
                component: () => import('@/views/Home/Survey/Index.vue'),
                meta: {
                    title: '主页概览',
                },
            },
            {
                path: '/home/overview',
                component: () => import('@/views/Home/OverView/Index.vue'),
                meta: {
                    title: '主页总览',
                },
            },
            {
                path: '/users',
                component: () => import('@/views/User/User/Index.vue'),
                meta: {
                    title: '用户管理',
                },
            },
            {
                path: '/users/perms',
                component: () => import('@/views/User/Perm/Index.vue'),
                meta: {
                    title: '权限管理',
                },
            },
            {
                path: '/users/roles',
                component: () => import('@/views/User/Role/Index.vue'),
                meta: {
                    title: '角色管理',
                },
            },
            {
                path: '/users/perms/',
                component: () => import('@/views/User/Perm/Index.vue'),
                meta: {
                    title: '权限管理',
                },
            },
            {
                path: '/operation/announcement',
                component: () => import('@/views/Operation/Announcement/Index.vue'),
                meta: {
                    title: '公告管理',
                },
            },
            {
                path: '/cmdb/citypes',
                component: () => import('@/views/CMDB/CiType/Index.vue'),
                meta: {
                    title: '资产类型管理',
                },
            },
            {
                path: '/cmdb/cis',
                component: () => import('@/views/CMDB/Cis/Index.vue'),
                meta: {
                    title: '资产管理',
                },
            },
            {
                path: '/jumpserver/orgs',
                component: () => import('@/views/JumpServer/Index.vue'),
                meta: {
                    title: '资产树管理',
                },
            },
            {
                path: '/host/type',
                component: () => import('@/views/Host/Type/Index.vue'),
                meta: {
                    title: '主机类型',
                },
            },
            {
                path: '/host/server',
                component: () => import('@/views/Host/Host/Index.vue'),
                meta: {
                    title: '主机管理',
                },
            },
            {
                path: '/host/detail/:id',
                component: () => import('@/views/Host/Host/Detail/Index.vue'),
                meta: {
                    title: '主机详细信息',
                },
            },
            {
                path: '/host/key',
                component: () => import('@/views/Host/Key/Index.vue'),
                meta: {
                    title: '密钥管理',
                },
            },
            {
                path: '/display',
                component: () => import('@/views/Display/Index.vue'),
                meta: {
                    title: '展示中心',
                },
            },
            {
                path: '/conf/environment',
                component: () => import('@/views/Configuration/Env/Index.vue'),
                meta: {
                    title: '环境管理',
                },
            },
            {
                path: '/release/app',
                component: () => import('@/views/Release/App/Index.vue'),
                meta: {
                    title: '应用管理',
                },
            },
            {
                path: '/release/git',
                component: () => import('@/views/Release/Git/Index.vue'),
                meta: {
                    title: '仓库管理',
                },
            },
            {
                path: '/release/apply',
                component: () => import('@/views/Release/Apply/Index.vue'),
                meta: {
                    title: '发布申请',
                },
            },
            {
                path: '/protest/prolist',
                component: () => import('@/views/ProTest/ProList/Index.vue'),
                meta: {
                    title: '项目列表',
                },
            },
            {
                path: '/protest/documentlist',
                component: () => import('@/views/ProTest/Document/Index.vue'),
                meta: {
                    title: '用例列表',
                },
            },
            {
                path: '/workbench/host',
                component: () => import('@/views/Workbench/Host/Index.vue'),
                meta: {
                    title: '主机监控',
                },
            },
            {
                path: '/workbench/detail/:id',
                component: () => import('@/views/Workbench/Host/MonitorDetail/Index.vue'),
                meta: {
                    title: '监控详情',
                },
            },
            {
                path: '/workbench/type',
                component: () => import('@/views/Workbench/Type/Index.vue'),
                meta: {
                    title: '类型管理',
                },
            },
            {
                path: '/task/execute',
                component: () => import('@/views/Task/ExecuteTask/Index.vue'),
                meta: {
                    title: '执行任务',
                },
            },
            {
                path: '/schedule/task',
                component: () => import('@/views/Timing/Index.vue'),
                meta: {
                    title: '定时任务',
                },
            },
        ],
    },
    {
        path: '/display/host',
        name: 'DisHost',
        component: () => import('@/views/Display/Host/Index.vue'),
        meta: {
            title: '主机基本数据',
        },
    },
    {
        path: '/display/user',
        name: 'DisUser',
        component: () => import('@/views/Display/User/Index.vue'),
        meta: {
            title: '用户基本数据',
        },
    },
    {
        path: '/console/:id',
        name: 'Console',
        component: () => import('@/views/Host/Console/Index.vue'),
        meta: {
            title: 'Console',
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login/Login.vue'),
        meta: {
            title: '登录页',
        },
    },
    {
        path: '/jumpserver/webshell/:hostid',
        component: () => import('@/views/JumpServer/WebShell.vue'),
        meta: {
            title: 'WebShell',
        },
    },
]
