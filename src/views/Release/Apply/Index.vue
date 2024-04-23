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
                        <a-input v-model:value="searchForm.app_name" placeholder="请输入" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"
                        label="标记符："
                    >
                        <a-input v-model:value="searchForm.tag" placeholder="请输入" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"
                        label="描述信息："
                    >
                        <a-input v-model:value="searchForm.description" placeholder="请输入" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <div class="fr">
                        <router-link to="/release">
                            <a-button type="primary" style="margin-top: 3px">刷新</a-button>
                        </router-link>
                        <a-button style="margin-left: 15px" @click="showAppModal">
                            新建应用
                        </a-button>
                    </div>
                    <div class="clear"></div>
                </a-col>
            </a-row>
        </div>

        <div class="add_app"></div>
        <div class="release">
            <div class="app_list">
                <a-table :columns="columns" :data-source="jobList" row-key="id">
                    <template #bodyCell="{ column, text, record }">
                        <template v-if="column.dataIndex === 'color'">
                            <smile-outlined
                                v-if="record.color === 'blue'"
                                style="color: blue; font-size: 48px"
                            />
                            <meh-outlined
                                v-else-if="record.color === 'notbuilt'"
                                style="color: orage; font-size: 48px"
                            />
                            <frown-outlined v-else style="font-size: 48px; color: red" />
                        </template>
                        <template v-if="column.dataIndex === 'url'">
                            <a :href="record.url">{{ record.url }}</a>
                        </template>
                        <template v-if="column.dataIndex === 'action'">
                            <a @click="build_job(record.fullname)">发布</a>
                            <span style="color: lightgray">|</span>
                            <!--            <a>克隆发布</a>-->
                            <!--            <span style="color: lightgray"> | </span>-->
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
            <a-form-item ref="app_name" label="应用名称" prop="app_name">
                <a-input v-model:value="app_form.app_name" />
            </a-form-item>
            <a-form-item ref="tag" label="唯一标识符" prop="tag">
                <a-input v-model:value="app_form.tag" />
            </a-form-item>
            <a-form-item label="备注信息" prop="app_desc">
                <a-textarea v-model:value="app_form.app_desc" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons-vue'
import { reqJobList, addJobApp, buildJob } from '@/api/release/apply'
import { ElMessage } from 'element-plus'

export default {
    components: {
        SmileOutlined,
        MehOutlined,
        FrownOutlined,
    },
    setup() {
        // 搜索栏的表单布局设置
        const formItemLayout = reactive({
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        })

        // 表格字段列设置
        const columns = [
            {
                title: 'job名称',
                dataIndex: 'fullname',
                key: 'fullname',
                sorter: true,
                width: 230,
            },
            {
                title: '发布状态',
                dataIndex: 'color',
                key: 'description',
            },
            {
                title: 'job访问地址',
                dataIndex: 'url',
                key: 'url',
            },
            {
                title: '操作',
                dataIndex: 'action',
                width: 300,
                key: 'action',
                scopedSlots: { customRender: 'action' },
            },
        ]

        // 构建项目列表
        const jobList = ref([])

        // 获取构建项目列表
        const get_job_list = (searchForm) => {
            reqJobList()
                .then((response) => {
                    jobList.value = response
                })
                .catch((error) => {
                    ElMessage({
                        message: error.response.data,
                        type: 'error',
                    })
                })
        }

        get_job_list()

        // 开始构建项目
        const build_job = (job_name) => {
            buildJob({ name: job_name })
                .then((response) => {
                    ElMessage({
                        message: '构建成功了欸',
                        type: 'success',
                    })
                })
                .catch((error) => {
                    ElMessage({
                        message: error,
                        type: 'error',
                    })
                })
        }

        // 是否显示新建构建项目的弹窗
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
            let data = {
                name: app_form.app_name,
                tag: app_form.tag,
                description: app_form.app_desc,
            }

            addJobApp(data)
                .then((response) => {
                    releaseAppList.value.push(response.data)
                    ElMessage({
                        message: '添加成功！',
                        type: 'success',
                    })
                    AppModelVisible.value = false
                })
                .catch((error) => {
                    ElMessage({
                        message: '添加失败！',
                        type: 'error',
                    })
                })
        }

        // 应用搜索
        const searchForm = reactive({
            app_name: '',
            description: '',
            tag: '',
        })

        // 监听搜索框的输入内容
        watch(searchForm, () => {
            get_release_app_list(searchForm)
        })

        return {
            formItemLayout,
            columns,
            jobList,

            AppModelVisible,
            showAppModal,
            app_form,
            labelCol,
            wrapperCol,
            add_app_rules,
            handleaddappOk,
            searchForm,
            build_job,
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
