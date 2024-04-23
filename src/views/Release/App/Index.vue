<template>
    <el-card>
        <div class="search" style="margin-top: 15px">
            <a-row>
                <a-col :span="6">
                    <a-form-item
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"
                        label="应用名称："
                    >
                        <a-input placeholder="请输入" v-model:value="searchForm.app_name" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"
                        label="标识符："
                    >
                        <a-input placeholder="请输入" v-model:value="searchForm.tag" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"
                        label="描述信息："
                    >
                        <a-input placeholder="请输入" v-model:value="searchForm.description" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <router-link to="/release" class="fr">
                        <a-button type="primary" class="mr">刷新</a-button>
                    </router-link>
                    <span
                        class="fr"
                        style="display: inline-block; width: 15px; height: 10px"
                    ></span>
                    <a-button @click="showAppModal" class="fr">新建应用</a-button>
                    <div class="clear"></div>
                </a-col>
            </a-row>
        </div>

        <div class="release">
            <div class="app_list">
                <a-table :columns="columns" :data-source="releaseAppList" row-key="id">
                    <template #bodyCell="{ column, text, record }">
                        <template v-if="column.dataIndex === 'action'">
                            <a>新建发布</a>
                            <span style="color: lightgray">|</span>
                            <a>克隆发布</a>
                            <span style="color: lightgray">|</span>
                            <a>编辑</a>
                            <span style="color: lightgray">|</span>
                            <a>删除</a>
                        </template>
                    </template>
                </a-table>
            </div>
        </div>
    </el-card>

    <a-modal
        v-model:visible="AppModelVisible"
        title="新建应用"
        @ok="handleaddappOk"
        ok-text="添加"
        cancel-text="取消"
    >
        <a-form
            ref="addappruleForm"
            :model="app_form"
            :rules="add_app_rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
        >
            <a-form-item ref="app_name" label="应用名称" name="app_name">
                <a-input v-model:value="app_form.app_name" />
            </a-form-item>
            <a-form-item ref="tag" label="唯一标识符" name="tag">
                <a-input v-model:value="app_form.tag" />
            </a-form-item>
            <a-form-item label="备注信息" name="app_desc">
                <a-textarea v-model:value="app_form.app_desc" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { reqAppList, addApp } from '@/api/release/app'
import { ElMessage } from 'element-plus'

export default {
    setup() {
        // 搜索栏的表单布局设置
        const formItemLayout = reactive({
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        })

        // 表格字段列设置
        const columns = [
            {
                title: '应用名称',
                dataIndex: 'name',
                key: 'name',
                sorter: true,
                width: 230,
            },
            {
                title: '标识符',
                dataIndex: 'tag',
                key: 'tag',
                sorter: true,
                width: 150,
            },
            {
                title: '描述信息',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: '操作',
                dataIndex: 'action',
                width: 300,
                key: 'action',
                scopedSlots: { customRender: 'action' },
            },
        ]

        // 发布应用列表
        const releaseAppList = ref([])

        // 应用搜索
        const searchForm = reactive({
            app_name: '',
            description: '',
            tag: '',
        })

        // 获取发布应用列表
        const get_release_app_list = (search) => {
            let params = {}
            if (searchForm.tag || searchForm.description || searchForm.app_name) {
                console.log(searchForm)
                params = search
            }
            reqAppList(params)
                .then((response) => {
                    releaseAppList.value = response.results
                })
                .catch((error) => {
                    ElMessage({
                        message: '获取应用列表失败',
                        type: 'error',
                    })
                })
        }

        get_release_app_list()

        // 是否显示新建发布应用的弹窗
        const AppModelVisible = ref(false)

        const showAppModal = () => {
            AppModelVisible.value = true
        }

        const labelCol = reactive({
            span: 6,
        })

        const wrapperCol = reactive({
            span: 16,
        })

        const app_form = reactive({
            // 新建发布应用的表单数据
            app_name: '',
            tag: '',
            app_desc: '',
        })

        const add_app_rules = reactive({
            // 添加发布应用的表单数据验证规则
            app_name: [
                { required: true, message: '请输入应用名称', trigger: 'blur' },
                { min: 1, max: 30, message: '应用名称的长度必须在1~30个字符之间', trigger: 'blur' },
            ],
            tag: [
                { required: true, message: '请输入应用唯一标识符', trigger: 'blur' },
                { min: 1, max: 50, message: '应用名称的长度必须在1~50个字符之间', trigger: 'blur' },
            ],
        })

        const handleaddappOk = () => {
            // 添加应用的表单提交处理
            const data = {
                name: app_form.app_name,
                tag: app_form.tag,
                description: app_form.app_desc,
            }
            addApp(data)
                .then((response) => {
                    releaseAppList.value.push(response)
                    ElMessage({
                        message: '添加应用成功！',
                        type: 'success',
                    })
                    AppModelVisible.value = false
                })
                .catch((error) => {
                    ElMessage({
                        message: '添加应用失败！',
                        type: 'error',
                    })
                })
        }

        // 监听搜索框的输入内容
        watch(searchForm, () => {
            get_release_app_list(searchForm)
        })

        return {
            formItemLayout,
            handleaddappOk,
            columns,
            releaseAppList,
            searchForm,
            AppModelVisible,
            showAppModal,
            app_form,
            labelCol,
            wrapperCol,
            add_app_rules,
        }
    },
}
</script>

<style scoped>
.release_btn span {
    color: #1890ff;
    cursor: pointer;
}
</style>
