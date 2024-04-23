<template>
    <el-card>
        <el-row>
            <el-col :span="18">
                <el-input v-model="input3" placeholder="Please input" class="input-with-select">
                    <template #prepend>
                        <el-select v-model="select" placeholder="Select" style="width: 115px">
                            <el-option label="Restaurant" value="1" />
                            <el-option label="Order No." value="2" />
                            <el-option label="Tel" value="3" />
                        </el-select>
                    </template>
                    <template #append>
                        <el-button>
                            <el-icon><Search /></el-icon>
                        </el-button>
                    </template>
                </el-input>
            </el-col>
            <el-col :span="6">
                <div class="add_host fr">
                    <a-button @click="showHostModal" type="primary">新建</a-button>
                </div>
                <div class="clear"></div>
            </el-col>
        </el-row>
        <a-table
            bordered
            :dataSource="hostList.data"
            :columns="hostFormColumns"
            style="margin-top: 15px"
        >
            <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'console'">
                    <router-link :to="`/console/${record.id}`" target="_blank">Console</router-link>
                </template>
                <template v-if="column.dataIndex === 'action'">
                    <a-popconfirm
                        v-if="hostList.data.length"
                        title="Sure to delete?"
                        @confirm="deleteHost(record)"
                    >
                        <a>Delete</a>
                    </a-popconfirm>
                </template>
            </template>
        </a-table>
    </el-card>
    <div>
        <a-modal
            v-model:visible="hostFormVisible"
            title="添加主机"
            @ok="onHostFormSubmit(hostForm.form)"
            @cancel="resetForm()"
            :width="800"
        >
            <a-form
                ref="formRef"
                name="custom-validation"
                :model="hostForm.form"
                :rules="hostForm.rules"
                v-bind="layout"
                @finish="handleFinish"
                @validate="handleValidate"
                @finishFailed="handleFinishFailed"
            >
                <a-form-item label="主机类别" name="category">
                    <a-row>
                        <a-col :span="12">
                            <a-select
                                ref="select"
                                v-model:value="hostForm.form.category"
                                @change="handleCategorySelectChange"
                            >
                                <a-select-option
                                    :value="category.id"
                                    v-for="category in categoryList.data"
                                    :key="category.id"
                                >
                                    {{ category.name }}
                                </a-select-option>
                            </a-select>
                        </a-col>
                    </a-row>
                </a-form-item>

                <a-form-item label="从属环境" name="environment">
                    <a-row>
                        <a-col :span="12">
                            <a-select
                                ref="select"
                                v-model:value="hostForm.form.environment"
                                @change="handleEnvironmentSelectChange"
                            >
                                <a-select-option
                                    :value="environment.id"
                                    v-for="environment in environmentList.data"
                                    :key="environment.id"
                                >
                                    {{ environment.name }}
                                </a-select-option>
                            </a-select>
                        </a-col>
                    </a-row>
                </a-form-item>

                <a-form-item has-feedback label="主机名称" name="name">
                    <a-input v-model:value="hostForm.form.name" type="text" autocomplete="off" />
                </a-form-item>

                <a-form-item has-feedback label="连接地址" name="username">
                    <a-row>
                        <a-col :span="8">
                            <a-input
                                placeholder="用户名"
                                addon-before="ssh"
                                v-model:value="hostForm.form.username"
                                type="text"
                                autocomplete="off"
                            />
                        </a-col>
                        <a-col :span="8">
                            <a-input
                                placeholder="ip地址"
                                addon-before="@"
                                v-model:value="hostForm.form.ip_addr"
                                type="text"
                                autocomplete="off"
                            />
                        </a-col>
                        <a-col :span="8">
                            <a-input
                                placeholder="端口号"
                                addon-before="-p"
                                v-model:value="hostForm.form.port"
                                type="text"
                                autocomplete="off"
                            />
                        </a-col>
                    </a-row>
                </a-form-item>

                <a-form-item has-feedback label="连接密码" name="password">
                    <a-input
                        v-model:value="hostForm.form.password"
                        type="password"
                        autocomplete="off"
                    />
                </a-form-item>

                <a-form-item has-feedback label="备注信息" name="description">
                    <a-textarea
                        placeholder="请输入主机备注信息"
                        v-model:value="hostForm.form.description"
                        type="text"
                        :auto-size="{ minRows: 3, maxRows: 5 }"
                        autocomplete="off"
                    />
                </a-form-item>

                <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                    <a-button @click="resetForm">Reset</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue'
import axios from 'axios'
import settings from '@/setting'
import store from '@/store'
import { message } from 'ant-design-vue'
import { reqCategoryList, reqHostList, delHost, addHost } from '@/api/host'
import { ElMessage } from 'element-plus'
import { reqEnvList } from '@/api/conf/env'

export default {
    setup() {
        const handleCategorySelectChange = (value) => {
            // 切换主机类别的回调处理
            console.log(value)
        }

        const handleEnvironmentSelectChange = (value) => {}

        const formRef = ref()
        const HostCategoryFromVisible = ref(false)
        const hostList = reactive({
            data: [],
        })
        const categoryList = reactive({
            data: [],
        })
        const environmentList = reactive({
            data: [],
        })

        const hostForm = reactive({
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
            other: '',
            form: {
                name: '',
                category: '',
                ip_addr: '',
                username: '',
                port: '',
                description: '',
                password: '',
                environment: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入主机名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在3-10位之间', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入连接密码', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在3-10位之间', trigger: 'blur' },
                ],
                category: [{ required: true, message: '请选择类别', trigger: 'change' }],
                environment: [{ required: true, message: '请选择从属环境', trigger: 'change' }],
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在3-10位', trigger: 'blur' },
                ],
                ip_addr: [
                    { required: true, message: '请输入连接地址', trigger: 'blur' },
                    { max: 15, message: '长度最大15位', trigger: 'blur' },
                ],
                port: [
                    { required: true, message: '请输入端口号', trigger: 'blur' },
                    { max: 5, message: '长度最大5位', trigger: 'blur' },
                ],
            },
        })
        let validateName = async (_rule, value) => {
            if (value === '') {
                return Promise.reject('请输入类别名称')
            } else {
                return Promise.resolve()
            }
        }
        const hostCategoryForm = reactive({
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
            other: '',
            form: {
                name: '',
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入类别名称',
                        validator: validateName,
                        trigger: 'blur',
                    },
                    { min: 3, max: 10, message: '长度在3-10位之间', trigger: 'blur' },
                ],
            },
        })
        const layout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 14,
            },
        }

        const handleFinish = (values) => {
            console.log(values, hostForm)
        }

        const handleFinishFailed = (errors) => {
            console.log(errors)
        }

        const resetForm = () => {
            formRef.value.resetFields()
        }

        const handleValidate = (...args) => {
            console.log(args)
        }

        const hostFormVisible = ref(false)

        const showHostModal = () => {
            hostFormVisible.value = true
        }

        const showHostCategoryFormModal = () => {
            // 显示添加主机类别的表单窗口
            HostCategoryFromVisible.value = true
        }
        const hostCategoryFormCancel = () => {
            // 添加主机类别的表单取消
            hostCategoryForm.form.name = '' // 清空表单内容
            HostCategoryFromVisible.value = false // 关闭对话框
        }

        const excelVisible = ref(false)

        const excelFormCancel = () => {
            excelVisible.value = false
        }

        const onHostCategoryFromSubmit = () => {}

        const onHostFormSubmit = (form) => {
            // 将数据提交到后台进行保存，但是先进行连接校验，验证没有问题，再保存
            addHost(form)
                .then((response) => {
                    if (response.code)
                        return ElMessage({
                            message: '添加主机失败, 请联系管理员',
                            type: 'error',
                        })
                    hostList.data.unshift(response)
                    // 清空
                    resetForm()
                    hostFormVisible.value = false // 关闭对话框
                    ElMessage({
                        message: '成功添加主机信息！',
                        type: 'success',
                    })
                })
                .catch((error) => {
                    ElMessage({
                        type: 'error',
                        message: '主机认证失败',
                    })
                })
        }

        const get_host_list = () => {
            // 获取主机类别列表
            reqHostList()
                .then((data) => (hostList.data = data.results))
                .catch((error) => {
                    ElMessage({
                        message: '无法获取主机列表信息！',
                        type: 'error',
                    })
                })
        }
        const get_category_list = () => {
            // 获取主机类别列表
            reqCategoryList()
                .then((data) => (categoryList.data = data.results))
                .catch((error) => {
                    ElMessage({
                        message: '无法获取主机类别列表信息！',
                        type: 'error',
                    })
                })
        }

        const get_environment_list = () => {
            // 获取主机从属环境列表
            reqEnvList()
                .then((response) => {
                    console.log(response)
                    environmentList.data = response.results
                })
                .catch((err) => {
                    ElMessage({
                        message: '无法获取环境列表信息',
                        type: 'error',
                    })
                })
        }
        get_environment_list()

        const deleteHost = (record) => {
            // 删除主机接口
            delHost(record.id)
                .then((response) => {
                    let index = hostList.data.indexOf(record)
                    hostList.data.splice(index, 1)
                    ElMessage({
                        message: '删除主机成功!',
                        type: 'success',
                    })
                })
                .catch((error) => {
                    ElMessage({
                        message: '删除主机失败!',
                        type: 'error',
                    })
                })
        }

        // 获取
        get_host_list()
        get_category_list()

        // 上传excel文件
        const showExcelModal = () => {
            // 显示批量上传主机的窗口
            excelVisible.value = true
        }
        const handleChange = (info) => {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList)
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`)
            }
        }

        const fileList = ref([])
        const beforeUpload = (file) => {
            // 当用户选择上传文件以后，需要手动把当前文件添加到待上传文件列表this.excel_fileList中
            fileList.value = [...fileList.value, file]
            return false
        }
        const onExcelSubmit = () => {
            // 将数据提交到后台进行保存，但是先进行连接校验，验证没有问题，再保存
            const formData = new FormData()
            console.log('fileList.value:', fileList.value)
            fileList.value.forEach((file) => {
                console.log('>>>', file)
                formData.append('host_excel', file)
            })

            axios
                .post(`${settings.host}/host/excel_host`, formData, {
                    headers: {
                        Authorization: store.getters.token,
                        'Content-Type': 'multipart/form-data', // 上传文件必须设置请求头中的提交内容格式：multipart/form-data
                    },
                })
                .then((response) => {
                    console.log('response:::', response)
                    console.log('hostList:::', hostList)
                    excelFormCancel() // 关闭对话框
                    fileList.value = []
                    hostList.data.push(...response.data.data)
                    message.success('批量创建主机成功!！')
                })
                .catch((response) => {
                    message.error(response.data.message)
                })
        }

        return {
            environmentList,
            handleEnvironmentSelectChange,
            excelVisible,
            showExcelModal,
            handleChange,
            beforeUpload,
            onExcelSubmit,
            selectHostCategory: ref('yuan'),
            hostForm,
            formRef,
            layout,
            HostCategoryFromVisible,
            handleCategorySelectChange,
            handleFinishFailed,
            handleFinish,
            resetForm,
            handleValidate,
            hostFormVisible,
            showHostModal,
            onHostFormSubmit,
            deleteHost,
            showHostCategoryFormModal,
            hostCategoryForm,
            hostCategoryFormCancel,
            onHostCategoryFromSubmit,
            hostFormColumns: [
                {
                    title: 'ID',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: '类别',
                    dataIndex: 'category_name',
                    key: 'category_name',
                },
                {
                    title: '环境',
                    dataIndex: 'environment_name',
                    key: 'environment_name',
                },
                {
                    title: '主机名称',
                    dataIndex: 'name',
                    key: 'name',
                    sorter: true,
                    width: 230,
                },
                {
                    title: '连接地址',
                    dataIndex: 'ip_addr',
                    key: 'ip_addr',
                    ellipsis: true,
                    sorter: true,
                    width: 150,
                },
                {
                    title: '端口',
                    dataIndex: 'port',
                    key: 'port',
                    ellipsis: true,
                },
                {
                    title: 'console',
                    dataIndex: 'console',
                    key: 'console',
                    ellipsis: true,
                },
                {
                    title: '备注信息',
                    dataIndex: 'description',
                    key: 'description',
                    ellipsis: true,
                },

                {
                    title: '操作',
                    key: 'action',
                    width: 200,
                    dataIndex: 'action',
                    scopedSlots: { customRender: 'action' },
                },
            ],
            hostList,
            categoryList,
        }
    },
}
</script>
