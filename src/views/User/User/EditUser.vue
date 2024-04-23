<template>
    <div>
        <el-form>
            <el-form-item label="登录用户名">
                <el-input v-model="getUserEditInfo().username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户昵称">
                <el-input v-model="getUserEditInfo().nickname" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户邮箱">
                <el-input v-model="getUserEditInfo().email" type="text" />
            </el-form-item>
            <el-form-item label="用户手机">
                <el-input v-model="getUserEditInfo().phone" type="text" />
            </el-form-item>
            <el-form-item label="是否激活">
                <el-switch v-model="getUserEditInfo().is_active" />
            </el-form-item>
            <el-form-item label="是否为员工">
                <el-switch v-model="getUserEditInfo().is_staff"></el-switch>
            </el-form-item>
            <el-form-item label="是否为超管">
                <el-switch v-model="getUserEditInfo().is_superuser" />
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
import { ref, defineEmits, defineProps, onUnmounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore, useUserInfoStore } from '@/store'
const emit = defineEmits()
const userStore = useUserStore()
const props = defineProps({
    editUserData: Object,
})
const { getUserEditInfo } = useUserInfoStore()

// 新增用户
const editUserData = ref(getUserEditInfo)
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
