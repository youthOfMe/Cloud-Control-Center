<template>
    <div>
        <el-form>
            <el-form-item label="登录用户名" :label-width="formLabelWidth">
                <el-input v-model="userForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户昵称" :label-width="formLabelWidth">
                <el-input v-model="userForm.nickname" autocomplete="off" />
            </el-form-item>
            <el-form-item label="登录密码">
                <el-input v-model="userForm.password" type="text" />
            </el-form-item>
            <el-form-item label="用户邮箱">
                <el-input v-model="userForm.email" type="text" />
            </el-form-item>
            <el-form-item label="用户手机">
                <el-input v-model="userForm.phone" type="text" />
            </el-form-item>
            <el-form-item label="是否激活">
                <el-switch v-model="userForm.is_active" />
            </el-form-item>
            <el-form-item label="是否为员工">
                <el-switch v-model="userForm.is_staff"></el-switch>
            </el-form-item>
            <el-form-item label="是否为超管">
                <el-switch v-model="userForm.is_superuser" />
            </el-form-item>
            <div class="fr">
                <el-button type="primary" @click="submitAddItem(userForm)">Create</el-button>
                <el-button>Cancel</el-button>
            </div>
            <div class="clear"></div>
        </el-form>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { addUser } from '@/api/user/user/index'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store'
const emit = defineEmits()
const userStore = useUserStore()

// 新增用户
const userForm = ref({
    username: '',
    nickname: '',
    password: '',
    email: '',
    phone: '',
    is_active: false,
    is_staff: false,
    is_superuser: false,
})
const submitAddItem = (form) => {
    addUser(form).then((response) => {
        ElMessage({
            message: '新增用户成功！',
            type: 'success',
        })
        emit('success-submit')
    })
}
</script>

<style lang="less" scoped></style>
