<template>
    <div>
        <el-form>
            <el-form-item label="项目名称">
                <el-input v-model="projectForm.pro_name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="项目描述">
                <el-input v-model="projectForm.pro_desc" type="textarea" />
            </el-form-item>
            <el-form-item label="开始时间">
                <el-date-picker
                    v-model="projectForm.pro_start_time"
                    type="datetime"
                    placeholder="Pick a date"
                    clearable
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD"
                />
            </el-form-item>
            <el-form-item label="结束时间">
                <el-date-picker
                    v-model="projectForm.pro_end_time"
                    type="datetime"
                    placeholder="Pick a date"
                    clearable
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD"
                />
            </el-form-item>
            <div class="fr">
                <el-button type="primary" @click="submitAddItem(projectForm)">Create</el-button>
                <el-button>Cancel</el-button>
            </div>
            <div class="clear"></div>
        </el-form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { addProject } from '@/api/protest/prolist/'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits()
const userStore = useUserStore()

// 发布项目
const projectForm = ref({
    pro_name: '',
    pro_desc: '',
    pro_start_time: undefined,
    pro_end_time: undefined,
    user: userStore.getUserInfo().user_id,
})
const submitAddItem = (form) => {
    console.log(projectForm)
    addProject(form).then((response) => {
        ElMessage({
            message: '发布公告成功！',
            type: 'success',
        })
        emit('success-submit')
    })
}
</script>

<style lang="less" scoped></style>
