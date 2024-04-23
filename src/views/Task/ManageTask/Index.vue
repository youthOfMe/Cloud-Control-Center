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
                    <a-button type="primary" style="margin-left: 20px">批量导入</a-button>
                </div>
                <div class="clear"></div>
            </el-col>
        </el-row>
        <a-table bordered :dataSource="hostTypeList" :columns="columns" style="margin-top: 15px">
            <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'action'">
                    <a-popconfirm
                        v-if="hostTypeList.length"
                        title="Sure to delete?"
                        @confirm="deleteHostCategory(record.id)"
                    >
                        <a>Delete</a>
                    </a-popconfirm>
                </template>
            </template>
        </a-table>
    </el-card>
    <div>
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
            <a-form
                ref="hostCategoryRuleForm"
                v-model:value="hostCategoryForm.form"
                :rules="hostCategoryForm.rules"
                :label-col="hostCategoryForm.labelCol"
                :wrapper-col="hostCategoryForm.wrapperCol"
            >
                <a-form-item ref="name" label="类别名称" name="name">
                    <a-row>
                        <a-col :span="24">
                            <a-input
                                placeholder="请输入主机类别名称"
                                v-model:value="hostCategoryForm.form.name"
                            />
                        </a-col>
                    </a-row>
                </a-form-item>
                <a-form-item ref="description" label="类别描述" name="description">
                    <a-row>
                        <a-col :span="24">
                            <a-input
                                placeholder="请输入主机类别描述"
                                v-model:value="hostCategoryForm.form.description"
                            />
                        </a-col>
                    </a-row>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script setup>
import { computed, reactive, ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { addHostCategory, reqCategoryList, delHostCategory } from '@/api/host'
import { ElMessage } from 'element-plus'
const HostCategoryFromVisible = ref(false)
const showHostModal = () => {
    HostCategoryFromVisible.value = true
}
let validateName = async (_rule, value) => {
    if (value === '') {
        return Promise.reject('请输入类别名称')
    } else {
        return Promise.resolve()
    }
}
const loading = ref()
const onHostCategoryFromSubmit = () => {
    // 添加主机类别的表单提交处理
    // 将数据提交到后台进行保存，但是先进行连接校验，验证没有问题，再保存
    addHostCategory(hostCategoryForm.form)
        .then((response) => {
            if (response.code) {
                ElMessage({
                    message: response.message,
                    type: 'error',
                })
                return
            }
            ElMessage({
                message: '创建主机类别成功!',
                type: 'success',
            })
            hostTypeList.value.push(response)
            hostCategoryFormCancel()
        })
        .catch((error) => {
            ElMessage({
                message: '创建主机类别失败!',
                type: 'error',
            })
        })
}
const hostCategoryFormCancel = () => {
    // 添加主机类别的表单取消
    hostCategoryForm.form.name = '' // 清空表单内容
    hostCategoryForm.form.description = ''
    HostCategoryFromVisible.value = false // 关闭对话框
}

// 删除主机类别
const deleteHostCategory = async (id) => {
    console.log(id)
    const response = await delHostCategory(id)
    if (response.code)
        return ElMessage({
            message: '删除主机失败',
            type: 'error',
        })
    ElMessage({
        message: '删除主机成功',
        type: 'success',
    })
    let index = hostTypeList.value.indexOf(id)
    hostTypeList.value.splice(index, 1)
}

const hostCategoryForm = reactive({
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
    other: '',
    form: {
        name: '',
        description: '',
        create_user: 1,
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

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        width: '10%',
    },
    {
        title: '主机名称',
        dataIndex: 'name',
        width: '20%',
    },
    {
        title: '类型描述',
        dataIndex: 'description',
        width: '40%',
    },
    {
        title: '创建者',
        dataIndex: 'create_user',
        width: '10%',
    },
    {
        title: 'action',
        dataIndex: 'action',
    },
]
const hostTypeList = ref([])

// 获取主机类别信息
const get_category_list = () => {
    // 获取主机类别列表
    reqCategoryList()
        .then((data) => (hostTypeList.value = data.results))
        .catch((error) => {
            ElMessage({
                message: '无法获取主机类别列表信息！',
                type: 'error',
            })
        })
}
get_category_list()

// 删除主机类别
// const delHostCategory = () => {}
</script>
<style lang="less" scoped>
.editable-cell {
    position: relative;
    .editable-cell-input-wrapper,
    .editable-cell-text-wrapper {
        padding-right: 24px;
    }

    .editable-cell-text-wrapper {
        padding: 5px 24px 5px 5px;
    }

    .editable-cell-icon,
    .editable-cell-icon-check {
        position: absolute;
        right: 0;
        width: 20px;
        cursor: pointer;
    }

    .editable-cell-icon {
        margin-top: 4px;
        display: none;
    }

    .editable-cell-icon-check {
        line-height: 28px;
    }

    .editable-cell-icon:hover,
    .editable-cell-icon-check:hover {
        color: #108ee9;
    }

    .editable-add-btn {
        margin-bottom: 8px;
    }
}
.editable-cell:hover .editable-cell-icon {
    display: inline-block;
}
</style>
