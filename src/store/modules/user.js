import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
    'cp-user',
    () => {
        const token = ref('')
        const nickname = ref('')
        const remember = ref(true)
        const sailTime = ref(0)
        const getUserInfo = () => {
            const data = token.value.split('.')
            return JSON.parse(atob(data[1]))
        }
        const setToken = (tokenData) => {
            token.value = tokenData
        }
        const setNickname = (name) => {
            nickname.value = name
        }
        const setRemember = (remember) => {
            remember.value = remember
        }
        const setSailTime = (time) => {
            sailTime.value = time
        }
        return {
            token,
            nickname,
            sailTime,
            getUserInfo,
            setToken,
            setRemember,
            setNickname,
            setSailTime,
        }
    },
    {
        persist: true,
    },
)
