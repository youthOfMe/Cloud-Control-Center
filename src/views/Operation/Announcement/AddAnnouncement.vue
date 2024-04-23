<template>
    <div>
        <el-form>
            <el-form-item label="公告标题" :label-width="formLabelWidth">
                <el-input v-model="announcementForm.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="公告内容">
                <el-input v-model="announcementForm.info" type="textarea" />
            </el-form-item>
            <el-form-item label="是否显示">
                <el-switch v-model="announcementForm.is_show" />
            </el-form-item>
            <div class="fr">
                <el-button type="primary" @click="submitAddItem(announcementForm)">
                    Create
                </el-button>
                <el-button>Cancel</el-button>
            </div>
            <div class="clear"></div>
        </el-form>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { addAnnouncement } from '@/api/operation/announcement/index.js'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store'
const emit = defineEmits()
const userStore = useUserStore()

// 发布公告
const announcementForm = ref({
    name: '',
    info: '',
    is_show: true,
    user: userStore.getUserInfo().user_id,
})
const submitAddItem = (form) => {
    addAnnouncement(form).then((response) => {
        ElMessage({
            message: '发布公告成功！',
            type: 'success',
        })
        emit('success-submit')
    })
}
</script>

<style lang="scss" scoped></style>
