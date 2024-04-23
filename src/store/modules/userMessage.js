import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserInfoStore = defineStore(
    'cp-user-user',
    () => {
        const userEditInfo = ref({
            username: '',
            nickname: '',
            password: '',
            email: '',
            phone: '',
            is_active: false,
            is_staff: false,
            is_superuser: false,
        })
        const setUserEditInfo = (data) => {
            userEditInfo.value = data
        }
        const getUserEditInfo = () => userEditInfo.value
        return {
            userEditInfo,
            setUserEditInfo,
            getUserEditInfo,
        }
    },
    {
        persist: true,
    },
)
