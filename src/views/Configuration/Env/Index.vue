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
                    <div class="add_host">
                        <a-button @click="showEnvModal" type="primary">新建</a-button>
                    </div>
                </div>
                <div class="clear"></div>
            </el-col>
        </el-row>

        <a-table :dataSource="envList.data" :columns="envFormColumns" style="margin-top: 15px">
            <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'action'">
                    <a-popconfirm
                        v-if="envList.data.length"
                        title="Sure to delete?"
                        @confirm="deleteEnv(record)"
                    >
                        <a>Delete</a>
                    </a-popconfirm>
                    <a style="margin-left: 20px" @click="showEnvUpdateModal(record)">Update</a>
                </template>
            </template>
        </a-table>

        <a-modal
            v-model:visible="envFormVisible"
            title="添加主机"
            @ok="onEnvFormSubmit"
            @cancel="resetForm()"
            :width="800"
        >
            <a-form
                ref="formRef"
                name="custom-validation"
                :model="envForm.form"
                :rules="envForm.rules"
                v-bind="layout"
                @finish="handleFinish"
                @validate="handleValidate"
                @finishFailed="handleFinishFailed"
            >
                <a-form-item has-feedback label="环境名称" name="name">
                    <a-input v-model:value="envForm.form.name" type="text" autocomplete="off" />
                </a-form-item>

                <a-form-item has-feedback label="唯一标记符" name="tag">
                    <a-input v-model:value="envForm.form.tag" type="text" autocomplete="off" />
                </a-form-item>

                <a-form-item has-feedback label="备注信息" name="description">
                    <a-textarea
                        placeholder="请输入环境备注信息"
                        v-model:value="envForm.form.description"
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
        <a-modal
            :width="600"
            title="新建主机类别"
            :visible="HostCategoryFromVisible"
            @cancel="hostCategoryFormCancel"
        >
            <template #footer>
                <a-button key="back" @click="hostCategoryFormCancel">取消</a-button>
                <a-button
                    key="submit"
                    type="primary"
                    :loading="loading"
                    @click="onHostCategoryFromSubmit"
                >
                    提交
                </a-button>
            </template>
            <a-form-model
                ref="hostCategoryRuleForm"
                v-model:value="hostCategoryForm.form"
                :rules="hostCategoryForm.rules"
                :label-col="hostCategoryForm.labelCol"
                :wrapper-col="hostCategoryForm.wrapperCol"
            >
                <a-form-model-item ref="name" label="类别名称" name="name">
                    <a-row>
                        <a-col :span="24">
                            <a-input
                                placeholder="请输入主机类别名称"
                                v-model:value="hostCategoryForm.form.name"
                            />
                        </a-col>
                    </a-row>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <!-- 批量导入主机 -->
        <div>
            <a-modal
                v-model:visible="excelVisible"
                title="导入excel批量创建主机"
                @ok="onExcelSubmit"
                @cancel="excelFormCancel"
                :width="800"
            >
                <a-alert
                    type="info"
                    message="导入或输入的密码仅作首次验证使用，并不会存储密码。"
                    banner
                    closable
                />
                <br />

                <p>
                    <a-form-item
                        has-feedback
                        label="模板下载"
                        help="请下载使用该模板填充数据后导入"
                    >
                        <a download="主机导入模板.xls">主机导入模板.xls</a>
                    </a-form-item>
                </p>
                <p>
                    <a-form-item label="默认密码" help="如果Excel中密码为空则使用该密码">
                        <a-input
                            v-model:value="default_password"
                            placeholder="请输入默认主机密码"
                            type="password"
                        />
                    </a-form-item>
                </p>
                <a-form-item label="导入数据">
                    <div class="clearfix">
                        <a-upload :file-list="fileList" name="file" :before-upload="beforeUpload">
                            <a-button>
                                <upload-outlined></upload-outlined>
                                Click to Upload
                            </a-button>
                        </a-upload>
                    </div>
                </a-form-item>
            </a-modal>
        </div>
    </el-card>
</template>
<script>
import { ref, reactive } from 'vue'
import { reqEnvList, addEnv, delEnv } from '@/api/conf/env/index'
import { ElMessage } from 'element-plus'

export default {
    setup() {
        const formRef = ref()
        const HostCategoryFromVisible = ref(false)
        const envList = reactive({
            data: [],
        })

        const envForm = reactive({
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
            },
            rules: {
                name: [
                    { required: true, message: '请输入环境名称', trigger: 'blur' },
                    { min: 3, max: 30, message: '长度在3-10位之间', trigger: 'blur' },
                ],
                tag: [
                    { required: true, message: '唯一标识符', trigger: 'blur' },
                    { min: 3, max: 30, message: '长度在3-10位之间', trigger: 'blur' },
                ],
                description: [
                    { required: true, message: '备注信息', trigger: 'blur' },
                    { min: 1, max: 150, message: '长度在150位以内', trigger: 'blur' },
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

        const envFormColumns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 100,
                sorter: {
                    compare: (a, b) => a.id - b.id,
                },
            },
            {
                title: '环境名称',
                dataIndex: 'name',
                key: 'name',
                width: 200,
                sorter: {
                    compare: (a, b) => a.name > b.name,
                },
            },
            {
                title: '唯一标记符',
                dataIndex: 'tag',
                key: 'tag',
                ellipsis: true,
                sorter: true,
                width: 200,
            },
            {
                title: '备注',
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
        ]

        const handleFinish = (values) => {
            console.log(values, envForm)
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

        const envFormVisible = ref(false)

        const showEnvModal = () => {
            envFormVisible.value = true
        }

        // 提交添加环境的表单
        const onEnvFormSubmit = () => {
            // 将数据提交到后台进行保存，但是先进行连接校验，验证没有问题，再保存
            addEnv(envForm.form)
                .then((response) => {
                    envList.data.unshift(response)
                    // 清空
                    resetForm()
                    envFormVisible.value = false // 关闭对话框
                    ElMessage({
                        message: '成功添加主机信息！',
                        type: 'success',
                    })
                })
                .catch((err) => {
                    ElMessage({
                        message: '添加主机失败!',
                        type: 'error',
                    })
                })
        }

        const deleteEnv = (record) => {
            delEnv(record.id)
                .then((response) => {
                    const index = envList.data.indexOf(record)
                    envList.data.splice(index, 1)
                    ElMessage({
                        message: '删除环境成功!',
                        type: 'success',
                    })
                })
                .catch((err) => {
                    ElMessage({
                        message: '删除环境失败！',
                        type: 'error',
                    })
                })
        }

        const get_env_list = () => {
            // 获取环境列表
            reqEnvList()
                .then((response) => {
                    envList.data = response.results
                })
                .catch((err) => {
                    ElMessage({
                        message: '无法获取环境列表信息!',
                        type: 'error',
                    })
                })
        }

        // 获取环境列表
        get_env_list()

        // 更新环境信息
        const showEnvUpdateModal = () => {}

        return {
            envForm,
            formRef,
            layout,
            HostCategoryFromVisible,
            handleFinishFailed,
            handleFinish,
            resetForm,
            handleValidate,
            envFormVisible,
            showEnvModal,
            onEnvFormSubmit,
            deleteEnv,
            envFormColumns,
            envList,
            showEnvUpdateModal,
        }
    },
}
</script>
