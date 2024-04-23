<template>
    <div>
        <el-form>
            <el-form-item label="用例名称">
                <el-input v-model="apiForm.api_name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用例描述">
                <el-input v-model="apiForm.api_desc" type="textarea" />
            </el-form-item>
            <el-form-item label="请求URL">
                <el-input v-model="apiForm.api_url" />
            </el-form-item>
            <el-form-item label="请求类型">
                <el-select v-model="apiForm.api_method" placeholder="请选择请求类型">
                    <el-option label="GET" value="get" />
                    <el-option label="POST" value="post" />
                    <el-option label="PUT" value="put" />
                    <el-option label="PATCH" value="patch" />
                    <el-option label="DELETE" value="delete" />
                </el-select>
            </el-form-item>
            <el-form-item label="请求参数">
                <el-input v-model="apiForm.api_params" />
            </el-form-item>
            <el-form-item label="请求数据">
                <el-input v-model="apiForm.api_data" />
            </el-form-item>
            <el-form-item label="预期结果">
                <el-input v-model="apiForm.api_expect" />
            </el-form-item>
            <div class="fr">
                <el-button type="primary" @click="addItem()">Create</el-button>
                <el-button>Cancel</el-button>
            </div>
            <div class="clear"></div>
        </el-form>
    </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue'
import { addDocument } from '@/api/protest/document'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store'
const emit = defineEmits()
const props = defineProps({ proId: String })
const userStore = useUserStore()
// 添加项目用例
const apiForm = ref({
    api_name: '',
    api_desc: '',
    api_url: '',
    api_method: '',
    api_params: '',
    api_expect: '',
    api_sub_pro: props.proId,
    user: userStore.getUserInfo().user_id,
    api_data: '',
})
const addItem = () => {
    addDocument(apiForm.value)
        .then((response) => {
            if (response.code)
                ElMessage({
                    message: response,
                    message,
                    type: 'error',
                })
            emit('success-submit')
            ElMessage({
                message: '提交数据成功',
                type: 'success',
            })
        })
        .catch((error) => {
            ElMessage({
                message: '提交数据失败！请联系管理员！',
                type: 'error',
            })
        })
}
</script>

<style lang="less" scoped></style>
